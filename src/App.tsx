import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Auth pages
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Public pages
import Index from "./pages/Index";
import Employers from "./pages/Employers";
import Workers from "./pages/Workers";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

// Worker pages
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerJobs from "./pages/worker/WorkerJobs";
import WorkerTasks from "./pages/worker/WorkerTasks";
import WorkerEarnings from "./pages/worker/WorkerEarnings";
import WorkerProfile from "./pages/worker/WorkerProfile";
import TaskDetail from "./pages/worker/TaskDetail";

// Employer pages
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerCampaigns from "./pages/employer/EmployerCampaigns";
import CreateTask from "./pages/employer/CreateTask";
import SubmissionsReview from "./pages/employer/SubmissionsReview";
import EmployerPayments from "./pages/employer/EmployerPayments";
import EmployerTaskDetail from "./pages/employer/EmployerTaskDetail";

// Blog pages
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";

// Payment pages
import Payments from "./pages/Payments";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminFinancials from "./pages/admin/AdminFinancials";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/employers" element={<Employers />} />
                <Route path="/workers" element={<Workers />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/payments" element={<Payments />} />

                {/* Auth Routes */}
                <Route path="/signin" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Worker Routes */}
                <Route path="/worker" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/worker/jobs" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerJobs />
                  </ProtectedRoute>
                } />
                <Route path="/worker/tasks" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerTasks />
                  </ProtectedRoute>
                } />
                <Route path="/worker/earnings" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerEarnings />
                  </ProtectedRoute>
                } />
                <Route path="/worker/profile" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <WorkerProfile />
                  </ProtectedRoute>
                } />
                <Route path="/worker/task/:id" element={
                  <ProtectedRoute allowedRoles={['worker']}>
                    <TaskDetail />
                  </ProtectedRoute>
                } />

                {/* Employer Routes */}
                <Route path="/employer" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/employer/campaigns" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployerCampaigns />
                  </ProtectedRoute>
                } />
                <Route path="/employer/create-task" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <CreateTask />
                  </ProtectedRoute>
                } />
                <Route path="/employer/submissions" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <SubmissionsReview />
                  </ProtectedRoute>
                } />
                <Route path="/employer/payments" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployerPayments />
                  </ProtectedRoute>
                } />
                <Route path="/employer/task/:id" element={
                  <ProtectedRoute allowedRoles={['employee']}>
                    <EmployerTaskDetail />
                  </ProtectedRoute>
                } />

                {/* Blog Routes */}
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetail />} />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminUsers />
                  </ProtectedRoute>
                } />
                <Route path="/admin/campaigns" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminCampaigns />
                  </ProtectedRoute>
                } />
                <Route path="/admin/disputes" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDisputes />
                  </ProtectedRoute>
                } />
                <Route path="/admin/financials" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminFinancials />
                  </ProtectedRoute>
                } />

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;