import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import PageHeader from "@/components/admin/PageHeader";
import { Eye, MessageSquare, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Ticket {
  id: string;
  subject: string;
  user: string;
  userType: "Buyer" | "Seller";
  category: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  createdOn: string;
}

const tickets: Ticket[] = [
  { id: "#7821", subject: "Payout delayed for order #OD1234", user: "FixTools Pvt Ltd", userType: "Seller", category: "Payout Problems", status: "open", priority: "high", createdOn: "05 Dec 2025" },
  { id: "#7820", subject: "Order not delivered", user: "Rahul Sharma", userType: "Buyer", category: "Order Issues", status: "in_progress", priority: "high", createdOn: "04 Dec 2025" },
  { id: "#7819", subject: "Product listing rejected incorrectly", user: "PowerHub Industries", userType: "Seller", category: "Store & Product", status: "open", priority: "medium", createdOn: "04 Dec 2025" },
  { id: "#7818", subject: "Refund not received", user: "Sita Patel", userType: "Buyer", category: "Payments & Refunds", status: "in_progress", priority: "high", createdOn: "03 Dec 2025" },
  { id: "#7817", subject: "Login issues with OTP", user: "Amit Verma", userType: "Buyer", category: "Account Help", status: "resolved", priority: "low", createdOn: "02 Dec 2025" },
  { id: "#7816", subject: "Commission calculation dispute", user: "SafeGear Solutions", userType: "Seller", category: "Payout Problems", status: "resolved", priority: "medium", createdOn: "01 Dec 2025" },
  { id: "#7815", subject: "Wrong product delivered", user: "Priya Menon", userType: "Buyer", category: "Order Issues", status: "resolved", priority: "medium", createdOn: "30 Nov 2025" },
];

const faqs = [
  {
    question: "How do I track my order?",
    answer: "Go to Orders > Track Order to see real-time updates on your order status including shipping and delivery information."
  },
  {
    question: "How long does a refund take?",
    answer: "Refunds are processed within 5-7 working days after the return is received and verified by our team."
  },
  {
    question: "How can sellers request a payout?",
    answer: "Sellers can request payouts from their dashboard under Payments & Earnings. Payouts are processed within 3-5 working days."
  },
  {
    question: "What is the commission structure?",
    answer: "Commission rates vary by category: Tools (10%), Machinery (12%), Safety (8%), Spare Parts (15%). View the full breakdown in Payments & Commission settings."
  },
];

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(tickets.map(t => t.category))];

  const columns = [
    { key: "id", header: "Ticket ID", className: "font-mono" },
    {
      key: "subject",
      header: "Subject",
      render: (ticket: Ticket) => (
        <div className="max-w-xs">
          <p className="font-medium truncate">{ticket.subject}</p>
          <p className="text-xs text-muted-foreground">{ticket.category}</p>
        </div>
      ),
    },
    {
      key: "user",
      header: "User",
      render: (ticket: Ticket) => (
        <div>
          <p className="font-medium">{ticket.user}</p>
          <span className={`text-xs ${ticket.userType === "Seller" ? "text-info" : "text-muted-foreground"}`}>
            {ticket.userType}
          </span>
        </div>
      ),
    },
    {
      key: "priority",
      header: "Priority",
      render: (ticket: Ticket) => (
        <span className={`status-badge ${
          ticket.priority === "high" ? "bg-destructive/20 text-destructive" :
          ticket.priority === "medium" ? "bg-warning/20 text-warning" :
          "bg-muted text-muted-foreground"
        }`}>
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (ticket: Ticket) => <StatusBadge status={ticket.status} />,
    },
    { key: "createdOn", header: "Created On" },
    {
      key: "actions",
      header: "Actions",
      render: (ticket: Ticket) => (
        <div className="flex items-center gap-2">
          <button className="action-btn action-btn-info">
            <Eye className="w-3.5 h-3.5" />
            View
          </button>
          {ticket.status !== "resolved" && (
            <>
              <button className="action-btn action-btn-primary">
                <MessageSquare className="w-3.5 h-3.5" />
                Reply
              </button>
              <button className="action-btn action-btn-success">
                <CheckCircle className="w-3.5 h-3.5" />
                Resolve
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Support Tickets"
        description="Handle customer and seller support issues"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-2xl font-bold text-destructive">
            {tickets.filter(t => t.priority === "high" && t.status !== "resolved").length}
          </p>
          <p className="text-sm text-muted-foreground">High Priority Open</p>
        </div>
        <div className="p-4 rounded-xl bg-warning/10 border border-warning/20">
          <p className="text-2xl font-bold text-warning">
            {tickets.filter(t => t.status === "open").length}
          </p>
          <p className="text-sm text-muted-foreground">Open Tickets</p>
        </div>
        <div className="p-4 rounded-xl bg-info/10 border border-info/20">
          <p className="text-2xl font-bold text-info">
            {tickets.filter(t => t.status === "in_progress").length}
          </p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </div>
        <div className="p-4 rounded-xl bg-success/10 border border-success/20">
          <p className="text-2xl font-bold text-success">
            {tickets.filter(t => t.status === "resolved").length}
          </p>
          <p className="text-sm text-muted-foreground">Resolved Today</p>
        </div>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="tickets">All Tickets</TabsTrigger>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-4">
          <Input
            placeholder="Search ticket ID, subject or user"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80 bg-muted/50"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48 bg-muted/50">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="tickets" className="animate-fade-in">
          <DataTable columns={columns} data={filteredTickets} />
        </TabsContent>
        <TabsContent value="open" className="animate-fade-in">
          <DataTable columns={columns} data={filteredTickets.filter(t => t.status === "open")} />
        </TabsContent>
        <TabsContent value="in_progress" className="animate-fade-in">
          <DataTable columns={columns} data={filteredTickets.filter(t => t.status === "in_progress")} />
        </TabsContent>
        <TabsContent value="resolved" className="animate-fade-in">
          <DataTable columns={columns} data={filteredTickets.filter(t => t.status === "resolved")} />
        </TabsContent>
        <TabsContent value="faqs" className="animate-fade-in">
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-heading font-semibold text-lg mb-4">Frequently Asked Questions</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default SupportPage;
