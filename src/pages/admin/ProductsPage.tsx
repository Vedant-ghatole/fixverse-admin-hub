import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Eye, Check, X, Ban, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  id: number;
  name: string;
  seller: string;
  category: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Hydraulic Jack 500T", seller: "FixTools", category: "Tools", price: 24500, status: "pending", image: "🔧" },
  { id: 2, name: "Drill Machine Pro", seller: "PowerHub", category: "Machinery", price: 22500, status: "approved", image: "⚙️" },
  { id: 3, name: "Safety Helmet Industrial", seller: "SafeGear", category: "Safety", price: 2650, status: "rejected", image: "🪖" },
  { id: 4, name: "Electric Motor 5HP", seller: "MotorParts India", category: "Machinery", price: 18500, status: "approved", image: "🔌" },
  { id: 5, name: "Welding Machine Arc 250A", seller: "FixTools", category: "Tools", price: 35000, status: "pending", image: "⚡" },
  { id: 6, name: "Compressor 10HP", seller: "PowerHub", category: "Machinery", price: 85000, status: "approved", image: "🏭" },
  { id: 7, name: "Tool Kit Premium 150pc", seller: "AutoParts Hub", category: "Tools", price: 4500, status: "pending", image: "🧰" },
  { id: 8, name: "Safety Goggles Pro", seller: "SafeGear", category: "Safety", price: 850, status: "approved", image: "🥽" },
];

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (product: Product) => (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
          {product.image}
        </div>
      ),
    },
    {
      key: "name",
      header: "Product",
      render: (product: Product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">ID: PRD-{product.id.toString().padStart(4, "0")}</p>
        </div>
      ),
    },
    { key: "seller", header: "Seller" },
    {
      key: "category",
      header: "Category",
      render: (product: Product) => (
        <span className="status-badge bg-muted text-muted-foreground">
          {product.category}
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (product: Product) => (
        <span className="font-medium">₹{product.price.toLocaleString()}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (product: Product) => <StatusBadge status={product.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (product: Product) => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-info">
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          {product.status === "pending" && (
            <>
              <button className="action-btn action-btn-success">
                <Check className="w-3.5 h-3.5" />
                Approve
              </button>
              <button className="action-btn action-btn-danger">
                <X className="w-3.5 h-3.5" />
                Reject
              </button>
            </>
          )}
          {product.status === "approved" && (
            <button className="action-btn action-btn-danger">
              <Ban className="w-3.5 h-3.5" />
              Disable
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Product Management"
        description="Review and manage all listed products"
      />

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending Approval</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search product or seller"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-muted/50"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 bg-muted/50">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
                <SelectItem value="machinery">Machinery</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="animate-fade-in">
          <DataTable columns={columns} data={filteredProducts} />
        </TabsContent>
        <TabsContent value="pending" className="animate-fade-in">
          <DataTable columns={columns} data={filteredProducts.filter(p => p.status === "pending")} />
        </TabsContent>
        <TabsContent value="approved" className="animate-fade-in">
          <DataTable columns={columns} data={filteredProducts.filter(p => p.status === "approved")} />
        </TabsContent>
        <TabsContent value="rejected" className="animate-fade-in">
          <DataTable columns={columns} data={filteredProducts.filter(p => p.status === "rejected")} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ProductsPage;
