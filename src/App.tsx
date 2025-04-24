import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { MainLayout } from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DonorManagement from "./pages/DonorManagement";
import OpportunityTracking from "./pages/OpportunityTracking";
import ProposalDevelopment from "./pages/ProposalDevelopment";
import ProposalLibrary from "./pages/ProposalLibrary";
import AIProposalWizard from "./pages/AIProposalWizard";
import InternalWorkflow from "./pages/InternalWorkflow";
import CalendarPage from "./pages/CalendarPage";
import FundraisingAnalytics from "./pages/FundraisingAnalytics";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Registration from "./pages/Registration";

// Module pages
import FundraisingModule from "./pages/modules/FundraisingModule";
import ProgramManagementModule from "./pages/modules/ProgramManagementModule";
import ProcurementModule from "./pages/modules/ProcurementModule";
import InventoryManagementModule from "./pages/modules/InventoryManagementModule";
import FinanceControlModule from "./pages/modules/FinanceControlModule";
import LearningManagementModule from "./pages/modules/LearningManagementModule";
import DocumentManagementModule from "./pages/modules/DocumentManagementModule";
import HumanResourceModule from "./pages/modules/HumanResourceModule";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login key="login" />} />
          <Route path="/register" element={<Registration />} />
          <Route element={<MainLayout />}>
            {/* Module routes */}
            <Route path="/modules/fundraising" element={<FundraisingModule />} />
            <Route path="/modules/program-management" element={<ProgramManagementModule />} />
            <Route path="/modules/procurement" element={<ProcurementModule />} />
            <Route path="/modules/inventory" element={<InventoryManagementModule />} />
            <Route path="/modules/finance" element={<FinanceControlModule />} />
            <Route path="/modules/learning" element={<LearningManagementModule />} />
            <Route path="/modules/document" element={<DocumentManagementModule />} />
            <Route path="/modules/hr" element={<HumanResourceModule />} />
            
            {/* Fundraising module features */}
            <Route path="/dashboard" element={<Index />} />
            <Route path="/donor-management" element={<DonorManagement />} />
            <Route path="/opportunity-tracking" element={<OpportunityTracking />} />
            <Route path="/proposal-development" element={<ProposalDevelopment />} />
            <Route path="/proposal-library" element={<ProposalLibrary />} />
            <Route path="/ai-proposal-wizard" element={<AIProposalWizard />} />
            <Route path="/internal-workflow" element={<InternalWorkflow />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/fundraising-analytics" element={<FundraisingAnalytics />} />
            <Route path="/settings" element={<Settings />} />
            
            {/* Redirect the main path to fundraising module by default */}
            <Route path="" element={<Navigate to="/modules/fundraising" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
