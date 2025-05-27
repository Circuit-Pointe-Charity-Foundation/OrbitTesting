
import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface DonorGivingHistoryChartProps {
  chartData: any[];
  onOpenGivingHistory: () => void;
}

const DonorGivingHistoryChart: React.FC<DonorGivingHistoryChartProps> = ({
  chartData,
  onOpenGivingHistory,
}) => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-bold">Giving History</h3>
      <Button
        variant="outline"
        className="border-[#A273F2] text-[#A273F2]"
        onClick={onOpenGivingHistory}
      >
        2024 ↓
      </Button>
    </div>
    <div className="bg-white rounded-lg p-2 h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `${value}k`} />
          <Bar
            dataKey="amount"
            fill="#A273F2"
            radius={[4, 4, 0, 0]}
            isAnimationActive={true}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <Button
      onClick={onOpenGivingHistory}
      className="mt-4 bg-[#A273F2] hover:bg-[#8b5cf6]"
    >
      Manage Giving Records
    </Button>
  </div>
);

export default DonorGivingHistoryChart;
