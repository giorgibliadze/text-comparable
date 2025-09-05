// src/components/Panels.jsx
import React, { useMemo, useState } from "react";
import TextPanel from "./TextPanel";
import CenterLoader from "./CenterLoader";
import { diffWords } from "../lib/diff";

export default function Panels() {
    const [left, setLeft] = useState("");
    const [right, setRight] = useState("");

    const [showDiff, setShowDiff] = useState(false);
    const [ops, setOps] = useState([]);

    // single centered loader
    const [comparing, setComparing] = useState(false);
    const [progress, setProgress] = useState(0);

    const leftChunks = useMemo(
        () => (showDiff ? ops.filter((o) => o.type !== "add") : null),
        [ops, showDiff]
    );
    const rightChunks = useMemo(
        () => (showDiff ? ops.filter((o) => o.type !== "del") : null),
        [ops, showDiff]
    );

    const swap = () => {
        setLeft(right);
        setRight(left);
    };

    const handleCompareClick = async () => {
        if (showDiff) {
            setShowDiff(false);
            setOps([]);
            return;
        }

        setComparing(true);
        setProgress(0);
        const prog = setInterval(() => {
            setProgress((p) => Math.min(95, p + 7 + Math.random() * 8));
        }, 120);

        await new Promise((r) => requestAnimationFrame(r));
        await new Promise((r) => setTimeout(r, 0));

        const t0 = performance.now();
        const result = diffWords(left, right);
        const dt = performance.now() - t0;

        clearInterval(prog);
        setProgress(100);
        setOps(result);
        setShowDiff(true);

        const MIN_SHOW = 300;
        setTimeout(() => setComparing(false), Math.max(0, MIN_SHOW - dt));
    };

    return (
        <>
            <div className="relative">
                {/* Panels hide while comparing */}
                <div
                    aria-hidden={comparing}
                    className={`transition-opacity duration-200 ${comparing ? "opacity-0 pointer-events-none" : "opacity-100"
                        }`}
                >
                    <section className="mt-6 grid items-stretch gap-4 md:gap-6 grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
                        {/* Left panel */}
                        <TextPanel
                            value={left}
                            onChange={setLeft}
                            readOnly={showDiff}
                            chunks={leftChunks}
                            placeholder="დაწერე ტექსტი..."
                        />

                        {/* Mobile swap (same arrows, rotated) */}
                        <div className="md:hidden my-6 col-span-1">
                            <div className="h-14 w-full rounded-md grid place-items-center">
                                <button
                                    title="Swap"
                                    aria-label="Swap texts"
                                    onClick={swap}
                                    disabled={comparing}
                                    className="text-gray-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed p-2"
                                >
                                    {/* use the SAME icon, just rotate */}
                                    <IconSwapLR className="w-6 h-6 rotate-90" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop swap (perfectly centered in middle column) */}
                        <div className="hidden md:grid place-items-center h-full">
                            <button
                                title="Swap"
                                aria-label="Swap texts"
                                onClick={swap}
                                disabled={comparing}
                                className="w-12 h-12 rounded-full border border-slate-300 bg-white shadow hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed grid place-items-center"
                            >
                                <IconSwapLR className="w-5 h-5 text-slate-700" />
                            </button>
                        </div>

                        {/* Right panel */}
                        <TextPanel
                            value={right}
                            onChange={setRight}
                            readOnly={showDiff}
                            chunks={rightChunks}
                            placeholder="დაწერე ტექსტი..."
                        />
                    </section>
                </div>

                {/* one centered overlay loader */}
                <CenterLoader open={comparing} progress={progress} />
            </div>

            {/* Compare / Edit */}
            <div className="w-full mt-8 flex justify-center">
                <button
                    type="button"
                    onClick={handleCompareClick}
                    disabled={comparing}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-500 text-white px-6 py-3 text-sm hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {showDiff ? "რედაქტირება" : "შედარება"}
                </button>
            </div>
        </>
    );
}

/* --------- tiny inline icon (reused & rotated on mobile) --------- */
function IconSwapLR(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M7 8l-3 3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 11h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M17 8l3 3-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
