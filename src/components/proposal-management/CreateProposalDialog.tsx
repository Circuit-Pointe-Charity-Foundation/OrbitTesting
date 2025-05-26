
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileText, FilePlus } from "lucide-react";
import { mockOpportunities } from "@/types/opportunity";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateProposalDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [opportunityId, setOpportunityId] = useState<string>("");
  const [isTemplate, setIsTemplate] = useState(false);

  // Get sorted opportunity options for select
  const opportunityOptions = mockOpportunities
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!w-[85vw] max-w-[85vw] animate-slide-in-right data-[state=closed]:animate-slide-out-right"
      >
        <SheetHeader>
          <SheetTitle>Create a New Proposal</SheetTitle>
        </SheetHeader>

        <form
          className="mt-8 flex flex-col gap-6 max-w-2xl mx-auto"
          onSubmit={e => {
            e.preventDefault();
            // No submit logic yet
          }}
        >
          {/* Proposal Title */}
          <div>
            <Label htmlFor="proposal-title" className="mb-1 block">
              Proposal Title
            </Label>
            <Input
              id="proposal-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              required
              className="mt-1"
            />
          </div>

          {/* Opportunity Select */}
          <div>
            <Label htmlFor="opportunity-select" className="mb-1 block">
              Select Opportunity
            </Label>
            <Select
              value={opportunityId}
              onValueChange={setOpportunityId}
            >
              <SelectTrigger id="opportunity-select" className="mt-1 bg-[#f6f6fa]">
                <SelectValue placeholder="Choose opportunity" />
              </SelectTrigger>
              <SelectContent>
                {opportunityOptions.map((op) => (
                  <SelectItem key={op.id} value={op.id}>
                    {op.title} {op.donorName ? `- ${op.donorName}` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Make Available as Template */}
          <div className="flex items-center gap-3">
            <Checkbox
              id="template-checkbox"
              checked={isTemplate}
              onCheckedChange={checked => setIsTemplate(!!checked)}
            />
            <Label htmlFor="template-checkbox">
              Make available as template
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-3">
            <button
              type="button"
              className="flex-1 flex items-center gap-2 bg-violet-100 text-violet-700 hover:bg-violet-200 px-6 py-3 rounded font-medium transition"
              // onClick={...} // Hook up to upload logic
            >
              <Upload className="w-5 h-5" />
              Upload Donor Template
            </button>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 bg-violet-50 text-violet-600 hover:bg-violet-100 px-6 py-3 rounded font-medium transition"
              // onClick={...} // Hook up to reuse logic
            >
              <FileText className="w-5 h-5" />
              Reuse Proposal from Library
            </button>
            <button
              type="button"
              className="flex-1 flex items-center gap-2 bg-white border border-violet-200 text-violet-700 hover:bg-violet-50 px-6 py-3 rounded font-medium transition"
              // onClick={...} // Hook up to create manually logic
            >
              <FilePlus className="w-5 h-5" />
              Create Manually
            </button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProposalDialog;
