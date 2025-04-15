
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/donor-management" element={<DonorManagement />} />
            <Route path="/opportunity-tracking" element={<OpportunityTracking />} />
            <Route path="/proposal-development" element={<ProposalDevelopment />} />
            <Route path="/proposal-library" element={<ProposalLibrary />} />
            <Route path="/ai-proposal-wizard" element={<AIProposalWizard />} />
            <Route path="/internal-workflow" element={<InternalWorkflow />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/fundraising-analytics" element={<FundraisingAnalytics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
