import { Link, useLocation } from "react-router-dom";

const SidebarNav = ({ navItems, sidebarCollapsed }) => {
  const location = useLocation();

  return (
    <nav className="flex-1 p-4">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`flex items-center gap-3 px-6 py-4 mb-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-neo-xl ${
            location.pathname === item.to
              ? "bg-primary text-background translate-x-2"
              : "text-catYellow hover:bg-accent bg-gradient-to-br from-muted to-accent/5"
          } ${sidebarCollapsed ? 'w-12 h-12 p-0 justify-center' : 'w-full'}`}
          title={item.title}
        >
          <span className={`flex items-center justify-center ${sidebarCollapsed ? 'w-full h-full text-xl' : 'text-lg'}`}>
            {item.icon}
          </span>
          <span className={`transition-all duration-200 text-lg ${
            sidebarCollapsed ? 'w-0 overflow-hidden opacity-0' : 'w-auto opacity-100'
          }`}>
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarNav;