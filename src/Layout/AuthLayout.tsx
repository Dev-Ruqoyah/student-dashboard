import  { useEffect, useState, type ReactNode } from "react";
import Sidebar from "../components/Nav/Sidebar";
import TopNavBar from "../components/Nav/TopNav";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  // desktop collapse state
  const [collapsed, setCollapsed] = useState(false);

  // mobile overlay states:
  // mobileMounted -> whether overlay is mounted in the DOM
  // mobileOpen -> controls translate/opacity classes (drives animation)
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // open mobile overlay: mount then open (next frame) to trigger transition
  const openMobile = () => {
    setMobileMounted(true);
    
    requestAnimationFrame(() => setMobileOpen(true));
  };

  // close mobile overlay: reverse animation then unmount after duration
  const closeMobile = () => {
    setMobileOpen(false);
    // match this timeout to the transition duration (300ms)
    setTimeout(() => setMobileMounted(false), 300);
  };

  // topbar toggle will decide based on width whether to open mobile or toggle desktop
  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      openMobile();
    } else {
      setCollapsed((p) => !p);
    }
  };

  // close mobile on Escape key (optional but nice)
  useEffect(() => {
    if (!mobileMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMounted]);

  return (
    <div className="flex h-screen">
      {/* Desktop Sidebar (hidden on small screens) */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={() => setCollapsed((p) => !p)}
        />
      </div>

      {/* Mobile Sidebar (overlay) */}
      {mobileMounted && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop with fade */}
          <div
            className={`fixed inset-0 transition-opacity duration-300 ${
              mobileOpen ? "opacity-100 bg-black/40" : "opacity-0 pointer-events-none"
            }`}
            onClick={closeMobile}
          />

          {/* Sidebar panel — starts off-screen (-translate-x-full) then translates to 0 */}
          <div
            className={`relative z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar always expanded on mobile; pass closeMobile as toggle */}
            <Sidebar collapsed={false} toggleSidebar={closeMobile} />
          </div>
        </div>
      )}

      {/* Main content column */}
      <div className="flex flex-col flex-1 transition-all duration-300">
        {/* Top Navbar — pass handler that decides desktop vs mobile */}
        <TopNavBar toggleSidebar={handleToggle} />

        {/* Scrollable main */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-100/50">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center bg-secondary/10">
          &copy; {new Date().getFullYear()} My Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
