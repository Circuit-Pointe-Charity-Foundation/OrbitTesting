
import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Updated data for Proposals Turnaround Time
const turnaroundData = [
  { stage: "Drafting", days: 12 },
  { stage: "Internal Review", days: 8 },
  { stage: "Donor Response", days: 25 },
];

// Updated colors and data for Donor Segmentation
const PIE_COLORS = ["#22C55E", "#3B82F6", "#F59E42", "#A78BFA"];
const donorSegmentationData = {
  Type: [
    { name: "Individual", value: 45 },
    { name: "Corporate", value: 30 },
    { name: "NGOs", value: 15 },
    { name: "Government", value: 10 },
  ],
  Sector: [
    { name: "Government", value: 40 },
    { name: "Private Foundation", value: 35 },
    { name: "Corporate", value: 25 },
  ],
  Geography: [
    { name: "Africa", value: 50 },
    { name: "Europe", value: 25 },
    { name: "America", value: 15 },
    { name: "Asia", value: 10 },
  ],
  "Interest Tags": [
    { name: "Health", value: 35 },
    { name: "Education", value: 25 },
    { name: "Girls", value: 20 },
    { name: "Environment", value: 20 },
  ],
};

// Updated data for Funding Raised
const fundingRaisedData = {
  Sector: [
    { category: "Health", value: 450000 },
    { category: "Education", value: 320000 },
    { category: "Environment", value: 280000 },
    { category: "Agriculture", value: 190000 },
    { category: "Technology", value: 150000 },
    { category: "Gender", value: 120000 },
  ],
  "Donor Type": [
    { category: "Individual", value: 380000 },
    { category: "Corporate", value: 420000 },
    { category: "NGOs", value: 180000 },
    { category: "Government", value: 520000 },
  ],
  Teams: [
    { category: "Team Alpha", value: 340000 },
    { category: "Team Beta", value: 290000 },
    { category: "Team Gamma", value: 380000 },
    { category: "Team Delta", value: 240000 },
  ],
};

// Updated data for Proposal Activity - full year data
const proposalActivityData = {
  2024: {
    Donor: [
      { month: "Jan", total: 95, submitted: 60, drafted: 45, approved: 28 },
      { month: "Feb", total: 84, submitted: 53, drafted: 38, approved: 20 },
      { month: "Mar", total: 90, submitted: 62, drafted: 42, approved: 25 },
      { month: "Apr", total: 88, submitted: 50, drafted: 35, approved: 28 },
      { month: "May", total: 93, submitted: 65, drafted: 48, approved: 31 },
      { month: "Jun", total: 100, submitted: 70, drafted: 52, approved: 25 },
      { month: "Jul", total: 87, submitted: 55, drafted: 40, approved: 22 },
      { month: "Aug", total: 92, submitted: 58, drafted: 43, approved: 26 },
      { month: "Sep", total: 96, submitted: 63, drafted: 47, approved: 29 },
      { month: "Oct", total: 101, submitted: 72, drafted: 55, approved: 33 },
      { month: "Nov", total: 89, submitted: 56, drafted: 41, approved: 24 },
      { month: "Dec", total: 94, submitted: 61, drafted: 44, approved: 27 },
    ],
    Sector: [
      { month: "Jan", total: 85, submitted: 55, drafted: 40, approved: 25 },
      { month: "Feb", total: 92, submitted: 58, drafted: 43, approved: 22 },
      { month: "Mar", total: 88, submitted: 60, drafted: 38, approved: 28 },
      { month: "Apr", total: 95, submitted: 52, drafted: 40, approved: 30 },
      { month: "May", total: 87, submitted: 62, drafted: 45, approved: 27 },
      { month: "Jun", total: 98, submitted: 68, drafted: 48, approved: 29 },
      { month: "Jul", total: 83, submitted: 51, drafted: 37, approved: 21 },
      { month: "Aug", total: 90, submitted: 57, drafted: 42, approved: 25 },
      { month: "Sep", total: 94, submitted: 64, drafted: 46, approved: 28 },
      { month: "Oct", total: 99, submitted: 70, drafted: 53, approved: 32 },
      { month: "Nov", total: 86, submitted: 54, drafted: 39, approved: 23 },
      { month: "Dec", total: 91, submitted: 59, drafted: 43, approved: 26 },
    ],
  },
  2023: [
    { month: "Jan", total: 105, submitted: 68, drafted: 55, approved: 32 },
    { month: "Feb", total: 89, submitted: 56, drafted: 42, approved: 24 },
    { month: "Mar", total: 96, submitted: 64, drafted: 48, approved: 30 },
    { month: "Apr", total: 82, submitted: 48, drafted: 38, approved: 26 },
    { month: "May", total: 101, submitted: 72, drafted: 58, approved: 35 },
    { month: "Jun", total: 94, submitted: 65, drafted: 50, approved: 28 },
    { month: "Jul", total: 91, submitted: 59, drafted: 45, approved: 25 },
    { month: "Aug", total: 87, submitted: 53, drafted: 41, approved: 23 },
    { month: "Sep", total: 99, submitted: 67, drafted: 52, approved: 31 },
    { month: "Oct", total: 93, submitted: 61, drafted: 47, approved: 27 },
    { month: "Nov", total: 88, submitted: 54, drafted: 42, approved: 24 },
    { month: "Dec", total: 95, submitted: 63, drafted: 49, approved: 29 },
  ],
  2022: [
    { month: "Jan", total: 78, submitted: 48, drafted: 38, approved: 22 },
    { month: "Feb", total: 85, submitted: 52, drafted: 41, approved: 19 },
    { month: "Mar", total: 82, submitted: 55, drafted: 35, approved: 24 },
    { month: "Apr", total: 89, submitted: 47, drafted: 37, approved: 26 },
    { month: "May", total: 76, submitted: 58, drafted: 42, approved: 21 },
    { month: "Jun", total: 91, submitted: 62, drafted: 46, approved: 25 },
    { month: "Jul", total: 84, submitted: 51, drafted: 39, approved: 20 },
    { month: "Aug", total: 88, submitted: 54, drafted: 43, approved: 23 },
    { month: "Sep", total: 93, submitted: 59, drafted: 47, approved: 27 },
    { month: "Oct", total: 86, submitted: 56, drafted: 41, approved: 24 },
    { month: "Nov", total: 81, submitted: 49, drafted: 38, approved: 21 },
    { month: "Dec", total: 87, submitted: 53, drafted: 42, approved: 25 },
  ],
};

