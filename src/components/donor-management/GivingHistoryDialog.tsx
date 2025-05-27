import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { givingRecords, monthlyDonationData } from "@/data/donorData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { X } from "lucide-react";

interface GivingHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
}

const GivingHistoryDialog: React.FC<GivingHistoryDialogProps> = ({ open, onOpenChange, donorId }) => {
  const { toast } = useToast();
  const [selectedYear, setSelectedYear] = useState("2024");
  
  const chartData = monthlyDonationData.map((data, index) => {
    // Alternate colors for the bars
    const colors = ["#A273F2", "#3AA072", "#000000", "#66AAFF", "#99CCFF", "#33CC99"];
    const colorIndex = index % colors.length;
    
    return {
      ...data,
      color: colors[colorIndex]
    };
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Giving record added",
      description: "The new giving record has been added successfully.",
    });
  };

  const years = ["2024", "2023", "2022", "2021"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-8 bg-white rounded-lg shadow-xl text-black relative flex flex-col items-center">
        {/* Remove custom close, rely on shadcn */}
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span className="text-xl font-bold">Giving History</span>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 bg-white rounded-lg p-4 h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis 
                domain={[0, 40]} 
                ticks={[0, 10, 20, 30, 40]} 
                tickFormatter={(value) => `${value}k`} 
              />
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
        
        <div className="mt-6 grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-4">Existing Giving Records</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#A273F2] border-b border-gray-200">
                    <th className="py-2 px-2">SL. NO</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Amount</th>
                    <th className="py-2 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {givingRecords.map((record) => (
                    <tr key={record.id} className="border-b border-gray-100">
                      <td className="py-2 px-2">{record.id}.</td>
                      <td className="py-2 px-2">{record.date}</td>
                      <td className="py-2 px-2">{record.amount}</td>
                      <td className="py-2 px-2">
                        <div className="flex gap-2">
                          <button aria-label="Edit record"><EditIcon /></button>
                          <button aria-label="Delete record"><DeleteIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Add New Entry</h3>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="month">Month</Label>
                  <Select>
                    <SelectTrigger id="month">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select defaultValue="2024">
                    <SelectTrigger id="year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input id="amount" placeholder="Enter amount" />
              </div>
              
              <div className="flex justify-center">
                <Button type="submit" className="bg-black text-white hover:bg-gray-900">
                  Add New Entry
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GivingHistoryDialog;
