
import React, { useState } from "react";
import { AnalyticsStatCards } from "@/components/analytics/AnalyticsStatCards";
import { AnalyticsCharts } from "@/components/analytics/AnalyticsCharts";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Filter, Export } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const tabDefs = [
  { label: "This Month", value: "this-month" },
  { label: "Generate Report", value: "generate-report" },
];

const FundraisingAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"this-month" | "generate-report">("this-month");
  const [filterOpen, setFilterOpen] = useState(false);

  function handleExport() {
    toast({
      title: "Report Exported",
      description: "Your fundraising analytics report has been generated and downloaded.",
    });
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Top bar with tabs and actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-6">
        {/* Tabs */}
        <div className="flex gap-3">
          {tabDefs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as "this-month" | "generate-report")}
              className={`text-base font-medium px-2 py-1.5 rounded transition ${
                activeTab === tab.value
                  ? "text-violet-700 border-b-2 border-violet-700 bg-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Action buttons */}
        <div className="flex gap-2 ml-auto">
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter size={18} /> Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
              {/* Demo filter content */}
              <div className="font-medium mb-2">Filter analytics</div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Report period</div>
                  <select className="w-full border rounded px-2 py-1 mt-1 bg-background">
                    <option>This Month</option>
                    <option>Last Quarter</option>
                  </select>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Donor type</div>
                  <select className="w-full border rounded px-2 py-1 mt-1 bg-background">
                    <option>Any</option>
                    <option>Individual</option>
                    <option>Corporate</option>
                    <option>NGO</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4 justify-end">
                <Button size="sm" variant="secondary" onClick={() => setFilterOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" variant="default" onClick={() => setFilterOpen(false)}>
                  Apply
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="default" className="gap-2" onClick={handleExport}>
            <Export size={18} /> Export
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <AnalyticsStatCards variant={activeTab} />

      {/* Analytics charts */}
      <div className="mt-4">
        <AnalyticsCharts />
      </div>
    </div>
  );
};

export default FundraisingAnalytics;
