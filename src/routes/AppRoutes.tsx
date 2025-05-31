
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import NotFound from "@/pages/NotFound";
import Login from "@/pages/Login";
import Registration from "@/pages/Registration";
import FeaturePlaceholder from "@/components/common/FeaturePlaceholder";
import OpportunityTracking from "@/pages/OpportunityTracking";
import OpportunityPipeline from "@/pages/OpportunityPipeline";
import ProposalManagement from "@/pages/ProposalManagement";
import AIProposalWizard from "@/pages/AIProposalWizard";
import ManualProposalCreation from "@/pages/ManualProposalCreation";
import FundraisingAnalytics from "@/pages/FundraisingAnalytics";

// Module dashboards
import FundraisingDashboard from "@/modules/fundraising/pages/Dashboard";
import DonorManagement from "@/modules/fundraising/pages/DonorManagement";
import ProgramDashboard from "@/modules/program-management/pages/Dashboard";
import ProcurementDashboard from "@/modules/procurement/pages/Dashboard";
import InventoryDashboard from "@/modules/inventory/pages/Dashboard";
import FinanceDashboard from "@/modules/finance/pages/Dashboard";
import LearningDashboard from "@/modules/learning/pages/Dashboard";
import DocumentDashboard from "@/modules/document/pages/Dashboard";
import HRDashboard from "@/modules/hr/pages/Dashboard";
import UserManagementDashboard from "@/modules/user-management/pages/Dashboard";
import GrantsManagementDashboard from "@/modules/grants-management/pages/Dashboard";

