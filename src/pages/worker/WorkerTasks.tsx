import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Eye
} from "lucide-react";

const WorkerTasks = () => {
  const tasks = {
    inProgress: [
      {
        id: 2,
        title: "Test Mobile App Features",
        employer: "TechStart Inc.",
        amount: "$3.00",
        startedAt: "2 hours ago",
        deadline: "in 4 hours",
        progress: 60,
        status: "in-progress"
      },
      {
        id: 5,
        title: "Social Media Engagement",
        employer: "BrandBoost",
        amount: "$1.50",
        startedAt: "30 minutes ago", 
        deadline: "in 23 hours",
        progress: 20,
        status: "in-progress"
      }
    ],
    submitted: [
      {
        id: 3,
        title: "Product Review Survey",
        employer: "MarketRes Ltd.",
        amount: "$1.25",
        submittedAt: "1 day ago",
        status: "submitted"
      },
      {
        id: 6,
        title: "Website Feedback",
        employer: "UXimprove Co.",
        amount: "$2.75",
        submittedAt: "3 hours ago",
        status: "submitted"
      }
    ],
    approved: [
      {
        id: 1,
        title: "Follow Instagram Account",
        employer: "SocialGrow Co.",
        amount: "$0.50",
        completedAt: "2 hours ago",
        paidAt: "1 hour ago",
        rating: 5,
        status: "approved"
      },
      {
        id: 4,
        title: "App Store Review",
        employer: "MobileFirst Ltd.",
        amount: "$2.00",
        completedAt: "1 day ago",
        paidAt: "1 day ago", 
        rating: 5,
        status: "approved"
      },
      {
        id: 7,
        title: "Email Survey Completion",
        employer: "DataInsights",
        amount: "$1.75",
        completedAt: "3 days ago",
        paidAt: "2 days ago",
        rating: 4,
        status: "approved"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-warning/10 text-warning";
      case "submitted": return "bg-primary/10 text-primary";
      case "approved": return "bg-success/10 text-success";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const TaskCard = ({ task, showProgress = false }: { task: any; showProgress?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-medium">{task.title}</h4>
            <p className="text-sm text-muted-foreground">{task.employer}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-success">{task.amount}</p>
            <Badge className={getStatusColor(task.status)} variant="secondary">
              {task.status.replace('-', ' ')}
            </Badge>
          </div>
        </div>

        {showProgress && task.progress && (
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              {task.startedAt && `Started ${task.startedAt}`}
              {task.submittedAt && `Submitted ${task.submittedAt}`}
              {task.completedAt && `Completed ${task.completedAt}`}
            </span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={`/worker/task/${task.id}`}>
              <Eye className="w-4 h-4 mr-1" />
              View
            </Link>
          </Button>
        </div>

        {task.deadline && (
          <div className="mt-2 flex items-center text-sm text-warning">
            <Clock className="w-4 h-4 mr-1" />
            <span>Due {task.deadline}</span>
          </div>
        )}

        {task.rating && (
          <div className="mt-2 flex items-center text-sm">
            <span className="text-muted-foreground mr-2">Rating:</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < task.rating ? "text-yellow-500" : "text-muted"}>
                  ⭐
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <p className="text-muted-foreground">Manage your current and completed tasks</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/worker">← Back to Dashboard</Link>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{tasks.inProgress.length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertCircle className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{tasks.submitted.length}</p>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">{tasks.approved.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="in-progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="in-progress" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>In Progress ({tasks.inProgress.length})</span>
            </TabsTrigger>
            <TabsTrigger value="submitted" className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4" />
              <span>Submitted ({tasks.submitted.length})</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4" />
              <span>Approved ({tasks.approved.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in-progress" className="space-y-4">
            {tasks.inProgress.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TaskCard task={task} showProgress={true} />
              </motion.div>
            ))}
            {tasks.inProgress.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tasks in progress</h3>
                  <p className="text-muted-foreground mb-4">
                    Start working on some tasks to see them here.
                  </p>
                  <Button asChild>
                    <Link to="/worker/jobs">Find Tasks</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {tasks.submitted.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
            {tasks.submitted.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No submitted tasks</h3>
                  <p className="text-muted-foreground">
                    Tasks you submit for review will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {tasks.approved.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TaskCard task={task} />
              </motion.div>
            ))}
            {tasks.approved.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No completed tasks</h3>
                  <p className="text-muted-foreground">
                    Your approved tasks will appear here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkerTasks;