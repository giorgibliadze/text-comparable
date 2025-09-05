import { useMemo, useState } from "react";
import TextPanel from "./TextPanel";
import CenterLoader from "./CenterLoader";
import { diffWords } from "../lib/diff";

export default function Panels() {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");

    const [showDiff, setShowDiff] = useState(false);
    const [ops, setOps] = useState([]);

    // ONE centered loader state
    const [comparing, setComparing] = useState(false);
    const [progress, setProgress] = useState(0);

    const leftChunks = useMemo(
        () => (showDiff ? ops.filter(o => o.type !== "add") : null),
        [ops, showDiff]
    );
    const rightChunks = useMemo(
        () => (showDiff ? ops.filter(o => o.type !== "del") : null),
        [ops, showDiff]
    );

    const swap = () => {
        setLeft(right);
        setRight(left);
    };

    const handleCompareClick = async () => {
        if (showDiff) {
            // back to editing
            setShowDiff(false);
            setOps([]);
            return;
        }

        // 1) Show loader immediately
        setComparing(true);
        setProgress(0);
        const prog = setInterval(() => {
            setProgress(p => Math.min(95, p + 7 + Math.random() * 8));
        }, 120);

        // 2) Give the browser a frame to paint the loader
        await new Promise(r => requestAnimationFrame(r));
        await new Promise(r => setTimeout(r, 0));

        // 3) Run the diff (sync)
        const t0 = performance.now();
        const result = diffWords(left, right);
        const dt = performance.now() - t0;

        // 4) Finish loader + show results
        clearInterval(prog);
        setProgress(100);
        setOps(result);
        setShowDiff(true);

        // keep loader visible briefly if diff was too fast (avoid flicker)
        const MIN_SHOW = 300; // ms
        const wait = Math.max(0, MIN_SHOW - dt);
        setTimeout(() => setComparing(false), wait);
    };

    return (
        <>
            <div className="relative">
                {/* Panels vanish while comparing */}
                <div
                    aria-hidden={comparing}
                    className={`transition-opacity duration-200 ${comparing ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                >
                    <section className="mt-6 grid items-stretch gap-4 md:gap-6 grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                        <TextPanel
                            value={left}
                            onChange={setLeft}
                            readOnly={showDiff}
                            chunks={leftChunks}
                            placeholder="დაწერე ტექსტი..."
                        />

                        {/* center swap button (desktop) */}
                        <div className="hidden md:flex items-center">
                            <button
                                title="Swap"
                                aria-label="Swap texts"
                                onClick={swap}
                                disabled={comparing}
                                className="w-12 h-12 rounded-full border border-slate-300 bg-white shadow hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                ⇄
                            </button>
                        </div>

                        <TextPanel
                            value={right}
                            onChange={setRight}
                            readOnly={showDiff}
                            chunks={rightChunks}
                            placeholder="დაწერე ტექსტი..."
                        />
                    </section>
                </div>

                {/* ONE centered loader over the whole panel area */}
                <CenterLoader open={comparing} progress={progress} />
            </div>

            <div className="w-full mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={handleCompareClick}
                    disabled={comparing}
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-500 text-white px-5 py-3 text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {showDiff ? "რედაქტირება" : "შედარება"}
                </button>
            </div>
        </>
    );
}
