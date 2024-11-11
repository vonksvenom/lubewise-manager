import { Menu, X } from "lucide-react";

const LayoutHeader = ({ sidebarOpen, setSidebarOpen }) => (
  <button
    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-muted rounded-xl shadow-neo-xl transform transition hover:scale-105 hover:shadow-neo-3d"
    onClick={() => setSidebarOpen(!sidebarOpen)}
  >
    {sidebarOpen ? <X className="text-catYellow" /> : <Menu className="text-catYellow" />}
  </button>
);

export default LayoutHeader;