// Two-step diff: word/punct first, then refine replacements to char-level.

function tokenize(str) {
  // split on whitespace OR punctuation; keep the separators
  return (str ?? "")
    .split(/(\s+|[.,!?;:"'()\[\]{}<>…—–\-])/u)
    .filter(Boolean);
}

function lcsOps(A, B) {
  const m = A.length, n = B.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = A[i - 1] === B[j - 1]
        ? dp[i - 1][j - 1] + 1
        : Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const ops = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && A[i - 1] === B[j - 1]) {
      ops.push({ type: "equal", text: A[i - 1] }); i--; j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      ops.push({ type: "add", text: B[j - 1] }); j--;
    } else {
      ops.push({ type: "del", text: A[i - 1] }); i--;
    }
  }
  ops.reverse();
  return ops;
}

function mergeAdjacent(ops) {
  const out = [];
  for (const o of ops) {
    const last = out[out.length - 1];
    if (last && last.type === o.type) last.text += o.text;
    else out.push({ ...o });
  }
  return out;
}

const isWS = (s) => /^\s+$/.test(s);

function refineReplacements(ops) {
  const out = [];
  let i = 0;
  while (i < ops.length) {
    const t = ops[i].type;
    if (t === "del" || t === "add") {
      // collect contiguous del/add block
      let delText = "", addText = "";
      let j = i;
      while (j < ops.length && (ops[j].type === "del" || ops[j].type === "add")) {
        if (ops[j].type === "del") delText += ops[j].text;
        else addText += ops[j].text;
        j++;
      }
      if (delText && addText && !(isWS(delText) && isWS(addText))) {
        const inner = lcsOps(Array.from(delText), Array.from(addText));
        out.push(...inner);
      } else {
        for (let k = i; k < j; k++) out.push(ops[k]);
      }
      i = j;
      continue;
    }
    out.push(ops[i]);
    i++;
  }
  return out;
}

export function diffWords(a, b) {
  const coarse = lcsOps(tokenize(a), tokenize(b));
  const refined = refineReplacements(coarse);
  return mergeAdjacent(refined);
}
