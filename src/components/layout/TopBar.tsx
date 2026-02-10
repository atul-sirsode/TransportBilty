import { Sun, Moon, Bell, Calendar, MapPin, User } from "lucide-react";

interface TopBarProps {
  sidebarCollapsed: boolean;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const TopBar = ({ sidebarCollapsed, theme, onToggleTheme }: TopBarProps) => {
  return (
    <header
      className={`fixed top-0 right-0 h-14 bg-topbar border-b border-border z-20 flex items-center justify-between px-4 transition-all duration-300 ${
        sidebarCollapsed ? "left-16" : "left-60"
      }`}
    >
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>Set</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>Main</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>2026-2027</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          <span>Apr - March</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Switcher */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          title="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <button className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <User className="h-4 w-4 text-primary-foreground" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
