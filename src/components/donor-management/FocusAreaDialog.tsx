import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { focusAreas, availableInterestTags } from "@/data/donorData";
import { FocusArea } from "@/types/donor";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";
import { X } from "lucide-react";

interface FocusAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FocusAreaDialog: React.FC<FocusAreaDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [focusAreaList, setFocusAreaList] = useState<FocusArea[]>([...focusAreas]);
  const [editingArea, setEditingArea] = useState<FocusArea | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const focusAreaName = (document.getElementById('focusAreaName') as HTMLInputElement)?.value || "New Focus Area";
    const donationAmount = (document.getElementById('donationAmount') as HTMLInputElement)?.value || "0";
    const startDate = (document.getElementById('startDate') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0];
    const endDate = (document.getElementById('endDate') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0];
    
    if (editingArea) {
      const updatedArea: FocusArea = {
        ...editingArea,
        name: focusAreaName,
        amount: donationAmount,
        startDate: startDate,
        endDate: endDate,
        interestTags: selectedTags.length ? selectedTags : editingArea.interestTags,
        criteriaSummary: `Donation Amount: ${donationAmount}, Interest: ${selectedTags.length ? selectedTags.join(', ') : editingArea.interestTags.join(', ')}, Date: ${startDate} - ${endDate}.`
      };
      
      setFocusAreaList(prev => 
        prev.map(area => area.id === editingArea.id ? updatedArea : area)
      );
      setEditingArea(null);
      setSelectedTags([]);
      toast({
        title: "Focus area updated",
        description: "The focus area has been updated successfully.",
      });
    } else {
      const newFocusArea: FocusArea = {
        id: (focusAreaList.length + 1).toString(),
        name: focusAreaName,
        amount: donationAmount,
        interestTags: selectedTags.length ? selectedTags : ["General"],
        startDate: startDate,
        endDate: endDate,
        donorCount: 0,
        criteriaSummary: `Donation Amount: ${donationAmount}, Interest: ${selectedTags.length ? selectedTags.join(', ') : "General"}, Date: ${startDate} - ${endDate}.`
      };
      
      setFocusAreaList(prev => [...prev, newFocusArea]);
      setSelectedTags([]);
      
      toast({
        title: "Focus area created",
        description: "The new focus area has been created successfully.",
      });
      
      // Reset form
      (document.getElementById('focusAreaName') as HTMLInputElement).value = '';
      (document.getElementById('donationAmount') as HTMLInputElement).value = '';
      (document.getElementById('startDate') as HTMLInputElement).value = '';
      (document.getElementById('endDate') as HTMLInputElement).value = '';
    }
  };

  const handleEditArea = (area: FocusArea) => {
    setEditingArea(area);
    setSelectedTags(area.interestTags);
    // Populate the form with the area data
    setTimeout(() => {
      (document.getElementById('focusAreaName') as HTMLInputElement).value = area.name;
      (document.getElementById('donationAmount') as HTMLInputElement).value = area.amount;
      (document.getElementById('startDate') as HTMLInputElement).value = area.startDate;
      (document.getElementById('endDate') as HTMLInputElement).value = area.endDate;
    }, 0);
  };

  const handleDeleteArea = (areaId: string) => {
    setFocusAreaList(prev => prev.filter(area => area.id !== areaId));
    toast({
      title: "Focus area deleted",
      description: "The focus area has been removed successfully.",
    });
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto p-8 bg-white rounded-lg shadow-xl text-black relative flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 hover:bg-gray-100 hover:text-black" 
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
                  <Select onValueChange={handleTagChange}>
                    <SelectTrigger id="interestTags">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterestTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTags.map(tag => (
                      <span key={tag} className="bg-violet-100 text-violet-800 px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
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
                <Button type="submit" className="bg-black text-white hover:bg-gray-900">
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
