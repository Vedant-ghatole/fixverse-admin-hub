import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  icon: LucideIcon;
  color: "primary" | "success" | "info" | "warning";
  className?: string;
}

const colorClasses = {
  primary: {
    glow: "bg-primary",
    icon: "bg-primary/20 text-primary",
  },
  success: {
    glow: "bg-success",
    icon: "bg-success/20 text-success",
  },
  info: {
    glow: "bg-info",
    icon: "bg-info/20 text-info",
  },
  warning: {
    glow: "bg-warning",
    icon: "bg-warning/20 text-warning",
  },
};

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  color,
  className,
}: StatCardProps) => {
  const colors = colorClasses[color];

  return (
    <div className={cn("stat-card group", className)}>
      <div className={cn("stat-card-glow", colors.glow)} />
      
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-heading font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className={cn(
                "text-sm mt-2 font-medium",
                changeType === "increase" && "text-success",
                changeType === "decrease" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
            colors.icon
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
