export default function TextPanel({ label, name, placeholder }) {
    return (
        <div className="bg-blue-100 rounded-2xl p-4 sm:p-5">
            <label
                htmlFor={name}
                className="block text-sm font-medium text-slate-700 mb-2"
            >
                {label}
            </label>

            <textarea
                id={name}
                className="w-full min-h-[320px] md:min-h-[420px] resize-y rounded-xl p-3 outline-none focus:ring-2 focus:ring-sky-400"
                placeholder={placeholder}
            />
        </div>
    );
}
