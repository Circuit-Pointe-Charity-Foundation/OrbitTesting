import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

// Fundraising module pages
import Dashboard from "./modules/fundraising/pages/Dashboard";
import DonorManagement from "./modules/fundraising/pages/DonorManagement";

// Import from original pages until we migrate them all
import OpportunityTracking from "./pages/OpportunityTracking";
import ProposalDevelopment from "./pages/ProposalDevelopment";
import ProposalLibrary from "./pages/ProposalLibrary";
import AIProposalWizard from "./pages/AIProposalWizard";
import InternalWorkflow from "./pages/InternalWorkflow";
import CalendarPage from "./pages/CalendarPage";
import FundraisingAnalytics from "./pages/FundraisingAnalytics";
import Settings from "./pages/Settings";

// Other module dashboards
import ProgramDashboard from "./modules/program-management/pages/Dashboard";
import ProcurementDashboard from "./modules/procurement/pages/Dashboard";

// For now, use placeholders for modules without pages
import InventoryManagementModule from "./pages/modules/InventoryManagementModule";
import FinanceControlModule from "./pages/modules/FinanceControlModule";
import LearningManagementModule from "./pages/modules/LearningManagementModule";
import DocumentManagementModule from "./pages/modules/DocumentManagementModule";
import HumanResourceModule from "./pages/modules/HumanResourceModule";

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
          <Route path="/" element={<LoginWithReset />} />
          <Route path="/register" element={<Registration />} />
          
          <Route element={<MainLayout />}>
            {/* Fundraising module routes */}
            <Route path="/modules/fundraising">
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="donor-management" element={<DonorManagement />} />
              <Route path="opportunity-tracking" element={<OpportunityTracking />} />
              <Route path="proposal-development" element={<ProposalDevelopment />} />
              <Route path="proposal-library" element={<ProposalLibrary />} />
              <Route path="ai-proposal-wizard" element={<AIProposalWizard />} />
              <Route path="internal-workflow" element={<InternalWorkflow />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="fundraising-analytics" element={<FundraisingAnalytics />} />
              <Route path="settings" element={<Settings />} />
              <Route index element={<Navigate to="/modules/fundraising/dashboard" replace />} />
            </Route>
            
            {/* Program management module routes */}
            <Route path="/modules/program-management">
              <Route path="dashboard" element={<ProgramDashboard />} />
              <Route index element={<Navigate to="/modules/program-management/dashboard" replace />} />
            </Route>
            
            {/* Procurement module routes */}
            <Route path="/modules/procurement">
              <Route path="dashboard" element={<ProcurementDashboard />} />
              <Route index element={<Navigate to="/modules/procurement/dashboard" replace />} />
            </Route>
            
            {/* Other modules - currently placeholders */}
            <Route path="/modules/inventory" element={<InventoryManagementModule />} />
            <Route path="/modules/finance" element={<FinanceControlModule />} />
            <Route path="/modules/learning" element={<LearningManagementModule />} />
            <Route path="/modules/document" element={<DocumentManagementModule />} />
            <Route path="/modules/hr" element={<HumanResourceModule />} />
            
            {/* Backward compatibility for old routes */}
            <Route path="/dashboard" element={<Navigate to="/modules/fundraising/dashboard" replace />} />
            <Route path="/donor-management" element={<Navigate to="/modules/fundraising/donor-management" replace />} />
            <Route path="/opportunity-tracking" element={<Navigate to="/modules/fundraising/opportunity-tracking" replace />} />
            <Route path="/proposal-development" element={<Navigate to="/modules/fundraising/proposal-development" replace />} />
            <Route path="/proposal-library" element={<Navigate to="/modules/fundraising/proposal-library" replace />} />
            <Route path="/ai-proposal-wizard" element={<Navigate to="/modules/fundraising/ai-proposal-wizard" replace />} />
            <Route path="/internal-workflow" element={<Navigate to="/modules/fundraising/internal-workflow" replace />} />
            <Route path="/calendar" element={<Navigate to="/modules/fundraising/calendar" replace />} />
            <Route path="/fundraising-analytics" element={<Navigate to="/modules/fundraising/fundraising-analytics" replace />} />
            <Route path="/settings" element={<Navigate to="/modules/fundraising/settings" replace />} />
            
            {/* Redirect the empty path to the first module */}
            <Route path="" element={<Navigate to="/modules/fundraising/dashboard" replace />} />
            <Route path="/modules" element={<Navigate to="/modules/fundraising" replace />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
