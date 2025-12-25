import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Eye, Truck, FileText, RefreshCw } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Order {
  id: string;
  buyer: string;
  seller: string;
  total: number;
  payment: "paid" | "refunded" | "pending";
  status: "new" | "shipped" | "delivered" | "cancelled" | "refunded";
  placedOn: string;
}

const orders: Order[] = [
  { id: "#OD1234", buyer: "Rahul Sharma", seller: "FixTools", total: 25000, payment: "paid", status: "new", placedOn: "05 Dec 2025" },
  { id: "#OD1235", buyer: "Amit Verma", seller: "PowerHub", total: 28200, payment: "paid", status: "shipped", placedOn: "03 Dec 2025" },
  { id: "#OD1236", buyer: "Sita Patel", seller: "SafeGear", total: 3250, payment: "refunded", status: "cancelled", placedOn: "01 Dec 2025" },
  { id: "#OD1237", buyer: "Priya Menon", seller: "FixTools", total: 15000, payment: "paid", status: "delivered", placedOn: "28 Nov 2025" },
  { id: "#OD1238", buyer: "Vikram Singh", seller: "AutoParts Hub", total: 8500, payment: "paid", status: "shipped", placedOn: "02 Dec 2025" },
  { id: "#OD1239", buyer: "Neha Gupta", seller: "PowerHub", total: 42000, payment: "paid", status: "new", placedOn: "06 Dec 2025" },
  { id: "#OD1240", buyer: "Raj Kumar", seller: "SafeGear", total: 1850, payment: "paid", status: "delivered", placedOn: "25 Nov 2025" },
  { id: "#OD1241", buyer: "Anita Desai", seller: "MotorParts India", total: 18500, payment: "refunded", status: "refunded", placedOn: "30 Nov 2025" },
];

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sellerFilter, setSellerFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeller = sellerFilter === "all" || order.seller === sellerFilter;
    return matchesSearch && matchesSeller;
  });

  const sellers = [...new Set(orders.map(o => o.seller))];

  const columns = [
    { key: "id", header: "Order ID", className: "font-mono" },
    { key: "buyer", header: "Buyer" },
    { key: "seller", header: "Seller" },
    {
      key: "total",
      header: "Total",
      render: (order: Order) => (
        <span className="font-medium">₹{order.total.toLocaleString()}</span>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      render: (order: Order) => <StatusBadge status={order.payment} />,
    },
    {
      key: "status",
      header: "Status",
      render: (order: Order) => <StatusBadge status={order.status} />,
    },
    { key: "placedOn", header: "Placed On" },
    {
      key: "actions",
      header: "Actions",
      render: (order: Order) => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-info">
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          {order.status === "new" && (
            <button className="action-btn action-btn-primary">
              <Truck className="w-3.5 h-3.5" />
              Update
            </button>
          )}
          {order.status === "shipped" && (
            <button className="action-btn action-btn-success">
              <Truck className="w-3.5 h-3.5" />
              Track
            </button>
          )}
          {(order.status === "delivered" || order.status === "shipped") && (
            <button className="action-btn action-btn-info">
              <FileText className="w-3.5 h-3.5" />
              Invoice
            </button>
          )}
          {order.status === "cancelled" && order.payment === "paid" && (
            <button className="action-btn action-btn-danger">
              <RefreshCw className="w-3.5 h-3.5" />
              Refund
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Orders Management"
        description="Monitor and control all marketplace orders"
      />

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            <TabsTrigger value="refunded">Refunded</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search order / buyer / seller"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-muted/50"
            />
            <Select value={sellerFilter} onValueChange={setSellerFilter}>
              <SelectTrigger className="w-40 bg-muted/50">
                <SelectValue placeholder="All Sellers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sellers</SelectItem>
                {sellers.map(seller => (
                  <SelectItem key={seller} value={seller}>{seller}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders} />
        </TabsContent>
        <TabsContent value="new" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders.filter(o => o.status === "new")} />
        </TabsContent>
        <TabsContent value="shipped" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders.filter(o => o.status === "shipped")} />
        </TabsContent>
        <TabsContent value="delivered" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders.filter(o => o.status === "delivered")} />
        </TabsContent>
        <TabsContent value="cancelled" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders.filter(o => o.status === "cancelled")} />
        </TabsContent>
        <TabsContent value="refunded" className="animate-fade-in">
          <DataTable columns={columns} data={filteredOrders.filter(o => o.status === "refunded")} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default OrdersPage;
