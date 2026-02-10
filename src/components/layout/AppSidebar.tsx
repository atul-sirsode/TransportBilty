import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Shield,
  History,
  FileText,
  Settings,
  Database,
  Receipt,
  BookOpen,
  TruckIcon,
  Landmark,
  CreditCard,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Search,
  Menu,
  X,
} from "lucide-react";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  {
    title: "Administration",
    icon: Shield,
    children: [
      { title: "Subscription History", path: "/subscription-history" },
      { title: "GST Call Subscription History", path: "/gst-subscription" },
    ],
  },
  { title: "Settings", icon: Settings, path: "/settings" },
  {
    title: "Masters",
    icon: Database,
    children: [
      { title: "Vehicles", path: "/masters/vehicles" },
      { title: "Vehicle Types", path: "/masters/vehicle-types" },
      { title: "Units", path: "/masters/units" },
      { title: "Ledger", path: "/masters/ledger" },
      { title: "Parties", path: "/masters/parties" },
    ],
  },
  { title: "Billy", icon: Receipt, path: "/billy" },
  { title: "Collection Memo", icon: BookOpen, path: "/collection-memo" },
  { title: "Hiring Rate Settlement", icon: TruckIcon, path: "/hiring-rate" },
  { title: "Load Advice", icon: Landmark, path: "/load-advice" },
  { title: "Invoices", icon: FileText, path: "/invoices" },
  { title: "Subscription Plans", icon: CreditCard, path: "/subscription-plans" },
  { title: "Reports", icon: BarChart3, path: "/reports" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AppSidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(() => {
    const path = location.pathname;
    const expanded: string[] = [];
    menuItems.forEach((item) => {
      if (item.children?.some((c) => path.startsWith(c.path))) {
        expanded.push(item.title);
      }
    });
    return expanded.length ? expanded : ["Administration"];
  });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleExpand = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title]
    );
  };

  const isActive = (path?: string) => path === location.pathname;

  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.children?.some((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-30 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-14 px-3 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <TruckIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">
              Truck<span className="text-primary">Bilty</span>
            </span>
          </Link>
        )}
        <button onClick={onToggle} className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground">
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-4 w-4" />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 text-xs rounded-md bg-sidebar-accent border border-sidebar-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {filteredItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleExpand(item.title)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors hover:bg-sidebar-accent ${
                    expandedItems.includes(item.title)
                      ? "text-foreground"
                      : "text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      {expandedItems.includes(item.title) ? (
                        <ChevronDown className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronRight className="h-3.5 w-3.5" />
                      )}
                    </>
                  )}
                </button>
                {!collapsed && expandedItems.includes(item.title) && (
                  <div className="ml-4 pl-3 border-l border-sidebar-border space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                          isActive(child.path)
                            ? "text-primary bg-sidebar-accent"
                            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                        }`}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path!}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-colors ${
                  isActive(item.path)
                    ? "text-primary bg-sidebar-accent"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AppSidebar;
