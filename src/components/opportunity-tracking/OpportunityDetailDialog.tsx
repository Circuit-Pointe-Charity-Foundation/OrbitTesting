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
  MoreHorizontal,
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

  // Status timeline data - would normally come from API
  const statusTimeline = [
    { status: "Opportunity Identified", date: "2025-04-11", completed: true },
    { status: "Proposal Submitted", date: "2025-04-15", completed: true },
    { status: "Under Review", date: "2025-04-20", completed: false },
    { status: "Decision Expected", date: "2025-05-01", completed: false },
    {
      status: opportunity.status === "Awarded" ? "Approved" : "Declined",
      date: "",
      completed: false,
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
        <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl">
                  {opportunity.title}
                </DialogTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm font-normal">
                    {opportunity.type}
                  </Badge>
                  <Badge
                    className={`${
                      opportunity.status === "Awarded"
                        ? "bg-green-100 text-green-800"
                        : opportunity.status === "Declined"
                        ? "bg-red-100 text-red-800"
                        : opportunity.status === "Submitted"
                        ? "bg-blue-100 text-blue-800"
                        : opportunity.status === "In Progress"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {opportunity.status}
                  </Badge>
                </div>
              </div>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </DialogHeader>

          <div className="mt-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column (2/3 width) */}
              <div className="col-span-2 space-y-4">
                {/* Donor Profile Section */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Donor Profile</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <h4 className="font-medium">{opportunity.donorName}</h4>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Mail className="h-4 w-4 mr-1" />
                          <span>{opportunity.contactEmail || "No email"}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Phone className="h-4 w-4 mr-1" />
                          <span>{opportunity.contactPhone || "No phone"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Funding Timeline:</span>
                        <span className="ml-2">
                          {opportunity.startDate
                            ? format(
                                new Date(opportunity.startDate),
                                "MMM yyyy"
                              )
                            : "N/A"}{" "}
                          -
                          {opportunity.endDate
                            ? format(new Date(opportunity.endDate), "MMM yyyy")
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description/Notes Section */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Description / Notes</span>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
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
                          className="bg-white p-3 rounded border border-gray-200"
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

                {/* Tasks Section */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <ListTodo className="h-4 w-4" />
                      <span>Assignment Tasks</span>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
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
                          className="bg-white p-3 rounded border border-gray-200 flex items-start gap-3"
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

              {/* Right Column (1/3 width) */}
              <div className="space-y-4">
                {/* Status Timeline */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Status Timeline</span>
                  </h3>
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

                {/* Attachments Section */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Paperclip className="h-4 w-4" />
                      <span>Attachments</span>
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary"
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
                          className="bg-white p-3 rounded border border-gray-200 flex items-center"
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
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-sm text-gray-500">
                      No attachments added yet
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
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
