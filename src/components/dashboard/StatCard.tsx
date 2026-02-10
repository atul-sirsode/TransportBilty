import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: "red" | "green" | "blue" | "orange" | "purple";
}

const colorMap = {
  red: "bg-stat-red",
  green: "bg-stat-green",
  blue: "bg-stat-blue",
  orange: "bg-stat-orange",
  purple: "bg-stat-purple",
};

const StatCard = ({ title, value, subtitle, icon: Icon, color }: StatCardProps) => {
  return (
    <div className={`${colorMap[color]} rounded-lg p-4 text-primary-foreground animate-fade-in`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs opacity-80 mt-1">{title}</p>
        </div>
        <Icon className="h-8 w-8 opacity-70" />
      </div>
      <p className="text-[10px] opacity-60 mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
