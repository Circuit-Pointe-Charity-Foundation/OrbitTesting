
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EditProposalDialog({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="max-w-[90vw] w-[90vw] animate-slide-in-right data-[state=closed]:animate-slide-out-right"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl">Edit Proposal</SheetTitle>
          <SheetDescription>
            {/* Placeholder for proposal edit form/wireframe */}
            <div className="mt-12 text-lg text-muted-foreground text-center">
              Proposal editor placeholder.
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
