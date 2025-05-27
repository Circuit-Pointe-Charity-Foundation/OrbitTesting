import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { X } from "lucide-react"; // <-- Added import

interface AddEngagementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
}

const AddEngagementDialog: React.FC<AddEngagementDialogProps> = ({ open, onOpenChange, donorId }) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Engagement entry added",
      description: "The new engagement entry has been recorded.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white text-black relative p-8 rounded-lg shadow-xl flex flex-col items-center">
        <DialogHeader>
          <DialogTitle className="text-center text-lg">Add Engagement Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 w-full mt-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input 
              id="date" 
              type="date" 
              defaultValue={new Date().toISOString().split('T')[0]} 
            />
            <p className="text-xs text-gray-500">Optional. Current date will be used if not specified.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Engagement Details</Label>
            <Textarea 
              id="message" 
              placeholder="Enter details about this engagement"
              rows={5}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-900">
              Save Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEngagementDialog;
