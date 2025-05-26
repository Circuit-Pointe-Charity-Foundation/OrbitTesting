
import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const conversionData = [
  { stage: "Submitted", count: 100 },
  { stage: "Under Review", count: 65 },
  { stage: "Approved", count: 30 },
];
const PIE_COLORS = ["#2563EB", "#F59E42", "#A78BFA"];
const donorPieData = [
  { name: "Individual", value: 55 },
  { name: "Corporate", value: 30 },
  { name: "NGOs", value: 15 },
];

const fundingTagsBarData = [
  { tag: "Education", value: 350 },
  { tag: "Health", value: 120 },
  { tag: "Gender", value: 160 },
  { tag: "Climate", value: 280 },
  { tag: "Environment", value: 110 },
  { tag: "Agriculture", value: 190 },
  { tag: "Technology", value: 150 },
];

const proposalActivityLineData = [
  { month: "Jan", total: 95, submitted: 60, review: 35, approved: 28 },
  { month: "Feb", total: 84, submitted: 53, review: 40, approved: 20 },
  { month: "Mar", total: 90, submitted: 62, review: 32, approved: 25 },
  { month: "Apr", total: 88, submitted: 50, review: 45, approved: 28 },
  { month: "May", total: 93, submitted: 65, review: 28, approved: 31 },
  { month: "Jun", total: 100, submitted: 70, review: 45, approved: 25 },
  { month: "Jul", total: 86, submitted: 50, review: 36, approved: 35 },
  { month: "Aug", total: 95, submitted: 63, review: 35, approved: 29 },
  { month: "Sep", total: 80, submitted: 49, review: 36, approved: 20 },
  { month: "Oct", total: 97, submitted: 67, review: 23, approved: 26 },
  { month: "Nov", total: 92, submitted: 59, review: 33, approved: 30 },
  { month: "Dec", total: 105, submitted: 76, review: 38, approved: 22 },
];

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold">Proposals Conversion Funnel</CardTitle>
        </CardHeader>
        <CardContent className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={conversionData}
              layout="vertical"
              margin={{ top: 20, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="stage" type="category" />
              <Bar dataKey="count" fill="#2563EB" barSize={24} radius={[6, 6, 6, 6]} />
              <RechartsTooltip />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold">Donor Distribution</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-56">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={donorPieData}
                cx="50%" cy="50%" outerRadius={60}
                dataKey="value"
                label={({ name }) => name}
                stroke="none"
              >
                {donorPieData.map((entry, idx) => (
                  <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex gap-5 mt-2">
            {donorPieData.map((entry, idx) => (
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
        </CardContent>
      </Card>
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold">Funds Raised by Funding Tags</CardTitle>
        </CardHeader>
        <CardContent className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={fundingTagsBarData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="2 2" />
              <XAxis dataKey="tag" />
              <YAxis />
              <Bar dataKey="value" fill="#22C55E" barSize={30} radius={[8, 8, 0, 0]} />
              <RechartsTooltip />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-[16px] font-semibold">Proposal Activity Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={proposalActivityLineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Line type="natural" dataKey="total" name="Total Proposals" stroke="#2563EB" dot={false} />
              <Line type="natural" dataKey="submitted" name="Submitted Proposals" stroke="#818CF8" dot={false} />
              <Line type="natural" dataKey="review" name="Proposals Under Review" stroke="#F59E42" dot={false} />
              <Line type="natural" dataKey="approved" name="Approved Proposals" stroke="#22C55E" dot={false} />
              <Legend />
              <RechartsTooltip />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
