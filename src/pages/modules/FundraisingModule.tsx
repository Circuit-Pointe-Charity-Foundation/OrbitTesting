
import React from "react";
import { Link } from "react-router-dom";

const FundraisingModule: React.FC = () => {
  const features = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Donor Management", path: "/donor-management" },
    { name: "Opportunity Tracking", path: "/opportunity-tracking" },
    { name: "Proposal Development", path: "/proposal-development" },
    { name: "Proposal Library", path: "/proposal-library" },
    { name: "AI Proposal Wizard", path: "/ai-proposal-wizard" },
    { name: "Internal Workflow & Review", path: "/internal-workflow" },
    { name: "Calendar & Reminders", path: "/calendar" },
    { name: "Fundraising Analytics", path: "/fundraising-analytics" }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Fundraising Module</h1>
      <p className="text-gray-600 mb-8">
        Access all fundraising and donor management features to optimize your organization's fundraising efforts.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Link 
            key={feature.path} 
            to={feature.path}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <h3 className="text-lg font-semibold text-violet-800">{feature.name}</h3>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Access {feature.name.toLowerCase()} features
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FundraisingModule;
