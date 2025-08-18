import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Clock,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle,
  Upload,
  Star,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TaskDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [proofText, setProofText] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);

  // Mock task data - in real app this would be fetched based on ID
  const task = {
    id: id || "1",
    title: "Follow Instagram Account & Like Posts",
    description: "Follow @brandaccount on Instagram and like the last 10 posts. This is a simple social media engagement task that helps increase our brand visibility. Make sure to follow the account and engage with the content genuinely.",
    employer: {
      name: "SocialGrow Co.",
      rating: 4.8,
      totalTasks: 156,
      memberSince: "2022"
    },
    amount: "$0.50",
    timeEstimate: "2 minutes",
    difficulty: "Easy",
    category: "Social Media",
    requirements: [
      "Must have an active Instagram account",
      "Account must be at least 30 days old",
      "Follow @brandaccount on Instagram",
      "Like the last 10 posts on their profile",
      "Take screenshot as proof"
    ],
    instructions: [
      "1. Visit @brandaccount on Instagram",
      "2. Click the Follow button",
      "3. Scroll through their recent posts",
      "4. Like the last 10 posts (most recent ones)",
      "5. Take a screenshot showing you followed the account",
      "6. Submit the screenshot as proof"
    ],
    deadline: "24 hours",
    slotsRemaining: 73,
    tags: ["Instagram", "Social Media", "Quick Task", "Beginner Friendly"]
  };

  const handleSubmit = () => {
    if (!proofText.trim() && !proofFile) {
      toast({
        title: "Proof required",
        description: "Please provide either text proof or upload a file.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Task submitted!",
      description: "Your task submission is under review. You'll be notified once approved.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/worker/jobs">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </Button>
          <Badge className="bg-success/10 text-success">
            {task.difficulty}
          </Badge>
          <Badge variant="outline">
            {task.category}
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Task Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{task.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-success" />
                    <span className="font-semibold text-success">{task.amount}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{task.timeEstimate}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span>{task.deadline}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-muted-foreground">{task.description}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Requirements</h4>
                  <ul className="space-y-2">
                    {task.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-3">Step-by-Step Instructions</h4>
                  <ol className="space-y-2">
                    {task.instructions.map((instruction, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Proof Section */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proof-text">Proof of Completion (Optional)</Label>
                  <Textarea
                    id="proof-text"
                    placeholder="Describe how you completed the task..."
                    value={proofText}
                    onChange={(e) => setProofText(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proof-file">Upload Screenshots/Files</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <Input
                      id="proof-file"
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  {proofFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {proofFile.name}
                    </p>
                  )}
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-primary"
                  size="lg"
                >
                  Submit Task for Review
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Employer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Employer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{task.employer.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <span>{task.employer.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tasks</span>
                    <span className="font-medium">{task.employer.totalTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="font-medium">{task.employer.memberSince}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Profile
                </Button>
              </CardContent>
            </Card>

            {/* Task Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Task Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-semibold text-success">{task.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Required</span>
                  <span className="font-medium">{task.timeEstimate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Slots Remaining</span>
                  <span className="font-medium">{task.slotsRemaining}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Deadline</span>
                  <span className="font-medium">{task.deadline}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" size="sm" className="w-full">
                  Report Issue
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Employer
                </Button>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/worker/jobs">
                    Find Similar Tasks
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;