// Get available years (current year and previous years)
const currentYear = new Date().getFullYear();
const availableYears = Array.from({ length: 5 }, (_, i) => currentYear - i);

export function AnalyticsCharts({ selectedPeriod }: { selectedPeriod?: string }) {
  const [donorSegmentFilter, setDonorSegmentFilter] = useState("Type");
  const [fundingRaisedFilter, setFundingRaisedFilter] = useState("Sector");
  const [proposalActivityFilter, setProposalActivityFilter] = useState("Donor");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [visibleLines, setVisibleLines] = useState({
    total: true,
    submitted: true,
    drafted: true,
    approved: true,
  });

  const currentDonorData = donorSegmentationData[donorSegmentFilter as keyof typeof donorSegmentationData];
  const currentFundingData = fundingRaisedData[fundingRaisedFilter as keyof typeof fundingRaisedData];
  
  // Get proposal activity data based on selected year and filter
  const getProposalActivityData = () => {
    const yearData = proposalActivityData[selectedYear as keyof typeof proposalActivityData];
    if (selectedYear === "2024" && typeof yearData === "object" && !Array.isArray(yearData)) {
      return yearData[proposalActivityFilter as keyof typeof yearData] || [];
    }
    return Array.isArray(yearData) ? yearData : [];
  };

  const currentActivityData = getProposalActivityData();

  const toggleLine = (lineKey: string) => {
    setVisibleLines(prev => ({
      ...prev,
      [lineKey]: !prev[lineKey as keyof typeof prev],
    }));
  };

  const CustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap gap-6 justify-center mt-4">
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2"
          >
            <Checkbox
              id={entry.dataKey}
              checked={visibleLines[entry.dataKey as keyof typeof visibleLines]}
              onCheckedChange={() => toggleLine(entry.dataKey)}
            />
            <label 
              htmlFor={entry.dataKey}
              className="flex items-center gap-2 cursor-pointer text-sm"
            >
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.value}</span>
            </label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold">Proposals Turnaround Time</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={turnaroundData}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 30]} ticks={[0, 5, 10, 15, 20, 25, 30]} />
              <YAxis dataKey="stage" type="category" />
              <Bar dataKey="days" fill="#2563EB" barSize={24} radius={[6, 6, 6, 6]} />
              <RechartsTooltip formatter={(value) => [`${value} days`, "Days"]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[16px] font-semibold">Donor Segmentation</CardTitle>
            <Select value={donorSegmentFilter} onValueChange={setDonorSegmentFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Type">Type</SelectItem>
                <SelectItem value="Sector">Sector</SelectItem>
                <SelectItem value="Geography">Geography</SelectItem>
                <SelectItem value="Interest Tags">Interest Tags</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-56">
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={200} height={180}>
              <PieChart>
                <Pie
                  data={currentDonorData}
                  cx="50%" cy="50%" 
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {currentDonorData.map((entry, idx) => (
                    <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-3">
              {currentDonorData.map((entry, idx) => (
                <div className="flex items-center gap-2 text-sm" key={entry.name}>
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ background: PIE_COLORS[idx] }}
                  />
                  <span className="text-gray-700">{entry.name}</span>
                  <span className="text-gray-500">({entry.value}%)</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[16px] font-semibold">Funding Raised</CardTitle>
            <Select value={fundingRaisedFilter} onValueChange={setFundingRaisedFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Sector">Sector</SelectItem>
                <SelectItem value="Donor Type">Donor Type</SelectItem>
                <SelectItem value="Teams">Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={currentFundingData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `$${value / 1000}K`} />
              <Bar dataKey="value" fill="#22C55E" barSize={30} radius={[8, 8, 0, 0]} />
              <RechartsTooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-[16px] font-semibold">Proposal Activity</CardTitle>
            <div className="flex gap-2">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={proposalActivityFilter} onValueChange={setProposalActivityFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Donor">Donor</SelectItem>
                  <SelectItem value="Sector">Sector</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentActivityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              {visibleLines.total && (
                <Line type="natural" dataKey="total" name="Total Proposals" stroke="#2563EB" dot={false} />
              )}
              {visibleLines.submitted && (
                <Line type="natural" dataKey="submitted" name="Proposals Submitted" stroke="#818CF8" dot={false} />
              )}
              {visibleLines.drafted && (
                <Line type="natural" dataKey="drafted" name="Proposals Drafted" stroke="#F59E42" dot={false} />
              )}
              {visibleLines.approved && (
                <Line type="natural" dataKey="approved" name="Approved Proposals" stroke="#22C55E" dot={false} />
              )}
              <Legend content={<CustomLegend />} />
              <RechartsTooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
