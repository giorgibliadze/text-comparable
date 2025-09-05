import TextPanel from "./TextPanel";

export default function Panels() {
    return (
        <section className="mt-6 grid items-stretch gap-4 md:gap-6 grid-cols-1 md:grid-cols-[1fr_auto_1fr]">
            <TextPanel 
                name="orig"
                placeholder="დაწერე ტექსტი..."
            />

            {/* center swap button (desktop) */}
            <div className="hidden md:flex items-center">
                <button
                    title="Swap"
                    aria-label="Swap texts"
                    className="w-12 h-12 rounded-full border border-slate-300 bg-white shadow hover:shadow-md active:scale-95"
                >
                    ⇄
                </button>
            </div>

            <TextPanel
                name="next"
                placeholder="დაწერე ტექსტი..."
            />

            {/* mobile swap button */}
            <div className="md:hidden flex justify-center">
                <button
                    title="Swap"
                    aria-label="Swap texts"
                    className="mt-3 w-12 h-12 rounded-full border border-slate-300 bg-white shadow"
                >
                    ⇄
                </button>
            </div>
        </section>
    );
}
