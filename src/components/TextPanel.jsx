import { useLayoutEffect, useRef } from "react";

function useAutosizeTextarea(value) {
    const ref = useRef(null);

    // Grow/shrink whenever content changes
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.style.height = "0px";       // allow shrink on delete
        el.style.overflowY = "hidden"; // never show inner scrollbar
        el.style.height = el.scrollHeight + "px";
    }, [value]);

    // Recompute on width changes (wrap changes height)
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;
        const ro = new ResizeObserver(() => {
            el.style.height = "0px";
            el.style.height = el.scrollHeight + "px";
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return ref;
}

export default function TextPanel({
    value,
    onChange,
    placeholder = "დაწერე ტექსტი...",
    readOnly = false,
    chunks = null, // [{type:'equal'|'add'|'del', text}]
}) {
    const shell =
        "relative rounded-2xl border border-slate-200 shadow-sm bg-[#e8f1ff]";

    // EDIT MODE
    if (!readOnly) {
        const taRef = useAutosizeTextarea(value);
        return (
            <div className={shell}>
                <textarea
                    ref={taRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    rows={1}
                    className={[
                        "w-full bg-transparent rounded-2xl p-4 outline-none",
                        "overflow-hidden resize-none",            // no scrollbar, no manual resize
                        "min-h-[220px] md:min-h-[320px]",         // pleasant starting size
                        "[field-sizing:content]",                 // CSS fallback on modern browsers
                    ].join(" ")}
                />
            </div>
        );
    }

    // DIFF (READ-ONLY) MODE
    return (
        <div className={shell}>
            <div className="p-4 min-h-[220px] md:min-h-[320px] whitespace-pre-wrap break-words text-slate-800">
                {Array.isArray(chunks) &&
                    chunks.map((c, i) => {
                        const isSpace = /^\s+$/.test(c.text);
                        if (c.type === "equal" || isSpace) return <span key={i}>{c.text}</span>;
                        if (c.type === "del")
                            return (
                                <span key={i} className="text-red-600 bg-red-50 px-0.5 rounded">
                                    {c.text}
                                </span>
                            );
                        return (
                            <span key={i} className="text-green-600 bg-green-50 px-0.5 rounded">
                                {c.text}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
}
