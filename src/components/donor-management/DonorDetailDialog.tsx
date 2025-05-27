import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { donorData, engagementHistory, monthlyDonationData } from "@/data/donorData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import EditDonorDialog from "./EditDonorDialog";
import AddEngagementDialog from "./AddEngagementDialog";
import GivingHistoryDialog from "./GivingHistoryDialog";

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
    // Alternate colors for the bars
    const colors = ["#A273F2", "#3AA072", "#000000", "#66AAFF", "#99CCFF", "#33CC99"];
    const colorIndex = index % colors.length;
    
    return {
      ...data,
      color: colors[colorIndex]
    };
  });

  const handleOpenEdit = () => {
    setEditDialogOpen(true);
  };

  const handleOpenAddEngagement = () => {
    setEngagementDialogOpen(true);
  };

  const handleOpenGivingHistory = () => {
    setGivingHistoryOpen(true);
  };

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
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-8 bg-white text-black relative rounded-lg shadow-xl flex flex-col items-center">
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
            {/* Profile Info */}
            <div>
              <h3 className="font-bold mb-4">Profile Info</h3>
              <div className="space-y-3 overflow-x-hidden">
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-500">Email:</p>
                  <p className="overflow-hidden text-ellipsis">{donor.email}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-500">Phone:</p>
                  <p>{donor.phone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-500">Funding Period:</p>
                  <p>{donor.fundingPeriod?.start} - {donor.fundingPeriod?.end}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <p className="text-gray-500">Interest Tags:</p>
                  <div className="flex flex-wrap gap-1">
                    {donor.interestTags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 text-xs rounded-md bg-gray-100"
                        style={{ 
                          backgroundColor: 
                            tag === "Health" ? "#F9D2D2" : 
                            tag === "Education" ? "#D2E4F9" : 
                            tag === "Environment" ? "#D2F9E4" : 
                            tag === "Gender" ? "#F9D2E4" : "#E4D2F9" 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement History */}
            <div>
              <h3 className="font-bold mb-4">Engagement History</h3>
              <div className="space-y-4">
                {engagementHistory.map((entry, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="min-w-[1px] bg-[#A273F2] mr-2"></div>
                    <div>
                      <p className="text-sm font-medium">{entry.date}</p>
                      <p className="text-sm text-gray-600">{entry.message}</p>
                    </div>
                  </div>
                ))}
                <Button 
                  onClick={handleOpenAddEngagement}
                  className="bg-[#A273F2] hover:bg-[#8b5cf6] mt-2"
                >
                  Add Engagement Entry
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Giving History */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Giving History</h3>
              <Button 
                variant="outline" 
                className="border-[#A273F2] text-[#A273F2]"
                onClick={handleOpenGivingHistory}
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
              onClick={handleOpenGivingHistory}
              className="mt-4 bg-[#A273F2] hover:bg-[#8b5cf6]"
            >
              Manage Giving Records
            </Button>
          </div>

          {/* Communications & Notes */}
          <div className="p-6 grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">Communications & Notes</h3>
              <div className="space-y-4">
                {showAddNote && (
                  <form onSubmit={handleAddNote} className="mb-4 space-y-3">
                    <Textarea 
                      id="noteContent"
                      placeholder="Enter your note here..."
                      className="min-h-[100px]"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddNote(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="bg-[#A273F2] hover:bg-[#8b5cf6]">
                        Save Note
                      </Button>
                    </div>
                  </form>
                )}
                
                {notes.map((note, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                      <img src="https://i.pravatar.cc/40" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{note.user} • {note.date}</p>
                      <p className="text-sm text-gray-600">{note.content}</p>
                    </div>
                  </div>
                ))}
                
                {!showAddNote && (
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setShowAddNote(true)}
                  >
                    Add Note
                  </Button>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Files</h3>
              <div className="border-2 border-dashed border-gray-300 p-8 rounded-md text-center">
                <p className="text-sm text-gray-500">Drag and drop files here or</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => document.getElementById('donorFileUpload')?.click()}
                >
                  Browse
                </Button>
                <input 
                  id="donorFileUpload" 
                  type="file" 
                  className="hidden" 
                  multiple 
                />
              </div>
            </div>
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
