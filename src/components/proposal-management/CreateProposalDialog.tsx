
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileText, FilePlus } from "lucide-react";
import { mockOpportunities } from "@/types/opportunity";
import { Button } from "@/components/ui/button";

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[700px] w-full p-8 bg-white text-black relative">
        <DialogHeader>
          <DialogTitle>Create a New Proposal</DialogTitle>
          <DialogClose aria-label="Close" className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        <form
          className="mt-6 flex flex-col gap-8"
          onSubmit={e => {
            e.preventDefault();
            // No submit logic yet
          }}
        >
          {/* Proposal Title */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="proposal-title">
              Proposal Title
            </Label>
            <Input
              id="proposal-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter proposal title"
              required
            />
          </div>

          {/* Opportunity Select */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="opportunity-select">
              Select Opportunity
            </Label>
            <Select
              value={opportunityId}
              onValueChange={setOpportunityId}
            >
              <SelectTrigger id="opportunity-select" className="bg-[#f6f6fa]">
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
          <div className="flex flex-row gap-4 mt-2">
            <Button
              type="button"
              variant="default"
              className="flex-1 flex items-center justify-center"
            >
              <Upload className="mr-2 w-5 h-5" />
              Upload Donor Template
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1 flex items-center justify-center"
            >
              <FileText className="mr-2 w-5 h-5" />
              Reuse Proposal from Library
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 flex items-center justify-center"
            >
              <FilePlus className="mr-2 w-5 h-5" />
              Create Manually
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalDialog;
