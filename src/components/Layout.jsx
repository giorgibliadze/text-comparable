import SideNav from "./SideNav";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr] bg-slate-50">
            <SideNav active="compare" onNavigate={(key) => console.log("nav ->", key)} />
            <main className="p-4 md:p-6">{children}</main>
        </div>

    );
}
