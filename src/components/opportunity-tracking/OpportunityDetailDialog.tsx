
import React, { useState } from "react";
import { format } from "date-fns";
import { X, Calendar, FileText, User, Plus, File, ListTodo, Paperclip } from "lucide-react";
import { Opportunity } from "@/types/opportunity";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AddNoteDialog from "./AddNoteDialog";
import AddFileDialog from "./AddFileDialog";
import AddTaskDialog from "./AddTaskDialog";
import { useToast } from "@/components/ui/use-toast";

interface OpportunityDetailDialogProps {
  opportunity: Opportunity | null;
  isOpen: boolean;
  onClose: () => void;
}

// Helper to get status badge color
const getStatusColor = (status: string) => {
  switch (status) {
    case "To Review":
      return "bg-gray-400";
    case "In Progress":
      return "bg-orange-400";
    case "Submitted":
      return "bg-blue-500";
    case "Awarded":
      return "bg-green-500";
    case "Declined":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

const OpportunityDetailDialog: React.FC<OpportunityDetailDialogProps> = ({
  opportunity,
  isOpen,
  onClose,
}) => {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showAddFileDialog, setShowAddFileDialog] = useState(false);
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const { toast } = useToast();
  
  if (!opportunity) return null;

  const deadlineDate = new Date(opportunity.deadline);
  const formattedDeadline = format(deadlineDate, "MMMM dd, yyyy");
  
  const handleAddNote = (note: any) => {
    setNotes([...notes, note]);
    toast({
      title: "Note Added",
      description: "Your note has been added successfully.",
    });
  };
  
  const handleAddFile = (file: any) => {
    setFiles([...files, file]);
  };
  
  const handleAddTask = (task: any) => {
    setTasks([...tasks, task]);
    toast({
      title: "Task Created",
      description: "New task has been created successfully.",
    });
  };

  // Helper to check if a deadline is urgent (within 7 days)
  const isUrgent = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  // Helper to check if a deadline is due soon (within 14 days)
  const isDueSoon = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 14 && diffDays > 7;
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
                <span className="text-sm text-gray-600">{opportunity.donorName}</span>
              </div>
              <Badge className={`${getStatusColor(opportunity.status)} hover:${getStatusColor(opportunity.status)}`}>
                {opportunity.status}
              </Badge>
            </div>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          
          <div className="mt-6 space-y-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Opportunity Details</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm text-gray-500">Amount</div>
                      <div className="font-medium">${opportunity.amount?.toLocaleString() || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Type</div>
                      <div className="font-medium">{opportunity.type}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Deadline</div>
                      <div className="font-medium">{formattedDeadline}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Sector</div>
                      <div className="font-medium">{opportunity.sector || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Assigned To</div>
                      <div className="font-medium">{opportunity.assignedTo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Created</div>
                      <div className="font-medium">{format(new Date(opportunity.createdAt), "MMM dd, yyyy")}</div>
                    </div>
                  </div>
                </div>
                
                {notes.length > 0 && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-3">Notes</h3>
                    <div className="space-y-3">
                      {notes.map((note) => (
                        <div key={note.id} className="bg-white p-3 rounded border border-gray-200">
                          <div className="text-sm">{note.content}</div>
                          <div className="mt-2 text-xs text-gray-500">
                            Added by {note.createdBy} on {format(new Date(note.createdAt), "MMM dd, yyyy h:mm a")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {files.length > 0 && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-3">Files</h3>
                    <div className="space-y-2">
                      {files.map((file) => (
                        <div key={file.id} className="bg-white p-3 rounded flex items-center border border-gray-200">
                          <Paperclip className="h-4 w-4 mr-2 text-blue-500" />
                          <div>
                            <div className="font-medium text-sm">{file.name}</div>
                            <div className="text-xs text-gray-500">
                              {format(new Date(file.uploadedAt), "MMM dd, yyyy")} • {(file.size / 1024).toFixed(2)} KB
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {tasks.length > 0 && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-3">Tasks</h3>
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <div key={task.id} className="bg-white p-3 rounded flex items-center border border-gray-200">
                          <input type="checkbox" className="mr-2 h-4 w-4 rounded border-gray-300" />
                          <div className="flex-1">
                            <div className="font-medium text-sm">{task.title}</div>
                            <div className="text-xs text-gray-500">
                              Due: {format(new Date(task.dueDate), "MMM dd, yyyy")} • Assigned to: {task.assignedTo}
                            </div>
                          </div>
                          <Badge className={task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowAddTaskDialog(true)}
                    >
                      <ListTodo className="mr-2 h-4 w-4" />
                      <span>Add Task</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowAddNoteDialog(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      <span>Add Note</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowAddFileDialog(true)}
                    >
                      <File className="mr-2 h-4 w-4" />
                      <span>Add File</span>
                    </Button>
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#dc2626] inline-block mr-1"></span>
                      <span className="text-xs text-gray-500">Urgent</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#ea580c] inline-block mr-1"></span>
                      <span className="text-xs text-gray-500">Due Soon</span>
                    </div>
                    <div className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-[#16a34a] inline-block mr-1"></span>
                      <span className="text-xs text-gray-500">Complete</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium mb-3">Status Timeline</h3>
                  <div className="relative pl-6 border-l border-gray-200 space-y-4">
                    <div className="relative">
                      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-purple-500"></div>
                      <div className="text-sm">
                        <span className="font-medium">Created</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {format(new Date(opportunity.createdAt), "MMM dd")}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">Opportunity was created</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-blue-400"></div>
                      <div className="text-sm">
                        <span className="font-medium">Status: {opportunity.status}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {format(new Date(opportunity.updatedAt), "MMM dd")}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">Current status</p>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className={`absolute -left-[25px] w-4 h-4 rounded-full ${
                        isUrgent(opportunity.deadline) ? "bg-red-500" : 
                        isDueSoon(opportunity.deadline) ? "bg-orange-400" : "bg-gray-400"
                      }`}></div>
                      <div className="text-sm">
                        <span className="font-medium">Deadline</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {format(deadlineDate, "MMM dd")}
                        </span>
                        <p className="text-xs text-gray-600 mt-1">Submission deadline</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <AddNoteDialog
        isOpen={showAddNoteDialog}
        onClose={() => setShowAddNoteDialog(false)}
        onAddNote={handleAddNote}
        opportunityId={opportunity?.id || ""}
      />
      
      <AddFileDialog
        isOpen={showAddFileDialog}
        onClose={() => setShowAddFileDialog(false)}
        onAddFile={handleAddFile}
        opportunityId={opportunity?.id || ""}
      />
      
      <AddTaskDialog
        isOpen={showAddTaskDialog}
        onClose={() => setShowAddTaskDialog(false)}
        onAddTask={handleAddTask}
        opportunityId={opportunity?.id || ""}
      />
    </>
  );
};

export default OpportunityDetailDialog;
