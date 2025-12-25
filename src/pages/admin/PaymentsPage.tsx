import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { IndianRupee, Percent, Wallet, RefreshCw, Check, PauseCircle, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const commissionSettings = [
  { category: "Tools", commission: 10, lastUpdated: "01 Dec 2025" },
  { category: "Machinery", commission: 12, lastUpdated: "15 Nov 2025" },
  { category: "Safety", commission: 8, lastUpdated: "20 Nov 2025" },
  { category: "Spare Parts", commission: 15, lastUpdated: "10 Nov 2025" },
];

const transactions = [
  { id: "T9876", type: "Order", orderId: "#OD1234", seller: "FixTools", amount: 5000, status: "settled" as const, date: "05 Dec 2025" },
  { id: "T9881", type: "Payout", orderId: "-", seller: "PowerHub", amount: 25000, status: "processed" as const, date: "03 Dec 2025" },
  { id: "T9884", type: "Order", orderId: "#OD1237", seller: "FixTools", amount: 1500, status: "settled" as const, date: "28 Nov 2025" },
  { id: "T9890", type: "Refund", orderId: "#OD1236", seller: "SafeGear", amount: -3250, status: "processed" as const, date: "01 Dec 2025" },
  { id: "T9895", type: "Order", orderId: "#OD1238", seller: "AutoParts Hub", amount: 850, status: "pending" as const, date: "02 Dec 2025" },
];

const payoutRequests = [
  { id: "PR-221", seller: "FixTools", requestedAmount: 18000, availableBalance: 22400 },
  { id: "PR-222", seller: "PowerHub", requestedAmount: 35000, availableBalance: 42000 },
  { id: "PR-223", seller: "SafeGear", requestedAmount: 8500, availableBalance: 12000 },
];

const PaymentsPage = () => {
  const commissionColumns = [
    { key: "category", header: "Category" },
    {
      key: "commission",
      header: "Commission %",
      render: (item: typeof commissionSettings[0]) => (
        <span className="font-medium text-primary">{item.commission}%</span>
      ),
    },
    { key: "lastUpdated", header: "Last Updated" },
    {
      key: "actions",
      header: "Action",
      render: () => (
        <button className="action-btn action-btn-primary">
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
      ),
    },
  ];

  const transactionColumns = [
    { key: "id", header: "Txn ID", className: "font-mono" },
    {
      key: "type",
      header: "Type",
      render: (item: typeof transactions[0]) => (
        <span className={`status-badge ${
          item.type === "Order" ? "bg-success/20 text-success" :
          item.type === "Payout" ? "bg-info/20 text-info" :
          "bg-destructive/20 text-destructive"
        }`}>
          {item.type}
        </span>
      ),
    },
    { key: "orderId", header: "Order ID", className: "font-mono" },
    { key: "seller", header: "Seller" },
    {
      key: "amount",
      header: "Amount",
      render: (item: typeof transactions[0]) => (
        <span className={`font-medium ${item.amount < 0 ? "text-destructive" : "text-success"}`}>
          {item.amount < 0 ? "-" : "+"}₹{Math.abs(item.amount).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: typeof transactions[0]) => <StatusBadge status={item.status} />,
    },
    { key: "date", header: "Date" },
  ];

  const payoutColumns = [
    { key: "id", header: "Request ID", className: "font-mono" },
    { key: "seller", header: "Seller" },
    {
      key: "requestedAmount",
      header: "Requested Amount",
      render: (item: typeof payoutRequests[0]) => (
        <span className="font-medium">₹{item.requestedAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "availableBalance",
      header: "Available Balance",
      render: (item: typeof payoutRequests[0]) => (
        <span className="text-muted-foreground">₹{item.availableBalance.toLocaleString()}</span>
      ),
    },
    {
      key: "actions",
      header: "Action",
      render: () => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-success">
            <Check className="w-3.5 h-3.5" />
            Approve
          </button>
          <button className="action-btn action-btn-danger">
            <PauseCircle className="w-3.5 h-3.5" />
            Hold
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Payments & Commission"
        description="Track platform revenue, commissions and seller payouts"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total GMV"
          value="₹12,40,000"
          change="+15% from last month"
          changeType="increase"
          icon={IndianRupee}
          color="primary"
          className="animate-slide-up opacity-0 stagger-1"
        />
        <StatCard
          title="Total Commission"
          value="₹1,48,800"
          change="+12% from last month"
          changeType="increase"
          icon={Percent}
          color="success"
          className="animate-slide-up opacity-0 stagger-2"
        />
        <StatCard
          title="Seller Payouts"
          value="₹10,62,000"
          change="Processed this month"
          changeType="neutral"
          icon={Wallet}
          color="info"
          className="animate-slide-up opacity-0 stagger-3"
        />
        <StatCard
          title="Refunds"
          value="₹29,200"
          change="3 pending refunds"
          changeType="neutral"
          icon={RefreshCw}
          color="warning"
          className="animate-slide-up opacity-0 stagger-4"
        />
      </div>

      {/* Commission Settings */}
      <div className="mb-8">
        <h2 className="text-lg font-heading font-semibold mb-4">Commission Settings</h2>
        <DataTable columns={commissionColumns} data={commissionSettings} />
      </div>

      {/* Transactions */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold">Transactions</h2>
          <div className="flex items-center gap-4">
            <Input placeholder="Search order / seller" className="w-64 bg-muted/50" />
            <Select defaultValue="all">
              <SelectTrigger className="w-36 bg-muted/50">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="order">Orders</SelectItem>
                <SelectItem value="payout">Payouts</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable columns={transactionColumns} data={transactions} />
      </div>

      {/* Seller Payout Requests */}
      <div>
        <h2 className="text-lg font-heading font-semibold mb-4">Seller Payout Requests</h2>
        <DataTable columns={payoutColumns} data={payoutRequests} />
      </div>
    </AdminLayout>
  );
};

export default PaymentsPage;
