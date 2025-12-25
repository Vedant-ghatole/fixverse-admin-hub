import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Users, Store, ShoppingCart, IndianRupee, Eye, Check, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data
const pendingApprovals = [
  { type: "Seller", name: "ABC Tools Pvt Ltd", requestedOn: "05 Dec 2025", id: 1 },
  { type: "Product", name: "Hydraulic Jack 500T", requestedOn: "04 Dec 2025", id: 2 },
  { type: "Seller", name: "MotorParts India", requestedOn: "03 Dec 2025", id: 3 },
];

const recentActivities = [
  { activity: "New order placed", user: "Rahul Sharma (Buyer)", date: "Today, 2:45 PM" },
  { activity: "Seller payout processed", user: "FixTools Pvt Ltd", date: "Yesterday, 6:30 PM" },
  { activity: "New seller registered", user: "AutoParts Hub", date: "Yesterday, 4:15 PM" },
  { activity: "Product approved", user: "Drill Machine Pro", date: "2 days ago" },
  { activity: "Support ticket resolved", user: "Ticket #7821", date: "2 days ago" },
];

const Dashboard = () => {
  const approvalColumns = [
    { key: "type", header: "Type" },
    { key: "name", header: "Name" },
    { key: "requestedOn", header: "Requested On" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-success">
            <Check className="w-3.5 h-3.5" />
            Approve
          </button>
          <button className="action-btn action-btn-danger">
            <X className="w-3.5 h-3.5" />
            Reject
          </button>
        </div>
      ),
    },
  ];

  const activityColumns = [
    {
      key: "activity",
      header: "Activity",
      render: (item: typeof recentActivities[0]) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <span>{item.activity}</span>
        </div>
      ),
    },
    { key: "user", header: "User / Reference" },
    { key: "date", header: "Date" },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Platform activity & system control overview"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="1,240"
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="primary"
          className="animate-slide-up opacity-0 stagger-1"
        />
        <StatCard
          title="Total Sellers"
          value="320"
          change="+8% from last month"
          changeType="increase"
          icon={Store}
          color="success"
          className="animate-slide-up opacity-0 stagger-2"
        />
        <StatCard
          title="Total Orders"
          value="5,860"
          change="+23% from last month"
          changeType="increase"
          icon={ShoppingCart}
          color="info"
          className="animate-slide-up opacity-0 stagger-3"
        />
        <StatCard
          title="Platform Revenue"
          value="₹73,45,000"
          change="+18% from last month"
          changeType="increase"
          icon={IndianRupee}
          color="warning"
          className="animate-slide-up opacity-0 stagger-4"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold">Pending Approvals</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              View All
            </Button>
          </div>
          <DataTable columns={approvalColumns} data={pendingApprovals} />
        </div>

        {/* Recent Activities */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold">Recent Activities</h2>
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
              View All
            </Button>
          </div>
          <DataTable columns={activityColumns} data={recentActivities} />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 via-card to-info/10 border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-1">Quick Overview</h3>
            <p className="text-muted-foreground text-sm">Today's platform performance</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">24</p>
              <p className="text-xs text-muted-foreground">New Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">₹1,24,500</p>
              <p className="text-xs text-muted-foreground">Today's Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-info">12</p>
              <p className="text-xs text-muted-foreground">New Users</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-warning">5</p>
              <p className="text-xs text-muted-foreground">Pending Tickets</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
