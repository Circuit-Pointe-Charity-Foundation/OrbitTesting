
import React, { useState } from "react";
import OpportunitySummaryCards from "@/components/opportunity-tracking/pipeline/OpportunitySummaryCards";
import StageDonutChart from "@/components/opportunity-tracking/pipeline/StageDonutChart";
import OpportunityCalendarCard from "@/components/opportunity-tracking/pipeline/OpportunityCalendarCard";
import StaffOverloadCard from "@/components/opportunity-tracking/pipeline/StaffOverloadCard";
import OpportunitiesByStaffCard from "@/components/opportunity-tracking/pipeline/OpportunitiesByStaffCard";
import OpportunitiesByStaffDialog from "@/components/opportunity-tracking/pipeline/OpportunitiesByStaffDialog";
import { mockOpportunities } from "@/types/opportunity";
import { staffData } from "@/components/opportunity-tracking/staffData";

const OpportunityPipeline: React.FC = () => {
  // Month and year filter (default: current month)
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const [showStaffDialog, setShowStaffDialog] = useState(false);

  // Month change logic
  const handleMonthChange = (inc: number) => {
    let month = selectedMonth + inc;
    let year = selectedYear;
    if (month > 11) {
      month = 0;
      year++;
    } else if (month < 0) {
      month = 11;
      year--;
    }
    setSelectedMonth(month);
    setSelectedYear(year);
  };

  // Filtering opportunities for the current month/year
  const filteredOpportunities = mockOpportunities.filter((opp) => {
    const deadline = new Date(opp.deadline);
    return (
      deadline.getFullYear() === selectedYear &&
      deadline.getMonth() === selectedMonth
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-4">Opportunity Pipeline</h1>
      <OpportunitySummaryCards
        opportunities={mockOpportunities}
        month={selectedMonth}
        year={selectedYear}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StageDonutChart opportunities={mockOpportunities} />
        <OpportunityCalendarCard
          month={selectedMonth}
          year={selectedYear}
          setMonth={setSelectedMonth}
          setYear={setSelectedYear}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StaffOverloadCard />
        <OpportunitiesByStaffCard onViewAll={() => setShowStaffDialog(true)} />
      </div>
      <OpportunitiesByStaffDialog
        isOpen={showStaffDialog}
        onClose={() => setShowStaffDialog(false)}
        month={selectedMonth}
        year={selectedYear}
        setMonth={setSelectedMonth}
        setYear={setSelectedYear}
      />
    </div>
  );
};

export default OpportunityPipeline;
