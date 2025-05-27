
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { availableInterestTags } from "@/data/donorData";

interface AddDonorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddDonorDialog: React.FC<AddDonorDialogProps> = ({ open, onOpenChange, onSuccess }) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally save the data
    toast({
      title: "Donor added successfully",
      description: "The new donor has been added to the system",
    });
    if (onSuccess) onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white text-black rounded-lg p-0 relative">
        <DialogHeader>
          <DialogTitle className="text-xl">Add new donor</DialogTitle>
          <DialogClose aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="orgName">Name of Organization</Label>
            <Input id="orgName" placeholder="Enter organization name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">Name of Contact Person</Label>
            <Input id="contactPerson" placeholder="Enter contact person name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="affiliation">Affiliation</Label>
            <Input id="affiliation" placeholder="Enter affiliation" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgUrl">Organization URL</Label>
            <Input id="orgUrl" placeholder="Enter organization website" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="Enter phone number" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="focusAreas">Focus Area(s)</Label>
            <Select>
              <SelectTrigger id="focusAreas">
                <SelectValue placeholder="Select focus areas" />
              </SelectTrigger>
              <SelectContent>
                {availableInterestTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start of funding timeline</Label>
              <Input id="startDate" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End of funding timeline</Label>
              <Input id="endDate" type="date" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add notes about this donor" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">Upload documents</Label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center">
              <p className="text-sm text-gray-500">Drag and drop files here or</p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Browse
              </Button>
              <input 
                id="fileUpload" 
                type="file" 
                className="hidden" 
                multiple 
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-900">
              Save Donor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDonorDialog;
