import { LucideIcon } from "lucide-react";

interface InfoCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

const InfoCard = ({ title, value, subtitle, icon: Icon }: InfoCardProps) => {
  return (
    <div className="bg-card rounded-lg p-4 border border-border animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
