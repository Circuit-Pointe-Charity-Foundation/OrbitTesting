// src/components/analytics/GenerateReport.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

const GenerateReport: React.FC = () => {
  // Metrics selection state
  const [metrics, setMetrics] = useState({
    proposalsSubmitted: false,
    successRate: false,
    totalFundsRaised: false,
    averageGrantSize: false,
    turnaroundTime: false,
    donorSegmentation: false,
  });

  // Filter selection state
  const [filters, setFilters] = useState({
    donor: false,
    team: false,
    sector: false,
    proposalStatus: false,
  });

  // Report format state
  const [reportFormat, setReportFormat] = useState({
    pdf: true,
    csv: false,
  });

  // Date range state
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleGenerate = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Date Range Required",
        description: "Please select both start and end dates",
        variant: "destructive",
      });
      return;
    }

    if (Object.values(metrics).every((val) => !val)) {
      toast({
        title: "Metrics Required",
        description: "Please select at least one metric to include",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Generated",
      description: `Your report for ${format(
        startDate,
        "MMM d, yyyy"
      )} to ${format(endDate, "MMM d, yyyy")} is being prepared`,
    });

    // Here you would implement the actual report generation API call
    console.log("Generating report with:", {
      metrics,
      filters,
      reportFormat,
      dateRange: {
        start: startDate,
        end: endDate,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Left Column - Configuration */}
      <div className="lg:col-span-2 space-y-6">
        {/* Metrics Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "proposalsSubmitted", label: "Proposals Submitted" },
              { id: "successRate", label: "Success Rate (%)" },
              { id: "totalFundsRaised", label: "Total Funds Raised" },
              { id: "averageGrantSize", label: "Average Grant Size" },
              {
                id: "turnaroundTime",
                label: "Average Proposals Turnaround Time",
              },
              { id: "donorSegmentation", label: "Donor Segmentation" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={id}
                  checked={metrics[id as keyof typeof metrics]}
                  onCheckedChange={() =>
                    setMetrics((prev) => ({
                      ...prev,
                      [id]: !prev[id as keyof typeof metrics],
                    }))
                  }
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "donor", label: "Donor" },
              { id: "team", label: "Team" },
              { id: "sector", label: "Sector" },
              { id: "proposalStatus", label: "Proposal status" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={`filter-${id}`}
                  checked={filters[id as keyof typeof filters]}
                  onCheckedChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      [id]: !prev[id as keyof typeof filters],
                    }))
                  }
                />
                <Label htmlFor={`filter-${id}`}>{label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Date Range */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Date Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate
                      ? format(startDate, "dd/MM/yyyy")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "dd/MM/yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Report Format */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Report Format</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pdf"
                checked={reportFormat.pdf}
                onCheckedChange={() =>
                  setReportFormat((prev) => ({
                    ...prev,
                    pdf: !prev.pdf,
                  }))
                }
              />
              <Label htmlFor="pdf">PDF</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="csv"
                checked={reportFormat.csv}
                onCheckedChange={() =>
                  setReportFormat((prev) => ({
                    ...prev,
                    csv: !prev.csv,
                  }))
                }
              />
              <Label htmlFor="csv">CSV</Label>
            </div>
          </CardContent>
        </Card>

        <Button className="w-full" size="lg" onClick={handleGenerate}>
          Generate Report
        </Button>
      </div>

      {/* Right Column - Preview */}
      <div className="lg:col-span-1">
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle className="text-lg">Report Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Selected Metrics</h3>
              <ul className="text-sm text-gray-600 list-disc pl-5">
                {Object.entries(metrics)
                  .filter(([_, selected]) => selected)
                  .map(([key]) => (
                    <li key={key}>
                      {
                        {
                          proposalsSubmitted: "Proposals Submitted",
                          successRate: "Success Rate",
                          totalFundsRaised: "Total Funds Raised",
                          averageGrantSize: "Average Grant Size",
                          turnaroundTime: "Turnaround Time",
                          donorSegmentation: "Donor Segmentation",
                        }[key]
                      }
                    </li>
                  ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Date Range</h3>
              <p className="text-sm text-gray-600">
                {startDate && endDate
                  ? `${format(startDate, "MMM d, yyyy")} - ${format(
                      endDate,
                      "MMM d, yyyy"
                    )}`
                  : "Not selected"}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Output Format</h3>
              <p className="text-sm text-gray-600">
                {reportFormat.pdf && reportFormat.csv
                  ? "PDF & CSV"
                  : reportFormat.pdf
                  ? "PDF"
                  : reportFormat.csv
                  ? "CSV"
                  : "Not selected"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GenerateReport;
