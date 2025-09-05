// src/components/Toolbar.jsx
import React, { useState } from "react";

export default function Toolbar() {
    const [lang, setLang] = useState("ka");
    const [caseSensitive, setCaseSensitive] = useState(false);

    return (
        <header className="mb-2">
            {/* Mobile: stacked; ≥md: controls left, action right */}
            <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
                {/* LEFT: language + checkbox */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Language select */}
                    <div className="relative w-full sm:w-[220px]">
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="w-full appearance-none rounded-xl border border-slate-300 bg-white pl-3 pr-9 py-3 sm:py-2.5 text-base sm:text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-400"
                            aria-label="Language"
                        >
                            <option value="ka">ქართული</option>
                            <option value="en">English</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>

                    {/* Case sensitivity */}
                    <label className="inline-flex items-center gap-2 text-slate-700 text-base sm:text-sm cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={caseSensitive}
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                            className="peer sr-only"
                            aria-label="ფორმატის შენარჩუნება"
                        />
                        <span className="relative grid place-items-center w-5 h-5 rounded-md border border-slate-400 transition-colors peer-checked:bg-slate-900 peer-checked:border-slate-900">
                            <Check className="w-3.5 h-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                        </span>
                        <span className="font-medium">ფორმატის შენარჩუნება</span>
                    </label>
                </div>

                {/* RIGHT: Add button (full width on mobile) */}
                <div className="md:justify-self-end">
                    <button
                        type="button"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gray-500 text-white px-5 py-3 sm:py-2.5 text-base sm:text-sm hover:bg-blue-500"
                    >
                        <Plus className="w-5 h-5 sm:w-4 sm:h-4" />
                        ახლის გახსნა
                    </button>
                </div>
            </div>

            {/* Divider */}
            <div className="mt-3 h-px bg-slate-200" />
        </header>
    );
}

/* ---------- tiny inline icons (no deps) ---------- */
function ChevronDown(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function Check(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M5 13l4 4L19 7"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function Plus(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
            />
        </svg>
    );
}
