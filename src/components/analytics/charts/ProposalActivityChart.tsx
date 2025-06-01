
import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { proposalActivityData, availableYears } from "../data/analyticsData";
import { CustomLegend } from "./CustomLegend";

export function ProposalActivityChart() {
  const [proposalActivityFilter, setProposalActivityFilter] = useState("Donor");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [visibleLines, setVisibleLines] = useState({
    total: true,
    submitted: true,
    drafted: true,
    approved: true,
  });

  // Get proposal activity data based on selected year and filter
  const getProposalActivityData = () => {
    const yearData = proposalActivityData[selectedYear];
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

  return (
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
            <Legend content={<CustomLegend visibleLines={visibleLines} toggleLine={toggleLine} />} />
            <RechartsTooltip />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
