import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { IndianRupee, Percent, Wallet, RefreshCw, Check, PauseCircle, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface CommissionSetting {
  id: string;
  category: string;
  commission: number;
  last_updated: string;
}

interface Transaction {
  id: string;
  txn_id: string;
  type: "order" | "payout" | "refund";
  order_id: string;
  seller: string;
  amount: number;
  status: "settled" | "processed" | "pending";
  txn_date: string;
}

interface PayoutRequest {
  id: string;
  request_id: string;
  seller: string;
  requested_amount: number;
  available_balance: number;
}

const PaymentsPage = () => {
  const [commissionSettings, setCommissionSettings] = useState<CommissionSetting[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [commRes, txnRes, payoutRes] = await Promise.all([
        supabase.from("commission_settings").select("*").order("category"),
        supabase.from("transactions").select("*").order("txn_date", { ascending: false }),
        supabase.from("payout_requests").select("*").order("created_at", { ascending: false }),
      ]);

      if (commRes.error) console.error("Error fetching commission settings:", commRes.error);
      if (txnRes.error) console.error("Error fetching transactions:", txnRes.error);
      if (payoutRes.error) console.error("Error fetching payout requests:", payoutRes.error);

      setCommissionSettings(commRes.data || []);
      setTransactions(txnRes.data || []);
      setPayoutRequests(payoutRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const commissionColumns = [
    { key: "category", header: "Category" },
    {
      key: "commission",
      header: "Commission %",
      render: (item: CommissionSetting) => (
        <span className="font-medium text-primary">{item.commission}%</span>
      ),
    },
    {
      key: "last_updated",
      header: "Last Updated",
      render: (item: CommissionSetting) => format(new Date(item.last_updated), "dd MMM yyyy"),
    },
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
    { key: "txn_id", header: "Txn ID", className: "font-mono" },
    {
      key: "type",
      header: "Type",
      render: (item: Transaction) => (
        <span className={`status-badge ${
          item.type === "order" ? "bg-success/20 text-success" :
          item.type === "payout" ? "bg-info/20 text-info" :
          "bg-destructive/20 text-destructive"
        }`}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
        </span>
      ),
    },
    { key: "order_id", header: "Order ID", className: "font-mono" },
    { key: "seller", header: "Seller" },
    {
      key: "amount",
      header: "Amount",
      render: (item: Transaction) => (
        <span className={`font-medium ${item.amount < 0 ? "text-destructive" : "text-success"}`}>
          {item.amount < 0 ? "-" : "+"}₹{Math.abs(item.amount).toLocaleString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item: Transaction) => <StatusBadge status={item.status} />,
    },
    {
      key: "txn_date",
      header: "Date",
      render: (item: Transaction) => format(new Date(item.txn_date), "dd MMM yyyy"),
    },
  ];

  const payoutColumns = [
    { key: "request_id", header: "Request ID", className: "font-mono" },
    { key: "seller", header: "Seller" },
    {
      key: "requested_amount",
      header: "Requested Amount",
      render: (item: PayoutRequest) => (
        <span className="font-medium">₹{item.requested_amount.toLocaleString()}</span>
      ),
    },
    {
      key: "available_balance",
      header: "Available Balance",
      render: (item: PayoutRequest) => (
        <span className="text-muted-foreground">₹{item.available_balance.toLocaleString()}</span>
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading payments...</div>
        </div>
      </AdminLayout>
    );
  }

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
