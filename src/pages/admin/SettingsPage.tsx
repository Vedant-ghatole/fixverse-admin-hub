import AdminLayout from "@/components/admin/AdminLayout";
import PageHeader from "@/components/admin/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, AlertTriangle } from "lucide-react";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <PageHeader
        title="Platform Settings"
        description="Configure Fixverse system preferences"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="commission">Commission</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Platform Information</CardTitle>
              <CardDescription>Basic platform settings and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="Fixverse" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" defaultValue="support@fixverse.com" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input id="supportPhone" defaultValue="+91 98765 43210" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="Fixverse HQ, Nagpur, Maharashtra, India" className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Business Details</CardTitle>
              <CardDescription>Legal and tax information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gst">GST Number</Label>
                  <Input id="gst" defaultValue="27AABCU9603R1ZM" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pan">PAN Number</Label>
                  <Input id="pan" defaultValue="AABCU9603R" className="bg-muted/50" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commission" className="space-y-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Commission Settings</CardTitle>
              <CardDescription>Configure commission rates and payout cycles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultCommission">Default Commission (%)</Label>
                  <Input id="defaultCommission" type="number" defaultValue="10" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="payoutCycle">Payout Cycle (Days)</Label>
                  <Input id="payoutCycle" type="number" defaultValue="7" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minPayout">Minimum Payout Amount (₹)</Label>
                  <Input id="minPayout" type="number" defaultValue="1000" className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">GST Rate (%)</Label>
                  <Input id="taxRate" type="number" defaultValue="18" className="bg-muted/50" />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <h4 className="font-medium mb-4">Category-wise Commission</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span>Tools</span>
                    <Input type="number" defaultValue="10" className="w-20 bg-background" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span>Machinery</span>
                    <Input type="number" defaultValue="12" className="w-20 bg-background" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span>Safety</span>
                    <Input type="number" defaultValue="8" className="w-20 bg-background" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <span>Spare Parts</span>
                    <Input type="number" defaultValue="15" className="w-20 bg-background" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">Notification Preferences</CardTitle>
              <CardDescription>Configure email and SMS notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive email alerts for important events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Receive SMS for critical notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">New Order Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Seller Registration Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when new sellers register</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Support Ticket Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified for new support tickets</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Payout Request Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified for seller payout requests</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">User & Security Settings</CardTitle>
              <CardDescription>Configure authentication and security options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Require Email Verification</p>
                    <p className="text-sm text-muted-foreground">New users must verify email before access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Two-Factor Authentication (2FA)</p>
                    <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity (minutes)</p>
                  </div>
                  <Input type="number" defaultValue="30" className="w-20 bg-background" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">Password Policy</p>
                    <p className="text-sm text-muted-foreground">Minimum password length</p>
                  </div>
                  <Input type="number" defaultValue="8" className="w-20 bg-background" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 animate-fade-in">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-heading">System Actions</CardTitle>
              <CardDescription>Critical system operations and maintenance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border border-warning/30 bg-warning/5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">Enable to temporarily disable the platform for maintenance</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Clear Cache</p>
                    <p className="text-xs text-muted-foreground">Clear all cached data</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Database Backup</p>
                    <p className="text-xs text-muted-foreground">Create a manual backup</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start">
                  <div className="text-left">
                    <p className="font-medium">Export Data</p>
                    <p className="text-xs text-muted-foreground">Download all platform data</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-4 justify-start border-destructive/30 hover:bg-destructive/10">
                  <div className="text-left">
                    <p className="font-medium text-destructive">Reset Platform</p>
                    <p className="text-xs text-muted-foreground">Reset to default settings</p>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <Button className="bg-primary hover:bg-primary/90 px-8">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
