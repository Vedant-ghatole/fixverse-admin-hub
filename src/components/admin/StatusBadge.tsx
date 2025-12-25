import { cn } from "@/lib/utils";

type StatusType =
  | "active"
  | "pending"
  | "blocked"
  | "approved"
  | "rejected"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "new"
  | "refunded"
  | "paid"
  | "settled"
  | "processed"
  | "open"
  | "resolved"
  | "in_progress";

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success/20 text-success" },
  pending: { label: "Pending", className: "bg-warning/20 text-warning" },
  blocked: { label: "Blocked", className: "bg-destructive/20 text-destructive" },
  approved: { label: "Approved", className: "bg-success/20 text-success" },
  rejected: { label: "Rejected", className: "bg-destructive/20 text-destructive" },
  shipped: { label: "Shipped", className: "bg-info/20 text-info" },
  delivered: { label: "Delivered", className: "bg-success/20 text-success" },
  cancelled: { label: "Cancelled", className: "bg-destructive/20 text-destructive" },
  new: { label: "New", className: "bg-primary/20 text-primary" },
  refunded: { label: "Refunded", className: "bg-muted text-muted-foreground" },
  paid: { label: "Paid", className: "bg-success/20 text-success" },
  settled: { label: "Settled", className: "bg-success/20 text-success" },
  processed: { label: "Processed", className: "bg-info/20 text-info" },
  open: { label: "Open", className: "bg-warning/20 text-warning" },
  resolved: { label: "Resolved", className: "bg-success/20 text-success" },
  in_progress: { label: "In Progress", className: "bg-info/20 text-info" },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span className={cn("status-badge", config.className, className)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
