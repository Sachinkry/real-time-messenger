import DesktopSidebar from "./DesktopSidebar";


async function Sidebar({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full">
            <DesktopSidebar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;