
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Note {
  user: string;
  date: string;
  content: string;
}
interface DonorNotesSectionProps {
  notes: Note[];
  showAddNote: boolean;
  setShowAddNote: (val: boolean) => void;
  handleAddNote: (e: React.FormEvent) => void;
}

const DonorNotesSection: React.FC<DonorNotesSectionProps> = ({
  notes,
  showAddNote,
  setShowAddNote,
  handleAddNote,
}) => (
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
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium">
              {note.user} • {note.date}
            </p>
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
);

export default DonorNotesSection;
