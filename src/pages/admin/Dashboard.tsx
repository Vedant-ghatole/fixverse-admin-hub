import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatCard from "@/components/admin/StatCard";
import DataTable from "@/components/admin/DataTable";
import PageHeader from "@/components/admin/PageHeader";
import { Users, Store, ShoppingCart, IndianRupee, Check, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface PendingApproval {
  id: string;
  type: "Seller" | "Product";
  name: string;
  requested_on: string;
}

interface RecentActivity {
  id: string;
  activity: string;
  activity_user: string;
  date_text: string;
}

const Dashboard = () => {
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [approvalsRes, activitiesRes] = await Promise.all([
        supabase.from("pending_approvals").select("*").order("requested_on", { ascending: false }),
        supabase.from("recent_activities").select("*").order("created_at", { ascending: false }),
      ]);

      if (approvalsRes.error) console.error("Error fetching pending approvals:", approvalsRes.error);
      if (activitiesRes.error) console.error("Error fetching recent activities:", activitiesRes.error);

      setPendingApprovals(approvalsRes.data || []);
      setRecentActivities(activitiesRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const approvalColumns = [
    { key: "type", header: "Type" },
    { key: "name", header: "Name" },
    {
      key: "requested_on",
      header: "Requested On",
      render: (item: PendingApproval) => format(new Date(item.requested_on), "dd MMM yyyy"),
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-success">
            <Check className="w-3 h-3" />
            Approve
          </button>
          <button className="action-btn action-btn-danger">
            <X className="w-3 h-3" />
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
      render: (item: RecentActivity) => (
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted-foreground" />
          <span>{item.activity}</span>
        </div>
      ),
    },
    { key: "activity_user", header: "User / Reference" },
    { key: "date_text", header: "Date" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Dashboard"
        description="Platform overview"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value="1,240"
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="primary"
        />
        <StatCard
          title="Total Sellers"
          value="320"
          change="+8% from last month"
          changeType="increase"
          icon={Store}
          color="success"
        />
        <StatCard
          title="Total Orders"
          value="5,860"
          change="+23% from last month"
          changeType="increase"
          icon={ShoppingCart}
          color="info"
        />
        <StatCard
          title="Platform Revenue"
          value="₹73,45,000"
          change="+18% from last month"
          changeType="increase"
          icon={IndianRupee}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium">Pending Approvals</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All
            </Button>
          </div>
          <DataTable columns={approvalColumns} data={pendingApprovals} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-medium">Recent Activities</h2>
            <Button variant="ghost" size="sm" className="text-primary text-xs">
              View All
            </Button>
          </div>
          <DataTable columns={activityColumns} data={recentActivities} />
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-card border border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Today's Overview</h3>
            <p className="text-muted-foreground text-sm">Platform performance</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-xl font-semibold text-primary">24</p>
              <p className="text-xs text-muted-foreground">New Orders</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-success">₹1,24,500</p>
              <p className="text-xs text-muted-foreground">Revenue</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-info">12</p>
              <p className="text-xs text-muted-foreground">New Users</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-warning">5</p>
              <p className="text-xs text-muted-foreground">Tickets</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
