import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users, products, orders..."
                className="pl-10 bg-muted/50 border-border focus:bg-card"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <div className="text-right">
                  <p className="text-sm font-medium">Welcome back</p>
                  <p className="text-xs text-muted-foreground">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-warning flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">SA</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
