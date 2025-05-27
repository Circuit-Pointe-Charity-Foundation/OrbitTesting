import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { donorData, engagementHistory, monthlyDonationData } from "@/data/donorData";
import { useToast } from "@/hooks/use-toast";
import EditDonorDialog from "./EditDonorDialog";
import AddEngagementDialog from "./AddEngagementDialog";
import GivingHistoryDialog from "./GivingHistoryDialog";
import { X } from "lucide-react";
import DonorProfileInfo from "./DonorProfileInfo";
import DonorEngagementHistory from "./DonorEngagementHistory";
import DonorGivingHistoryChart from "./DonorGivingHistoryChart";
import DonorNotesSection from "./DonorNotesSection";
import DonorFilesSection from "./DonorFilesSection";

interface DonorDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donorId: string;
}

const DonorDetailDialog: React.FC<DonorDetailDialogProps> = ({ open, onOpenChange, donorId }) => {
  const { toast } = useToast();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [engagementDialogOpen, setEngagementDialogOpen] = useState(false);
  const [givingHistoryOpen, setGivingHistoryOpen] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [notes, setNotes] = useState<{user: string, date: string, content: string}[]>([
    {user: "John Doe", date: new Date().toLocaleDateString(), content: "Initial contact established via email. Donor expressed interest in education projects."},
    {user: "Jane Smith", date: new Date(Date.now() - 86400000).toLocaleDateString(), content: "Follow-up call scheduled for next week to discuss potential funding opportunities."},
    {user: "Alex Johnson", date: new Date(Date.now() - 172800000).toLocaleDateString(), content: "Sent proposal document for review. Awaiting feedback."},
  ]);

  const donor = donorData.find(d => d.id === donorId) || donorData[0];

  const chartData = monthlyDonationData.map((data, index) => {
    const colors = ["#A273F2", "#3AA072", "#000000", "#66AAFF", "#99CCFF", "#33CC99"];
    const colorIndex = index % colors.length;
    return { ...data, color: colors[colorIndex] };
  });

  const handleOpenEdit = () => setEditDialogOpen(true);
  const handleOpenAddEngagement = () => setEngagementDialogOpen(true);
  const handleOpenGivingHistory = () => setGivingHistoryOpen(true);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    const noteContent = (document.getElementById('noteContent') as HTMLTextAreaElement).value;
    if (noteContent.trim()) {
      const newNote = {
        user: "Current User",
        date: new Date().toLocaleDateString(),
        content: noteContent
      };
      setNotes([newNote, ...notes]);
      setShowAddNote(false);
      toast({
        title: "Note added",
        description: "Your note has been added successfully.",
      });
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-8">
          {/* Close button, absolute top-right */}
          <button
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 text-gray-600 hover:text-black bg-white rounded-full p-1 transition-opacity"
            type="button"
          >
            <X className="w-5 h-5" />
          </button>
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <Button 
                variant="ghost" 
                className="text-black hover:bg-gray-100"
                onClick={() => onOpenChange(false)}
              >
                ← Back to Donor Management
              </Button>
              <h2 className="text-xl font-bold">{donor.name}</h2>
              <Button 
                onClick={handleOpenEdit}
                className="bg-white text-black hover:bg-gray-100"
              >
                Edit
              </Button>
            </DialogTitle>
            <DialogClose aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          
          <div className="p-6 grid grid-cols-2 gap-8">
            <DonorProfileInfo donor={donor} />
            <DonorEngagementHistory engagementHistory={engagementHistory} onAddEngagement={handleOpenAddEngagement} />
          </div>

          <Separator />

          <DonorGivingHistoryChart chartData={chartData} onOpenGivingHistory={handleOpenGivingHistory} />

          <div className="p-6 grid grid-cols-2 gap-8">
            <DonorNotesSection 
              notes={notes}
              showAddNote={showAddNote}
              setShowAddNote={setShowAddNote}
              handleAddNote={handleAddNote}
            />
            <DonorFilesSection />
          </div>
        </DialogContent>
      </Dialog>

      <EditDonorDialog 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
        donorId={donorId} 
      />
      
      <AddEngagementDialog 
        open={engagementDialogOpen} 
        onOpenChange={setEngagementDialogOpen} 
        donorId={donorId}
      />
      
      <GivingHistoryDialog 
        open={givingHistoryOpen} 
        onOpenChange={setGivingHistoryOpen} 
        donorId={donorId}
      />
    </>
  );
};

export default DonorDetailDialog;
