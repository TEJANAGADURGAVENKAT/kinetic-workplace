import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, AlertTriangle, DollarSign } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link to="/admin/users">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">User Management</h3>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/campaigns">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Campaign Moderation</h3>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/disputes">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Dispute Resolution</h3>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/financials">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold">Financial Logs</h3>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;