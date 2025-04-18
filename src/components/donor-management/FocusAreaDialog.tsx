
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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

  const handleSaveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your focus area changes have been saved successfully.",
    });
    onOpenChange(false);
  };

  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Segment saved",
      description: "The new focus area has been created successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-white bg-[#A273F2] -m-6 p-4 flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 text-white" 
              onClick={() => onOpenChange(false)}
            >
              ← Back to Donor Management
            </Button>
            <span className="flex-1">Focus Area</span>
            <div className="flex gap-2">
              <Button className="bg-white text-[#A273F2] hover:bg-gray-100" onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button variant="ghost" className="text-white" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-4">Create New Focus Area</h3>
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

              <div className="flex justify-center gap-2 mt-6">
                <Button type="submit" className="bg-[#A273F2] hover:bg-[#8b5cf6]">
                  Save Segment
                </Button>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                  {focusAreas.map((area) => (
                    <tr key={area.id} className="border-b border-gray-100">
                      <td className="py-3 px-2">{area.id}</td>
                      <td className="py-3 px-2">{area.name}</td>
                      <td className="py-3 px-2">{area.criteriaSummary}</td>
                      <td className="py-3 px-2">{area.donorCount}</td>
                      <td className="py-3 px-2 flex gap-2">
                        <button aria-label="Edit focus area"><EditIcon /></button>
                        <button aria-label="Delete focus area"><DeleteIcon /></button>
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
