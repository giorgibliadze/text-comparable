// src/components/SideNav.jsx
import React, { useEffect, useRef, useState } from "react";

/* ----------------------------- SideNav ----------------------------- */

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
    const current = items.find((i) => i.key === active) ?? items[1];

    const [menuOpen, setMenuOpen] = useState(false);       // top-right menu
    const [sectionOpen, setSectionOpen] = useState(false); // centered section dropdown
    const menuRef = useOutsideClose(() => setMenuOpen(false));
    const sectionRef = useOutsideClose(() => setSectionOpen(false));

    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && (setMenuOpen(false), setSectionOpen(false));
        const onResize = () => window.innerWidth >= 1024 && (setMenuOpen(false), setSectionOpen(false));
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", onResize);
        return () => (window.removeEventListener("keydown", onKey), window.removeEventListener("resize", onResize));
    }, []);

    const go = (key) => {
        onNavigate(key);
        setMenuOpen(false);
        setSectionOpen(false);
    };

    return (
        <>
            {/* Top bar (mobile/tablet) */}
            <header className="lg:hidden sticky top-0 z-40 bg-[#0d2148] text-white">
                <div className="h-16 px-4 flex items-center justify-between">
                    <Brand brand={brand} />
                    <div className="relative" ref={menuRef}>
                        <button
                            aria-label="Open menu"
                            onClick={() => setMenuOpen((v) => !v)}
                            className="p-2 rounded-lg hover:bg-white/10"
                        >
                            <IconMenu className="w-7 h-7" />
                        </button>

                        <Dropdown open={menuOpen} align="right">
                            <MenuList items={items} active={active} onSelect={go} variant="menu" className="max-h-[70vh] overflow-auto" />
                        </Dropdown>
                    </div>
                </div>
            </header>

            {/* Section strip (mobile/tablet) */}
            <div ref={sectionRef} className="lg:hidden relative bg-white text-blue-500">
                <div className="px-4 py-3 flex justify-center md:justify-start">
                    <button
                        onClick={() => setSectionOpen((v) => !v)}
                        className="inline-flex items-center gap-3 text-lg font-semibold"
                        aria-expanded={sectionOpen}
                        aria-controls="section-dropdown"
                    >
                        <IconAa className="w-7 h-7" />
                        <span>{current.label}</span>
                        <IconChevronDown className={cx("w-5 h-5 transition-transform", sectionOpen && "rotate-180")} />
                    </button>
                </div>

                <Dropdown id="section-dropdown" open={sectionOpen} align="center">
                    <MenuList items={items} active={active} onSelect={go} variant="menu" />
                </Dropdown>

                <div className="h-px bg-white/20" />
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex bg-[#0d2148] text-white w-[260px] px-4 pt-6 pb-4 flex-col">
                <div className="flex items-center justify-between px-1">
                    <Brand brand={brand} />
                    <button className="text-white/70 hover:text-white rounded-lg px-2 py-1" aria-label="Collapse">«</button>
                </div>

                <MenuList items={items} active={active} onSelect={go} variant="sidebar" className="mt-6 space-y-2" />

                <UserRow user={user} />
            </aside>
        </>
    );
}

/* ---------------------------- Reusable bits ---------------------------- */

function MenuList({ items, active, onSelect, variant, className = "" }) {
    return (
        <ul className={className}>
            {items.map(({ key, label, Icon }) => (
                <li key={key}>
                    <NavItem
                        Icon={Icon}
                        label={label}
                        active={active === key}
                        onClick={() => onSelect(key)}
                        variant={variant}
                    />
                </li>
            ))}
        </ul>
    );
}

function NavItem({ Icon, label, active, onClick, variant }) {
    const base = "w-full flex items-center gap-3 rounded-2xl py-3 px-4 transition-colors";
    const activeCls = variant === "sidebar" ? "bg-white text-[#0d2148]" : "bg-slate-100 text-slate-900";
    const inactiveCls = variant === "sidebar" ? "text-white/90 hover:text-white hover:bg-white/10" : "text-slate-700 hover:bg-slate-50";

    return (
        <button onClick={onClick} className={cx(base, active ? activeCls : inactiveCls)}>
            <Icon className="w-5 h-5" />
            <span className={active ? "font-semibold" : "font-medium"}>{label}</span>
        </button>
    );
}

function Brand({ brand }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 grid place-items-center">
                <span className="text-xl">🦉</span>
            </div>
            <span className="font-extrabold tracking-wider">{brand}</span>
        </div>
    );
}

function UserRow({ user }) {
    return (
        <div className="mt-auto pt-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-700 grid place-items-center text-sm font-bold">
                        {user.initial}
                    </div>
                    <div className="text-sm font-medium text-white/90 truncate">{user.name}</div>
                </div>
                <button className="text-white/70 hover:text-white px-2" title="More">⋯</button>
            </div>
        </div>
    );
}

function Dropdown({ open, align = "right", children, id }) {
    if (!open) return null;
    const pos =
        align === "right"
            ? "right-0 mt-2 w-64"
            : "left-1/2 -translate-x-1/2 top-full mt-2 w-[min(92vw,360px)]";
    return (
        <div
            id={id}
            className={cx(
                "absolute z-50 rounded-2xl bg-white text-slate-800 shadow-xl ring-1 ring-black/10 overflow-hidden",
                pos
            )}
        >
            {children}
        </div>
    );
}

function useOutsideClose(onClose) {
    const ref = useRef(null);
    useEffect(() => {
        const handler = (e) => ref.current && !ref.current.contains(e.target) && onClose();
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [onClose]);
    return ref;
}

const cx = (...xs) => xs.filter(Boolean).join(" ");

/* ------------------------------ Icons ------------------------------ */
function IconMenu(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}
function IconChevronDown(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
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
