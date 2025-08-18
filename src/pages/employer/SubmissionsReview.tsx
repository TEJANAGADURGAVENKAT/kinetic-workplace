import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Eye } from "lucide-react";

const SubmissionsReview = () => {
  const submissions = [
    { id: 1, task: "Instagram Follow", worker: "Sarah Chen", amount: "$0.50", status: "pending", submittedAt: "2 hours ago" },
    { id: 2, task: "App Testing", worker: "Mike Johnson", amount: "$3.00", status: "pending", submittedAt: "4 hours ago" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Review Submissions</h1>
            <p className="text-muted-foreground">Review and approve worker submissions</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/employer">← Back to Dashboard</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{submission.task}</h3>
                    <p className="text-muted-foreground">by {submission.worker} • {submission.submittedAt}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary">{submission.status}</Badge>
                    <span className="font-semibold">{submission.amount}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline"><Eye className="h-3 w-3" /></Button>
                      <Button size="sm" className="bg-success"><CheckCircle className="h-3 w-3" /></Button>
                      <Button size="sm" variant="destructive"><X className="h-3 w-3" /></Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionsReview;