import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { donorData, availableInterestTags } from "@/data/donorData";
import { X } from "lucide-react";

interface EditDonorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
}

const EditDonorDialog: React.FC<EditDonorDialogProps> = ({ open, onOpenChange, donorId }) => {
  const { toast } = useToast();
  const donor = donorData.find(d => d.id === donorId) || donorData[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally save the data
    toast({
      title: "Donor updated",
      description: "The donor information has been updated successfully",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-8 relative bg-white rounded-lg shadow-xl flex flex-col items-center">
        {/* Absolute close button, top-right */}
        <button
          aria-label="Close"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 text-gray-600 hover:text-black bg-white rounded-full p-1 transition-opacity"
          type="button"
        >
          <X className="w-5 h-5" />
        </button>
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-bold mb-4 w-full">
            <Button
              variant="ghost"
              className="hover:bg-gray-100 hover:text-black mr-2"
              onClick={() => onOpenChange(false)}
            >
              ← Back to Donor Profile
            </Button>
            <h2>Edit Donor Profile</h2>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium mb-2">Overview</h3>
              
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue={donor.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" defaultValue={donor.contact} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="affiliation">Affiliation</Label>
                <Input id="affiliation" defaultValue={donor.affiliation || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={donor.email || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={donor.phone || ""} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website URL</Label>
                <Input id="website" defaultValue={donor.url || ""} />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium mb-2">Additional Information</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Funding Start Date</Label>
                  <Input id="startDate" defaultValue={donor.fundingPeriod?.start || ""} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Funding End Date</Label>
                  <Input id="endDate" defaultValue={donor.fundingPeriod?.end || ""} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interestTags">Interest Tags</Label>
                <Select defaultValue={donor.interestTags[0]}>
                  <SelectTrigger id="interestTags">
                    <SelectValue placeholder="Select an interest tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableInterestTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-1 mt-2">
                  {donor.interestTags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs rounded-full bg-gray-100 flex items-center gap-1"
                      style={{ 
                        backgroundColor: 
                          tag === "Health" ? "#F9D2D2" : 
                          tag === "Education" ? "#D2E4F9" : 
                          tag === "Environment" ? "#D2F9E4" : 
                          tag === "Gender" ? "#F9D2E4" : "#E4D2F9" 
                      }}
                    >
                      {tag}
                      <button type="button" className="text-gray-500 hover:text-gray-700">×</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" defaultValue={donor.notes || ""} rows={5} />
              </div>
            </div>
          </div>
          
          <DialogFooter className="pt-4 gap-2 sm:gap-0">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-900">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDonorDialog;
