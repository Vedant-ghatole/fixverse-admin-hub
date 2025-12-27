import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Eye, Check, X, Ban } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  product_code: string;
  name: string;
  seller: string;
  category: string;
  price: number;
  status: "pending" | "approved" | "rejected";
  icon: string;
}

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: "icon",
      header: "Image",
      render: (product: Product) => (
        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl">
          {product.icon}
        </div>
      ),
    },
    {
      key: "name",
      header: "Product",
      render: (product: Product) => (
        <div>
          <p className="font-medium">{product.name}</p>
          <p className="text-xs text-muted-foreground">ID: {product.product_code}</p>
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading products...</div>
        </div>
      </AdminLayout>
    );
  }

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
