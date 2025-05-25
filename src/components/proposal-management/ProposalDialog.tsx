
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
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Proposal</SheetTitle>
          <SheetDescription>
            <div className="mt-12 text-lg text-muted-foreground text-center">
              Proposal creation form goes here.
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
