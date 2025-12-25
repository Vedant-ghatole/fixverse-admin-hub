import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Eye, Ban, CheckCircle, XCircle, UserCheck } from "lucide-react";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "Buyer" | "Seller";
  status: "active" | "pending" | "blocked";
  joinedOn: string;
}

const users: User[] = [
  { id: "U1021", name: "Rahul Sharma", email: "rahul@email.com", role: "Buyer", status: "active", joinedOn: "12 Nov 2025" },
  { id: "U1045", name: "FixTools Pvt Ltd", email: "contact@fixtools.com", role: "Seller", status: "pending", joinedOn: "02 Dec 2025" },
  { id: "U1078", name: "Amit Verma", email: "amit@email.com", role: "Buyer", status: "blocked", joinedOn: "18 Oct 2025" },
  { id: "U1089", name: "PowerHub Industries", email: "info@powerhub.com", role: "Seller", status: "active", joinedOn: "25 Nov 2025" },
  { id: "U1092", name: "Sita Patel", email: "sita@email.com", role: "Buyer", status: "active", joinedOn: "01 Dec 2025" },
  { id: "U1105", name: "SafeGear Solutions", email: "sales@safegear.in", role: "Seller", status: "active", joinedOn: "28 Nov 2025" },
  { id: "U1112", name: "Priya Menon", email: "priya@email.com", role: "Buyer", status: "active", joinedOn: "05 Dec 2025" },
  { id: "U1118", name: "AutoParts Hub", email: "contact@autoparts.in", role: "Seller", status: "pending", joinedOn: "06 Dec 2025" },
];

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: "id", header: "User ID" },
    {
      key: "name",
      header: "Name",
      render: (user: User) => (
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user: User) => (
        <span className={`status-badge ${user.role === "Seller" ? "bg-info/20 text-info" : "bg-muted text-muted-foreground"}`}>
          {user.role}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user: User) => <StatusBadge status={user.status} />,
    },
    { key: "joinedOn", header: "Joined On" },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-info">
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          {user.status === "pending" && (
            <>
              <button className="action-btn action-btn-success">
                <UserCheck className="w-3.5 h-3.5" />
                Verify
              </button>
              <button className="action-btn action-btn-danger">
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </button>
            </>
          )}
          {user.status === "active" && (
            <button className="action-btn action-btn-danger">
              <Ban className="w-3.5 h-3.5" />
              Block
            </button>
          )}
          {user.status === "blocked" && (
            <button className="action-btn action-btn-success">
              <CheckCircle className="w-3.5 h-3.5" />
              Unblock
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="User Management"
        description="Manage buyers and sellers on Fixverse"
      />

      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="buyers">Buyers</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-muted/50"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36 bg-muted/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="animate-fade-in">
          <DataTable columns={columns} data={filteredUsers} />
        </TabsContent>
        <TabsContent value="buyers" className="animate-fade-in">
          <DataTable columns={columns} data={filteredUsers.filter(u => u.role === "Buyer")} />
        </TabsContent>
        <TabsContent value="sellers" className="animate-fade-in">
          <DataTable columns={columns} data={filteredUsers.filter(u => u.role === "Seller")} />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default UsersPage;
