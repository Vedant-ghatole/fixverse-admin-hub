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
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
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
  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                "text-xs mt-1",
                changeType === "increase" && "text-success",
                changeType === "decrease" && "text-destructive",
                changeType === "neutral" && "text-muted-foreground"
              )}
            >
              {change}
            </p>
          )}
        </div>
        
        <div className={cn("w-10 h-10 rounded-md flex items-center justify-center", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;