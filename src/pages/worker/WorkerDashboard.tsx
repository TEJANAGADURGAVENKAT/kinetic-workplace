import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Search, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Star,
  Briefcase,
  User,
  Wallet,
  Activity
} from "lucide-react";

const WorkerDashboard = () => {
  const sidebarItems = [
    { title: "Dashboard", url: "/worker", icon: Activity },
    { title: "Available Jobs", url: "/worker/jobs", icon: Search },
    { title: "My Tasks", url: "/worker/tasks", icon: Briefcase },
    { title: "Earnings", url: "/worker/earnings", icon: Wallet },
    { title: "Profile", url: "/worker/profile", icon: User },
  ];

  const stats = [
    { label: "Current Balance", value: "$247.50", icon: DollarSign, color: "text-success" },
    { label: "Tasks Completed", value: "23", icon: CheckCircle, color: "text-primary" },
    { label: "In Progress", value: "3", icon: Clock, color: "text-warning" },
    { label: "Success Rate", value: "98%", icon: TrendingUp, color: "text-success" }
  ];

  const recentTasks = [
    {
      id: 1,
      title: "Follow Instagram Account",
      employer: "SocialGrow Co.",
      amount: "$0.50",
      status: "completed",
      completedAt: "2 hours ago"
    },
    {
      id: 2,
      title: "Test Mobile App Features",
      employer: "TechStart Inc.",
      amount: "$3.00",
      status: "in-progress",
      deadline: "in 4 hours"
    },
    {
      id: 3,
      title: "Product Review Survey",
      employer: "MarketRes Ltd.",
      amount: "$1.25",
      status: "submitted",
      submittedAt: "1 day ago"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="w-64">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-lg font-semibold mb-4">
                Worker Portal
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
                <h1 className="text-3xl font-bold">Welcome back, John! 👋</h1>
                <p className="text-muted-foreground">Here's your worker dashboard overview</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className="bg-success/10 text-success">
                  <Star className="w-3 h-3 mr-1" />
                  4.9 Rating
                </Badge>
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
              {/* Recent Tasks */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Recent Tasks</CardTitle>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/worker/tasks">View All</Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentTasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.employer}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="font-semibold">{task.amount}</p>
                          <Badge 
                            variant={
                              task.status === 'completed' ? 'default' : 
                              task.status === 'in-progress' ? 'secondary' : 'outline'
                            }
                            className={
                              task.status === 'completed' ? 'bg-success text-success-foreground' :
                              task.status === 'in-progress' ? 'bg-warning text-warning-foreground' :
                              'bg-muted text-muted-foreground'
                            }
                          >
                            {task.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-primary" asChild>
                      <Link to="/worker/jobs">Find New Tasks</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/worker/earnings">Withdraw Earnings</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/worker/profile">Update Profile</Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Earnings Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>This Week</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Earnings</span>
                        <span className="font-semibold">$45.75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tasks</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="font-medium">Average per task</span>
                        <span className="font-semibold text-success">$3.81</span>
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

export default WorkerDashboard;