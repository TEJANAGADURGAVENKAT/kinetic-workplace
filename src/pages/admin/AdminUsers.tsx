import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminUsers = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button variant="outline" asChild>
          <Link to="/admin">← Back to Admin</Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management interface would be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsers;