import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { 
  Plus,
  BarChart3,
  Users,
  DollarSign,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Activity,
  Briefcase,
  FileText,
  CreditCard
} from "lucide-react";

const EmployerDashboard = () => {
  const sidebarItems = [
    { title: "Dashboard", url: "/employer", icon: Activity },
    { title: "My Campaigns", url: "/employer/campaigns", icon: Briefcase },
    { title: "Create Task", url: "/employer/create-task", icon: Plus },
    { title: "Review Submissions", url: "/employer/submissions", icon: FileText },
    { title: "Payments", url: "/employer/payments", icon: CreditCard },
  ];

  const stats = [
    { label: "Active Campaigns", value: "8", icon: BarChart3, color: "text-primary" },
    { label: "Total Workers", value: "1,247", icon: Users, color: "text-success" },
    { label: "This Month Spent", value: "$2,847", icon: DollarSign, color: "text-warning" },
    { label: "Completion Rate", value: "94%", icon: CheckCircle, color: "text-success" }
  ];

  const activeCampaigns = [
    {
      id: 1,
      title: "Instagram Account Followers",
      target: 500,
      completed: 347,
      budget: "$250.00",
      status: "active",
      endDate: "2024-02-15"
    },
    {
      id: 2,
      title: "Mobile App Testing",
      target: 50,
      completed: 23,
      budget: "$150.00",
      status: "active",
      endDate: "2024-02-10"
    },
    {
      id: 3,
      title: "Product Review Survey",
      target: 200,
      completed: 156,
      budget: "$300.00",
      status: "active",
      endDate: "2024-02-20"
    }
  ];

  const recentSubmissions = [
    {
      id: 1,
      taskTitle: "Instagram Follow",
      worker: "Sarah Chen",
      submittedAt: "2 hours ago",
      status: "pending"
    },
    {
      id: 2,
      taskTitle: "App Testing",
      worker: "Mike Johnson",
      submittedAt: "4 hours ago", 
      status: "pending"
    },
    {
      id: 3,
      taskTitle: "Survey Response",
      worker: "Anna Rodriguez",
      submittedAt: "6 hours ago",
      status: "approved"
    },
    {
      id: 4,
      taskTitle: "Product Review",
      worker: "David Kim",
      submittedAt: "8 hours ago",
      status: "approved"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "pending": return "bg-warning/10 text-warning";
      case "approved": return "bg-success/10 text-success";
      case "paused": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold mb-4">
                Employer Portal
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link to={item.url} className="flex items-center space-x-3">
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, Company! 🚀</h1>
                <p className="text-muted-foreground">Here's your employer dashboard overview</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button className="bg-gradient-primary" asChild>
                  <Link to="/employer/create-task">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Task
                  </Link>
                </Button>
                <SidebarTrigger />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                        <stat.icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Active Campaigns */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Active Campaigns</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/employer/campaigns">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeCampaigns.map((campaign) => (
                      <div key={campaign.id} className="p-4 bg-muted/30 rounded-lg space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{campaign.title}</h4>
                            <p className="text-sm text-muted-foreground">Budget: {campaign.budget}</p>
                          </div>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{campaign.completed}/{campaign.target}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(campaign.completed / campaign.target) * 100}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Ends: {campaign.endDate}</span>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/employer/task/${campaign.id}`}>
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Recent Submissions & Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Submissions</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/employer/submissions">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        4 Pending
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentSubmissions.slice(0, 4).map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{submission.taskTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            by {submission.worker} • {submission.submittedAt}
                          </p>
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={getStatusColor(submission.status)}
                        >
                          {submission.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-primary" asChild>
                      <Link to="/employer/create-task">Create New Task</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/employer/submissions">Review Submissions</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/employer/payments">Manage Payments</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>This Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget Spent</span>
                        <span className="font-semibold">$2,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tasks Completed</span>
                        <span className="font-semibold">526</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Workers</span>
                        <span className="font-semibold">1,247</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EmployerDashboard;