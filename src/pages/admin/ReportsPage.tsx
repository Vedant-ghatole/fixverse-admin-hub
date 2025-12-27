import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { IndianRupee, ShoppingCart, Users, Store, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

interface SalesData {
  date_label: string;
  sales: number;
  orders: number;
}

interface DetailedReport {
  date_label: string;
  orders: number;
  sales: number;
  commission: number;
  refunds: number;
}

interface CategoryData {
  category: string;
  sales: number;
  orders: number;
}

const ReportsPage = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [detailedReport, setDetailedReport] = useState<DetailedReport[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [salesRes, detailedRes, categoryRes] = await Promise.all([
        supabase.from("report_sales_daily").select("*").order("date_label"),
        supabase.from("report_detailed").select("*").order("date_label", { ascending: false }),
        supabase.from("report_category").select("*").order("category"),
      ]);

      if (salesRes.error) console.error("Error fetching sales data:", salesRes.error);
      if (detailedRes.error) console.error("Error fetching detailed report:", detailedRes.error);
      if (categoryRes.error) console.error("Error fetching category data:", categoryRes.error);

      setSalesData(salesRes.data || []);
      setDetailedReport(detailedRes.data || []);
      setCategoryData(categoryRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const reportColumns = [
    { key: "date_label", header: "Date" },
    {
      key: "orders",
      header: "Orders",
      render: (item: DetailedReport) => (
        <span className="font-medium">{item.orders}</span>
      ),
    },
    {
      key: "sales",
      header: "Sales",
      render: (item: DetailedReport) => (
        <span className="font-medium text-success">₹{item.sales.toLocaleString()}</span>
      ),
    },
    {
      key: "commission",
      header: "Commission",
      render: (item: DetailedReport) => (
        <span className="font-medium text-primary">₹{item.commission.toLocaleString()}</span>
      ),
    },
    {
      key: "refunds",
      header: "Refunds",
      render: (item: DetailedReport) => (
        <span className={item.refunds > 0 ? "text-destructive" : "text-muted-foreground"}>
          {item.refunds > 0 ? `-₹${item.refunds.toLocaleString()}` : "₹0"}
        </span>
      ),
    },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading reports...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PageHeader
        title="Reports & Analytics"
        description="Insights into sales, users, and platform performance"
        action={
          <Button className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sales"
          value="₹12,40,000"
          change="+18% from last month"
          changeType="increase"
          icon={IndianRupee}
          color="primary"
          className="animate-slide-up opacity-0 stagger-1"
        />
        <StatCard
          title="Total Orders"
          value="5,860"
          change="+23% from last month"
          changeType="increase"
          icon={ShoppingCart}
          color="success"
          className="animate-slide-up opacity-0 stagger-2"
        />
        <StatCard
          title="New Users"
          value="1,240"
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="info"
          className="animate-slide-up opacity-0 stagger-3"
        />
        <StatCard
          title="Active Sellers"
          value="320"
          change="+8% from last month"
          changeType="increase"
          icon={Store}
          color="warning"
          className="animate-slide-up opacity-0 stagger-4"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Select defaultValue="7days">
          <SelectTrigger className="w-40 bg-muted/50">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="daily">
          <SelectTrigger className="w-36 bg-muted/50">
            <SelectValue placeholder="Group By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6 animate-fade-in">
          {/* Sales Chart */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Sales Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date_label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Sales by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Orders Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date_label" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="orders" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="users" className="animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">User Growth</h3>
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              User growth chart will be displayed here
            </div>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Revenue Breakdown</h3>
            <div className="h-80 flex items-center justify-center text-muted-foreground">
              Revenue breakdown chart will be displayed here
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Report Table */}
      <div className="mt-8">
        <h2 className="text-lg font-heading font-semibold mb-4">Detailed Report</h2>
        <DataTable columns={reportColumns} data={detailedReport} />
      </div>
    </AdminLayout>
  );
};

export default ReportsPage;
