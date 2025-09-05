import React from "react";

export default function SideNav({
    active = "compare",
    onNavigate = () => { },
    user = { initial: "ო", name: "თამარ ონიანი" },
    brand = "ENAGRAM",
}) {
    const items = [
        { key: "spelling", label: "მართლმწერი", Icon: IconAbc },
        { key: "compare", label: "ტექსტის შედარება", Icon: IconAa },
        { key: "stt", label: "ხმა → ტექსტი", Icon: IconMic },
        { key: "tts", label: "ტექსტი → ხმა", Icon: IconWave },
        { key: "pdf", label: "PDF კონვერტაცია", Icon: IconDoc },
    ];

    return (
        <aside className="bg-[#0d2148] text-white px-4 pt-6 pb-4 flex flex-col">
            {/* Brand row */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2  mt-[20%]">
                    <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center">
                        <span className="text-xl">🦉</span>
                    </div>
                    <span className="font-extrabold tracking-wider">{brand}</span>
                </div>

                {/* collapse (visual only for now) */}
                <div className="mt-[-20%]">
                    <button
                        title="Collapse"
                        aria-label="Collapse"
                        className="text-white/70 hover:text-white rounded-lg px-2 py-1"
                    >
                        «
                    </button>
                </div>
            </div>

            {/* Nav */}
            <nav className="mt-6 space-y-2">
                {items.map(({ key, label, Icon }) => (
                    <NavItem
                        key={key}
                        Icon={Icon}
                        label={label}
                        active={active === key}
                        onClick={() => onNavigate(key)}
                    />
                ))}
            </nav>

            {/* User row */}
            <div className="mt-auto pt-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 grid place-items-center text-sm font-bold">
                            {user.initial}
                        </div>
                        <div className="text-sm font-medium text-white/90 truncate">
                            {user.name}
                        </div>
                    </div>
                    <button className="text-white/70 hover:text-white px-2" title="More">
                        ⋯
                    </button>
                </div>
            </div>
        </aside>
    );
}

function NavItem({ Icon, label, active, onClick }) {
    if (active) {
        return (
            <button
                onClick={onClick}
                className="relative w-full flex items-center gap-3 bg-white text-[#0d2148] rounded-[24px] py-3 pr-4 pl-4 shadow-sm"
            >
                <span className="relative z-10 flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{label}</span>
                </span>

            </button>
        );
    }

    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 text-white/90 hover:text-white hover:bg-white/10 rounded-2xl py-3 px-4 transition-colors"
        >
            <Icon className="w-5 h-5 opacity-90" />
            <span className="font-medium">{label}</span>
        </button>
    );
}

/* --- Minimal inline icons (no extra packages needed) --- */
function IconAbc(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M3 15V9h3.5M3 12h3.5M10 15V9h3a2 2 0 110 4h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 15c.6.6 1.4 1 2.5 1 1.9 0 3-1 3-2.5S22 10 20 10c-1.1 0-1.9.4-2.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function IconAa(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M4 17l4-10 4 10M5.5 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 8a4 4 0 110 8h-3.5V8H16z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function IconMic(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <rect x="9" y="3" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 11a7 7 0 0014 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
function IconWave(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M3 12h2m2-3v6m2-9v12m2-6v6m2-12v12m2-9v6m2-3h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
function IconDoc(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M7 3h7l4 4v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    );
}
