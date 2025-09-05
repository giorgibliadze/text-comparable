import { useState } from "react";

export default function Toolbar() {
    const [lang, setLang] = useState("ka");
    const [caseSensitive, setCaseSensitive] = useState(false);

    return (
        <header className="mb-2">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                {/* LEFT: language + checkbox */}
                <div className="flex items-center gap-4 flex-wrap">
                    {/* Language select */}
                    <div className="relative">
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-9 py-2 text-sm shadow-sm outline-none focus:ring-2 focus:ring-sky-400"
                        >
                            <option value="ka">ქართული</option>
                            <option value="en">English</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    </div>

                    {/* Case sensitivity */}
                    <label className="inline-flex items-center gap-2 text-slate-600 text-sm cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={caseSensitive}
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                            className="peer sr-only"
                        />
                        <span className="relative grid place-items-center w-4 h-4 rounded border border-slate-400 peer-checked:bg-slate-900 peer-checked:border-slate-900">
                            <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                        </span>
                        <span>ფორმატის შენარჩუნება</span>
                    </label>
                </div>

                {/* RIGHT: add new */}
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-gray-400 text-white px-4 py-3 text-sm hover:bg-blue-500"
                >
                    <Plus className="w-4 h-4" />
                    ახლის გახსნა
                </button>
            </div>

            {/* Divider */}
            <div className="mt-3 h-px bg-slate-200" />
        </header>
    );
}

/* Inline icons (no libs) */
function ChevronDown(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function Check(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function Plus(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}
