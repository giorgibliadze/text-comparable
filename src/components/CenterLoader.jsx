import React from "react";

/**
 * Single centered loader card.
 * Renders NOTHING when `open` is false (so it never blocks inputs).
 */
export default function CenterLoader({
    open,
    progress = 0,
    text = "Converting… Thank you for your Patience",
}) {
    if (!open) return null;

    return (
        <div className="absolute inset-0 z-30 grid place-items-center">
            {/* White sheet to fully hide panels while loading */}
            <div className="absolute inset-0 bg-white" />

            <div className="relative z-10 w-[min(92vw,420px)] rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xl">
                <div className="flex items-center gap-4">
                    {/* spinner */}
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full border-2 border-slate-200" />
                        <div className="absolute inset-0 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
                    </div>

                    {/* copy + progress */}
                    <div className="flex-1">
                        <div className="text-sm font-medium text-slate-700">{text}</div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                                className="h-full bg-sky-500 transition-all"
                                style={{ width: `${Math.floor(progress)}%` }}
                                role="progressbar"
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-valuenow={Math.floor(progress)}
                            />
                        </div>
                        <div className="mt-1 text-right text-xs text-slate-500">
                            {Math.floor(progress)}%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
