import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import FeaturePlaceholder from "./components/common/FeaturePlaceholder";
import OpportunityTracking from "./pages/OpportunityTracking";
import OpportunityPipeline from "./pages/OpportunityPipeline";
import ProposalManagement from "./pages/ProposalManagement";

// Fundraising module pages - Only these are fully implemented
import FundraisingDashboard from "./modules/fundraising/pages/Dashboard";
import DonorManagement from "./modules/fundraising/pages/DonorManagement";
import FundraisingAnalytics from "./pages/FundraisingAnalytics";

// Other module dashboards
import ProgramDashboard from "./modules/program-management/pages/Dashboard";
import ProcurementDashboard from "./modules/procurement/pages/Dashboard";
import InventoryDashboard from "./modules/inventory/pages/Dashboard";
import FinanceDashboard from "./modules/finance/pages/Dashboard";
import LearningDashboard from "./modules/learning/pages/Dashboard";
import DocumentDashboard from "./modules/document/pages/Dashboard";
import HRDashboard from "./modules/hr/pages/Dashboard";

// User Management module pages
import UserManagementDashboard from "./modules/user-management/pages/Dashboard";

// Grants Management module pages
import GrantsManagementDashboard from "./modules/grants-management/pages/Dashboard";

// Force component remount when navigating to Login
const LoginWithReset: React.FC = () => {
  const location = useLocation();
  return <Login key={location.key} />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/modules/*" element={<MainLayout />} />
        </Routes>
</BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
