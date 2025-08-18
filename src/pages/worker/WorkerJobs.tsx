import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search,
  Filter,
  Clock,
  DollarSign,
  Users,
  Star,
  Instagram,
  Smartphone,
  MessageSquare
} from "lucide-react";

const WorkerJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const availableJobs = [
    {
      id: 1,
      title: "Follow Instagram Account & Like Posts",
      description: "Follow @brandaccount on Instagram and like the last 10 posts. Screenshot required as proof.",
      employer: "SocialGrow Co.",
      amount: "$0.50",
      timeEstimate: "2 minutes",
      slotsTotal: 100,
      slotsRemaining: 73,
      category: "social-media",
      rating: 4.8,
      icon: Instagram,
      requirements: ["Instagram account", "Screenshot proof"],
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Test Mobile App Features",
      description: "Download our app, test key features for 5 minutes, and provide feedback on user experience.",
      employer: "TechStart Inc.",
      amount: "$3.00",
      timeEstimate: "10 minutes",
      slotsTotal: 50,
      slotsRemaining: 12,
      category: "app-testing",
      rating: 4.9,
      icon: Smartphone,
      requirements: ["Android/iOS device", "Written feedback"],
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Customer Survey Participation",
      description: "Complete a 5-minute survey about your shopping habits and product preferences.",
      employer: "MarketRes Ltd.",
      amount: "$1.25",
      timeEstimate: "5 minutes",
      slotsTotal: 200,
      slotsRemaining: 156,
      category: "survey",
      rating: 4.7,
      icon: MessageSquare,
      requirements: ["Age 18+", "Honest responses"],
      difficulty: "Easy"
    },
    {
      id: 4,
      title: "Website User Testing",
      description: "Visit our website, complete a purchase flow, and report any issues or improvements.",
      employer: "EcomPlus Solutions",
      amount: "$5.00",
      timeEstimate: "15 minutes",
      slotsTotal: 25,
      slotsRemaining: 8,
      category: "website-testing",
      rating: 4.6,
      icon: Search,
      requirements: ["Computer/laptop", "Screen recording"],
      difficulty: "Hard"
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "social-media", label: "Social Media" },
    { value: "app-testing", label: "App Testing" },
    { value: "survey", label: "Surveys" },
    { value: "website-testing", label: "Website Testing" }
  ];

  const filteredJobs = availableJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success";
      case "Medium": return "bg-warning/10 text-warning";
      case "Hard": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Available Tasks</h1>
            <p className="text-muted-foreground">Find tasks that match your skills and interests</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/worker">← Back to Dashboard</Link>
          </Button>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search tasks..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredJobs.length} of {availableJobs.length} tasks
          </p>
        </div>

        {/* Jobs Grid */}
        <div className="grid gap-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Job Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <job.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          <p className="text-muted-foreground">{job.employer}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(job.difficulty)}>
                            {job.difficulty}
                          </Badge>
                          <div className="flex items-center text-sm">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{job.rating}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">{job.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map((req, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {req}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 text-success mr-1" />
                          <span className="font-semibold text-success">{job.amount}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{job.timeEstimate}</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{job.slotsRemaining} slots left</span>
                        </div>
                        <div className="flex justify-end">
                          <Button asChild className="bg-gradient-primary">
                            <Link to={`/worker/task/${job.id}`}>
                              Start Task
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new tasks.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkerJobs;