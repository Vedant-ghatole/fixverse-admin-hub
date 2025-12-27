import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface Ticket {
  id: string;
  ticket_id: string;
  subject: string;
  ticket_user: string;
  user_type: "Buyer" | "Seller";
  category: string;
  status: "open" | "in_progress" | "resolved";
  priority: "low" | "medium" | "high";
  created_on: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [ticketsRes, faqsRes] = await Promise.all([
        supabase.from("support_tickets").select("*").order("created_on", { ascending: false }),
        supabase.from("faqs").select("*").order("sort_order"),
      ]);

      if (ticketsRes.error) console.error("Error fetching tickets:", ticketsRes.error);
      if (faqsRes.error) console.error("Error fetching faqs:", faqsRes.error);

      setTickets(ticketsRes.data || []);
      setFaqs(faqsRes.data || []);
      setLoading(false);
    };

    fetchData();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = 
      ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticket_user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || ticket.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(tickets.map(t => t.category))];

  const columns = [
    { key: "ticket_id", header: "Ticket ID", className: "font-mono" },
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
      key: "ticket_user",
      header: "User",
      render: (ticket: Ticket) => (
        <div>
          <p className="font-medium">{ticket.ticket_user}</p>
          <span className={`text-xs ${ticket.user_type === "Seller" ? "text-info" : "text-muted-foreground"}`}>
            {ticket.user_type}
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
    {
      key: "created_on",
      header: "Created On",
      render: (ticket: Ticket) => format(new Date(ticket.created_on), "dd MMM yyyy"),
    },
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Loading support data...</div>
        </div>
      </AdminLayout>
    );
  }

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
                <AccordionItem key={faq.id} value={`faq-${index}`} className="border border-border rounded-lg px-4">
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
