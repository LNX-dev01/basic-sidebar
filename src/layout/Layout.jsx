import { useState } from "react";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content & Footer */}
      <div className="flex-1 flex flex-col ml-20">
        {/* Main section */}
        <main className="flex-1">
          <MainContent />
        </main>
        <footer className="p-4 text-center">
          <Footer />
        </footer>
      </div>
    </div>
  );
};
export default Layout;