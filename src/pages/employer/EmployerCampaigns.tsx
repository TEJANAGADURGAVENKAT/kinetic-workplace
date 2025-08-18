import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search,
  Plus,
  Eye,
  Pause,
  Play,
  BarChart3,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock
} from "lucide-react";

const EmployerCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const campaigns = {
    active: [
      {
        id: 1,
        title: "Instagram Account Followers",
        description: "Increase Instagram followers by having workers follow our main account",
        target: 500,
        completed: 347,
        budget: "$250.00",
        spent: "$173.50",
        status: "active",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        category: "Social Media"
      },
      {
        id: 2,
        title: "Mobile App User Testing",
        description: "Test our new mobile app features and provide feedback on usability",
        target: 50,
        completed: 23,
        budget: "$150.00",
        spent: "$69.00",
        status: "active",
        startDate: "2024-01-20",
        endDate: "2024-02-10",
        category: "App Testing"
      },
      {
        id: 3,
        title: "Product Review Collection",
        description: "Collect genuine product reviews from verified users",
        target: 200,
        completed: 156,
        budget: "$300.00",
        spent: "$234.00",
        status: "active",
        startDate: "2024-01-10",
        endDate: "2024-02-20",
        category: "Reviews"
      }
    ],
    paused: [
      {
        id: 4,
        title: "Website Feedback Survey",
        description: "Gather user feedback on our new website design",
        target: 100,
        completed: 45,
        budget: "$125.00",
        spent: "$56.25",
        status: "paused",
        startDate: "2024-01-05",
        endDate: "2024-02-05",
        category: "Survey"
      }
    ],
    completed: [
      {
        id: 5,
        title: "Social Media Engagement",
        description: "Boost engagement on our social media posts",
        target: 300,
        completed: 300,
        budget: "$180.00",
        spent: "$180.00",
        status: "completed",
        startDate: "2023-12-01",
        endDate: "2024-01-01",
        category: "Social Media"
      },
      {
        id: 6,
        title: "Email List Building",
        description: "Build email subscriber list through targeted campaigns",
        target: 150,
        completed: 150,
        budget: "$225.00",
        spent: "$225.00",
        status: "completed",
        startDate: "2023-11-15",
        endDate: "2023-12-15",
        category: "Marketing"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success";
      case "paused": return "bg-warning/10 text-warning";
      case "completed": return "bg-primary/10 text-primary";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const CampaignCard = ({ campaign }: { campaign: any }) => {
    const completionRate = (campaign.completed / campaign.target) * 100;
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold">{campaign.title}</h3>
                <Badge className={getStatusColor(campaign.status)}>
                  {campaign.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
              <Badge variant="outline" className="text-xs">
                {campaign.category}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{campaign.completed}/{campaign.target}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{completionRate.toFixed(0)}% Complete</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Budget</span>
                <span className="font-medium">{campaign.spent}/{campaign.budget}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(parseFloat(campaign.spent.replace('$', '')) / parseFloat(campaign.budget.replace('$', ''))) * 100}%` 
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{campaign.startDate} - {campaign.endDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {campaign.status === "active" && (
                <Button size="sm" variant="outline">
                  <Pause className="h-3 w-3 mr-1" />
                  Pause
                </Button>
              )}
              {campaign.status === "paused" && (
                <Button size="sm" variant="outline">
                  <Play className="h-3 w-3 mr-1" />
                  Resume
                </Button>
              )}
            </div>
            <Button size="sm" asChild>
              <Link to={`/employer/task/${campaign.id}`}>
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const filteredCampaigns = (campaignList: any[]) => 
    campaignList.filter(campaign =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Campaigns</h1>
            <p className="text-muted-foreground">Manage and monitor your task campaigns</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link to="/employer">← Back to Dashboard</Link>
            </Button>
            <Button className="bg-gradient-primary" asChild>
              <Link to="/employer/create-task">
                <Plus className="h-4 w-4 mr-2" />
                Create New Campaign
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{campaigns.active.length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{campaigns.paused.length}</p>
              <p className="text-sm text-muted-foreground">Paused</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">{campaigns.completed.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold">$1,247</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Active ({campaigns.active.length})</span>
            </TabsTrigger>
            <TabsTrigger value="paused" className="flex items-center space-x-2">
              <Pause className="h-4 w-4" />
              <span>Paused ({campaigns.paused.length})</span>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Completed ({campaigns.completed.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCampaigns(campaigns.active).map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
            {filteredCampaigns(campaigns.active).length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No active campaigns</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first campaign to start getting tasks completed.
                  </p>
                  <Button asChild>
                    <Link to="/employer/create-task">Create Campaign</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="paused" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCampaigns(campaigns.paused).map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredCampaigns(campaigns.completed).map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CampaignCard campaign={campaign} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployerCampaigns;