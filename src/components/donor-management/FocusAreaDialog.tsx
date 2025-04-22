
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { focusAreas, availableInterestTags } from "@/data/donorData";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

interface FocusAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FocusAreaDialog: React.FC<FocusAreaDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [focusAreaList, setFocusAreaList] = useState([...focusAreas]);
  const [editingArea, setEditingArea] = useState<typeof focusAreas[0] | null>(null);

  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingArea) {
      setFocusAreaList(prev => 
        prev.map(area => area.id === editingArea.id ? editingArea : area)
      );
      setEditingArea(null);
      toast({
        title: "Focus area updated",
        description: "The focus area has been updated successfully.",
      });
    } else {
      const newFocusArea = {
        id: (focusAreaList.length + 1).toString(),
        name: (document.getElementById('focusAreaName') as HTMLInputElement)?.value || "New Focus Area",
        criteriaSummary: `${(document.getElementById('donationAmount') as HTMLInputElement)?.value || "0"} donation, created on ${new Date().toLocaleDateString()}`,
        donorCount: "0",
      };
      
      setFocusAreaList(prev => [...prev, newFocusArea]);
      
      toast({
        title: "Focus area created",
        description: "The new focus area has been created successfully.",
      });
      
      // Reset form
      (document.getElementById('focusAreaName') as HTMLInputElement).value = '';
      (document.getElementById('donationAmount') as HTMLInputElement).value = '';
    }
  };

  const handleEditArea = (area: typeof focusAreas[0]) => {
    setEditingArea(area);
    // Populate the form with the area data
    setTimeout(() => {
      (document.getElementById('focusAreaName') as HTMLInputElement).value = area.name;
      (document.getElementById('donationAmount') as HTMLInputElement).value = area.criteriaSummary.split(',')[0];
    }, 0);
  };

  const handleDeleteArea = (areaId: string) => {
    setFocusAreaList(prev => prev.filter(area => area.id !== areaId));
    toast({
      title: "Focus area deleted",
      description: "The focus area has been removed successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto p-0">
        <DialogHeader className="bg-[#A273F2] p-4 text-white">
          <DialogTitle className="text-xl flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 text-white hover:bg-[#9265E6] hover:text-white" 
              onClick={() => onOpenChange(false)}
            >
              ← Back to Donor Management
            </Button>
            <span className="flex-1">Focus Area</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h3 className="font-medium mb-4">{editingArea ? 'Edit' : 'Create New'} Focus Area</h3>
            <form onSubmit={handleSaveSegment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="focusAreaName">Name of Focus Area</Label>
                  <Input id="focusAreaName" placeholder="Enter focus area name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donationAmount">Donation Amount</Label>
                  <Input id="donationAmount" placeholder="Enter amount" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interestTags">Interest Tags</Label>
                  <Select>
                    <SelectTrigger id="interestTags">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterestTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button type="submit" className="bg-[#A273F2] hover:bg-[#8b5cf6]">
                  {editingArea ? 'Update' : 'Save'} Focus Area
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Focus Areas List</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[#A273F2]">
                    <th className="py-3 px-2">SL No</th>
                    <th className="py-3 px-2">Segment Name</th>
                    <th className="py-3 px-2">Criteria Summary</th>
                    <th className="py-3 px-2">Number of Donors</th>
                    <th className="py-3 px-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {focusAreaList.map((area) => (
                    <tr key={area.id} className="border-b border-gray-100">
                      <td className="py-3 px-2">{area.id}</td>
                      <td className="py-3 px-2">{area.name}</td>
                      <td className="py-3 px-2">{area.criteriaSummary}</td>
                      <td className="py-3 px-2">{area.donorCount}</td>
                      <td className="py-3 px-2 flex gap-2">
                        <button 
                          aria-label="Edit focus area" 
                          onClick={() => handleEditArea(area)}
                        >
                          <EditIcon />
                        </button>
                        <button 
                          aria-label="Delete focus area" 
                          onClick={() => handleDeleteArea(area.id)}
                        >
                          <DeleteIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FocusAreaDialog;