// Login component with reset functionality
const LoginWithReset: React.FC = () => {
  const location = useLocation();
  const loginKey = React.useMemo(
    () => (location.state?.forceUpdate ? Date.now() : location.key),
    [location.key, location.state]
  );
  return <Login key={loginKey} />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginWithReset />} />
      <Route path="/register" element={<Registration />} />

      <Route element={<MainLayout />}>
        {/* Fundraising module routes */}
        <Route path="/modules/fundraising">
          <Route path="dashboard" element={<FundraisingDashboard />} />
          <Route path="donor-management" element={<DonorManagement />} />
          <Route path="opportunity-tracking" element={<OpportunityTracking />} />
          <Route path="opportunity-pipeline" element={<OpportunityPipeline />} />
          <Route path="proposal-management" element={<ProposalManagement />} />
          <Route path="ai-proposal-wizard" element={<AIProposalWizard />} />
          <Route path="manual-proposal-creation" element={<ManualProposalCreation />} />
          <Route path="fundraising-analytics" element={<FundraisingAnalytics />} />
          <Route
            path="settings"
            element={
              <FeaturePlaceholder
                moduleName="Fundraising"
                featureName="Settings"
              />
            }
          />
          <Route index element={<Navigate to="/modules/fundraising/dashboard" replace />} />
        </Route>

        {/* Program management module routes */}
        <Route path="/modules/program-management">
          <Route path="dashboard" element={<ProgramDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Program Management"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Program Management"
                featureName="Feature 2"
              />
            }
          />
          <Route
            path="feature-3"
            element={
              <FeaturePlaceholder
                moduleName="Program Management"
                featureName="Feature 3"
              />
            }
          />
          <Route
            path="feature-4"
            element={
              <FeaturePlaceholder
                moduleName="Program Management"
                featureName="Feature 4"
              />
            }
          />
          <Route
            path="feature-5"
            element={
              <FeaturePlaceholder
                moduleName="Program Management"
                featureName="Feature 5"
              />
            }
          />
          <Route index element={<Navigate to="/modules/program-management/dashboard" replace />} />
        </Route>

        {/* Procurement module routes */}
        <Route path="/modules/procurement">
          <Route path="dashboard" element={<ProcurementDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Procurement"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Procurement"
                featureName="Feature 2"
              />
            }
          />
          <Route
            path="feature-3"
            element={
              <FeaturePlaceholder
                moduleName="Procurement"
                featureName="Feature 3"
              />
            }
          />
          <Route
            path="feature-4"
            element={
              <FeaturePlaceholder
                moduleName="Procurement"
                featureName="Feature 4"
              />
            }
          />
          <Route
            path="feature-5"
            element={
              <FeaturePlaceholder
                moduleName="Procurement"
                featureName="Feature 5"
              />
            }
          />
          <Route index element={<Navigate to="/modules/procurement/dashboard" replace />} />
        </Route>

        {/* Inventory management module routes */}
        <Route path="/modules/inventory">
          <Route path="dashboard" element={<InventoryDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Inventory Management"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Inventory Management"
                featureName="Feature 2"
              />
            }
          />
          <Route index element={<Navigate to="/modules/inventory/dashboard" replace />} />
        </Route>

        {/* Finance module routes */}
        <Route path="/modules/finance">
          <Route path="dashboard" element={<FinanceDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Finance"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Finance"
                featureName="Feature 2"
              />
            }
          />
          <Route index element={<Navigate to="/modules/finance/dashboard" replace />} />
        </Route>

        {/* Learning module routes */}
        <Route path="/modules/learning">
          <Route path="dashboard" element={<LearningDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Learning Management"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Learning Management"
                featureName="Feature 2"
              />
            }
          />
          <Route index element={<Navigate to="/modules/learning/dashboard" replace />} />
        </Route>

        {/* Document module routes */}
        <Route path="/modules/document">
          <Route path="dashboard" element={<DocumentDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="Document Management"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="Document Management"
                featureName="Feature 2"
              />
            }
          />
          <Route index element={<Navigate to="/modules/document/dashboard" replace />} />
        </Route>

        {/* HR module routes */}
        <Route path="/modules/hr">
          <Route path="dashboard" element={<HRDashboard />} />
          <Route
            path="feature-1"
            element={
              <FeaturePlaceholder
                moduleName="HR Management"
                featureName="Feature 1"
              />
            }
          />
          <Route
            path="feature-2"
            element={
              <FeaturePlaceholder
                moduleName="HR Management"
                featureName="Feature 2"
              />
            }
          />
          <Route index element={<Navigate to="/modules/hr/dashboard" replace />} />
        </Route>

        {/* User Management module routes */}
        <Route path="/modules/user-management">
          <Route path="dashboard" element={<UserManagementDashboard />} />
          <Route
            path="roles"
            element={
              <FeaturePlaceholder
                moduleName="User Management"
                featureName="User Roles"
              />
            }
          />
          <Route
            path="permissions"
            element={
              <FeaturePlaceholder
                moduleName="User Management"
                featureName="User Permissions"
              />
            }
          />
          <Route index element={<Navigate to="/modules/user-management/dashboard" replace />} />
        </Route>

        {/* Grants Management module routes */}
        <Route path="/modules/grants-management">
          <Route path="dashboard" element={<GrantsManagementDashboard />} />
          <Route
            path="applications"
            element={
              <FeaturePlaceholder
                moduleName="Grants Management"
                featureName="Grant Applications"
              />
            }
          />
          <Route
            path="funding"
            element={
              <FeaturePlaceholder
                moduleName="Grants Management"
                featureName="Grant Funding"
              />
            }
          />
          <Route index element={<Navigate to="/modules/grants-management/dashboard" replace />} />
        </Route>

        {/* Backward compatibility for old routes */}
        <Route path="/dashboard" element={<Navigate to="/modules/fundraising/dashboard" replace />} />
        <Route path="/donor-management" element={<Navigate to="/modules/fundraising/donor-management" replace />} />
        <Route path="/opportunity-tracking" element={<Navigate to="/modules/fundraising/opportunity-tracking" replace />} />
        <Route path="/proposal-management" element={<Navigate to="/modules/fundraising/proposal-management" replace />} />
        <Route path="/fundraising-analytics" element={<Navigate to="/modules/fundraising/fundraising-analytics" replace />} />
        <Route path="/settings" element={<Navigate to="/modules/fundraising/settings" replace />} />

        {/* Redirect the empty path to the first module */}
        <Route path="" element={<Navigate to="/modules/fundraising/dashboard" replace />} />
        <Route path="/modules" element={<Navigate to="/modules/fundraising" replace />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
