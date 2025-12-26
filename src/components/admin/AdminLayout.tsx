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
      
      <div className="ml-56">
        <header className="sticky top-0 z-40 bg-background border-b border-border">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 h-9 bg-muted border-0 text-sm"
              />
            </div>
            
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-md hover:bg-muted">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>
              
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">SA</span>
                </div>
                <span className="text-sm">Admin</span>
              </div>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;