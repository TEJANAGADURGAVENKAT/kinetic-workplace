import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import SignIn from "./pages/auth/SignIn";
import Register from "./pages/auth/Register";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerJobs from "./pages/worker/WorkerJobs";
import WorkerTasks from "./pages/worker/WorkerTasks";
import WorkerEarnings from "./pages/worker/WorkerEarnings";
import WorkerProfile from "./pages/worker/WorkerProfile";
import TaskDetail from "./pages/worker/TaskDetail";
import EmployerDashboard from "./pages/employer/EmployerDashboard";
import EmployerCampaigns from "./pages/employer/EmployerCampaigns";
import CreateTask from "./pages/employer/CreateTask";
import SubmissionsReview from "./pages/employer/SubmissionsReview";
import EmployerPayments from "./pages/employer/EmployerPayments";
import EmployerTaskDetail from "./pages/employer/EmployerTaskDetail";
import BlogList from "./pages/blog/BlogList";
import BlogDetail from "./pages/blog/BlogDetail";
import Payments from "./pages/Payments";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCampaigns from "./pages/admin/AdminCampaigns";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminFinancials from "./pages/admin/AdminFinancials";
import NotFound from "./pages/NotFound";

// Layout Components
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

const AppRoutes = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Index /></PageTransition>} />
          <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
          <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          
          {/* Worker Routes */}
          <Route path="/worker" element={<PageTransition><WorkerDashboard /></PageTransition>} />
          <Route path="/worker/jobs" element={<PageTransition><WorkerJobs /></PageTransition>} />
          <Route path="/worker/tasks" element={<PageTransition><WorkerTasks /></PageTransition>} />
          <Route path="/worker/earnings" element={<PageTransition><WorkerEarnings /></PageTransition>} />
          <Route path="/worker/profile" element={<PageTransition><WorkerProfile /></PageTransition>} />
          <Route path="/worker/task/:id" element={<PageTransition><TaskDetail /></PageTransition>} />
          
          {/* Employer Routes */}
          <Route path="/employer" element={<PageTransition><EmployerDashboard /></PageTransition>} />
          <Route path="/employer/campaigns" element={<PageTransition><EmployerCampaigns /></PageTransition>} />
          <Route path="/employer/create-task" element={<PageTransition><CreateTask /></PageTransition>} />
          <Route path="/employer/submissions" element={<PageTransition><SubmissionsReview /></PageTransition>} />
          <Route path="/employer/payments" element={<PageTransition><EmployerPayments /></PageTransition>} />
          <Route path="/employer/task/:id" element={<PageTransition><EmployerTaskDetail /></PageTransition>} />
          
          {/* Blog Routes */}
          <Route path="/blogs" element={<PageTransition><BlogList /></PageTransition>} />
          <Route path="/blog/:id" element={<PageTransition><BlogDetail /></PageTransition>} />
          
          {/* Payment Routes */}
          <Route path="/payments" element={<PageTransition><Payments /></PageTransition>} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="/admin/users" element={<PageTransition><AdminUsers /></PageTransition>} />
          <Route path="/admin/campaigns" element={<PageTransition><AdminCampaigns /></PageTransition>} />
          <Route path="/admin/disputes" element={<PageTransition><AdminDisputes /></PageTransition>} />
          <Route path="/admin/financials" element={<PageTransition><AdminFinancials /></PageTransition>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;