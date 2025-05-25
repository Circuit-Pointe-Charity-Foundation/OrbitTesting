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

export default function ProposalDialog({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="!max-w-[70vw] !w-[70vw] animate-slide-in-right data-[state=closed]:animate-slide-out-right"
      >
        {/* Use proper semantic elements - avoid div inside p */}
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Proposal</SheetTitle>
          {/* SheetDescription renders as <p> by default */}
          <SheetDescription asChild>
            <div className="mt-12 text-lg text-muted-foreground text-center">
              {" "}
              {/* Use asChild to customize the underlying element */}
              Create Proposal dialog placeholder.
            </div>
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">{/* Form fields here */}</div>
      </SheetContent>
    </Sheet>
  );
}
