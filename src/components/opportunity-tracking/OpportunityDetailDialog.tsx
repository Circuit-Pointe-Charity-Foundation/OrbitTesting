import React, { useState } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  FileText,
  ListTodo,
  Paperclip,
  Check,
  Circle,
  ChevronRight,
  Clock,
  Plus,
  File,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { Opportunity } from "@/types/opportunity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
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

  // Status color mapping matching Kanban headers
  const getStatusColor = (status: string) => {
    const colors = {
      "To Review": { bg: "bg-[#e0d8e6]", text: "text-[#938b97]" }, // Lighter purple-ish
      "In Progress": { bg: "bg-[#f9dfc8]", text: "text-[#e59346]" }, // Lighter orange-ish
      Submitted: { bg: "bg-[#dcd6f7]", text: "text-[#4f46e5]" }, // Lighter blue-ish
      Awarded: { bg: "bg-[#dbfae7]", text: "text-[#09c127]" }, // Light green
      Declined: { bg: "bg-[#fddddd]", text: "text-[#fa2d2d]" }, // Lighter red-ish
    };
    return colors[status] || { bg: "bg-gray-200", text: "text-gray-800" };
  };

  const statusColor = getStatusColor(opportunity.status);
  const deadlineDate = new Date(opportunity.deadline);
  const formattedDeadline = format(deadlineDate, "MMMM dd, yyyy");

  // Status timeline data
  const statusTimeline = [
    {
      status: "Opportunity Identified",
      date: opportunity.createdAt,
      completed: true,
    },
    {
      status: "Proposal Submitted",
      date: opportunity.updatedAt,
      completed:
        opportunity.status === "Submitted" ||
        opportunity.status === "Awarded" ||
        opportunity.status === "Declined",
    },
    {
      status: "Under Review",
      date: "",
      completed:
        opportunity.status === "Awarded" || opportunity.status === "Declined",
    },
    {
      status: opportunity.status === "Awarded" ? "Approved" : "Declined",
      date: "",
      completed:
        opportunity.status === "Awarded" || opportunity.status === "Declined",
    },
  ];

  const handleAddNote = (note: any) => {
    setNotes([...notes, note]);
    toast({
      title: "Note Added",
      description: "Your note has been added successfully.",
    });
  };

  const handleAddFile = (file: any) => {
    setFiles([...files, file]);
    toast({
      title: "File Uploaded",
      description: "Your file has been uploaded successfully.",
    });
  };

  const handleAddTask = (task: any) => {
    setTasks([...tasks, task]);
    toast({
      title: "Task Created",
      description: "New task has been created successfully.",
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className={
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 grid w-full max-w-3xl bg-white rounded-lg shadow-lg border p-6 max-h-[90vh] overflow-y-auto"
          }
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold mb-4 text-black">
              {opportunity.title}
            </DialogTitle>
            <div className="flex items-center gap-3">
              <Badge
                className={`${statusColor.bg} ${statusColor.text} rounded-md flex items-center justify-center p-2 px-5`}
              >
                {opportunity.status}
              </Badge>
            </div>
          </DialogHeader>
          <div className="mt-6">
            <div className="grid grid-cols-4 gap-6">
              {/* Left Column */}
              <div className="col-span-2 space-y-6">
                {/* Donor Profile Section */}
                <h3 className="text-md font-semibold mb-2">Donor Profile</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <h4 className="font-lg">{opportunity.donorName}</h4>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-1" />
                      <span>
                        {opportunity.contactEmail || "No email provided"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-1" />
                      <span>
                        {opportunity.contactPhone || "No phone provided"}
                      </span>
                    </div>
                    <div className="flex flex-row items-center text-sm text-gray-600">
                      <span className="font-medium min-w-[100px]">Funding Areas:</span>
                      <span className="ml-2">
                        {opportunity.sector || "No funding area"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Notes Section */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Description / Notes
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white hover:bg-gray-900"
                        onClick={() => setShowAddNoteDialog(true)}
                      >
                        Add Note
                      </Button>
                    </div>
                    {notes.length > 0 ? (
                      <div className="space-y-3">
                        {notes.map((note) => (
                          <div
                            key={note.id}
                            className="bg-gray-50 p-3 rounded border border-gray-200"
                          >
                            <div className="text-sm">{note.content}</div>
                            <div className="mt-2 text-xs text-gray-500">
                              Added by {note.createdBy} on{" "}
                              {format(
                                new Date(note.createdAt),
                                "MMM dd, yyyy h:mm a"
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-sm text-gray-500">
                        No notes added yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Tasks Section */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <ListTodo className="h-4 w-4" />
                    Tasks
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white hover:bg-gray-900"
                        onClick={() => setShowAddTaskDialog(true)}
                      >
                        Add Task
                      </Button>
                    </div>
                    {tasks.length > 0 ? (
                      <div className="space-y-2">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="bg-gray-50 p-3 rounded border border-gray-200 flex items-start gap-3"
                          >
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4 rounded border-gray-300"
                              checked={task.completed}
                              onChange={() => {}}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {task.title}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Due:{" "}
                                {format(new Date(task.dueDate), "MMM dd, yyyy")} •
                                Assigned to: {task.assignedTo}
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                task.priority === "high"
                                  ? "border-red-200 text-red-800"
                                  : task.priority === "medium"
                                  ? "border-yellow-200 text-yellow-800"
                                  : "border-green-200 text-green-800"
                              }
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-sm text-gray-500">
                        No tasks created yet
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-2 space-y-6">
                {/* Status Timeline */}
                <div className="mt-0">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Status Timeline
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="space-y-3">
                      {statusTimeline.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div
                            className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center 
                            ${item.completed ? "bg-green-500" : "bg-gray-200"}`}
                          >
                            {item.completed ? (
                              <Check className="h-3 w-3 text-white" />
                            ) : (
                              <Circle className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">
                              {item.status}
                            </div>
                            {item.date && (
                              <div className="text-xs text-gray-500">
                                {format(new Date(item.date), "MMM dd, yyyy")}
                              </div>
                            )}
                          </div>
                          {index < statusTimeline.length - 1 && (
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Attachments Section */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2 flex items-center gap-2">
                    <Paperclip className="h-4 w-4" />
                    Attachments
                  </h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-end mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-black text-white hover:bg-gray-900"
                        onClick={() => setShowAddFileDialog(true)}
                      >
                        Add File
                      </Button>
                    </div>
                    {files.length > 0 ? (
                      <div className="space-y-2">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="bg-gray-50 p-3 rounded border border-gray-200 flex items-center"
                          >
                            <Paperclip className="h-4 w-4 mr-2 text-blue-500" />
                            <div className="flex-1">
                              <div className="font-medium text-sm">
                                {file.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {format(
                                  new Date(file.uploadedAt),
                                  "MMM dd, yyyy"
                                )}{" "}
                                • {(file.size / 1024).toFixed(2)} KB
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-sm text-gray-500">
                        No attachments added yet
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-2">Quick Actions</h3>
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Send className="h-4 w-4 mr-2" />
                        Send to Review
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Email Donor
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for adding notes */}
      <AddNoteDialog
        isOpen={showAddNoteDialog}
        onClose={() => setShowAddNoteDialog(false)}
        onAddNote={handleAddNote}
        opportunityId={opportunity.id}
      />

      {/* Dialog for adding files */}
      <AddFileDialog
        isOpen={showAddFileDialog}
        onClose={() => setShowAddFileDialog(false)}
        onAddFile={handleAddFile}
        opportunityId={opportunity.id}
      />

      {/* Dialog for adding tasks */}
      <AddTaskDialog
        isOpen={showAddTaskDialog}
        onClose={() => setShowAddTaskDialog(false)}
        onAddTask={handleAddTask}
        opportunityId={opportunity.id}
      />
    </>
  );
};

export default OpportunityDetailDialog;
