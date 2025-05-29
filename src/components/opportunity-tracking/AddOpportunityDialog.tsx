
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Opportunity } from "@/types/opportunity";
import { useToast } from "@/components/ui/use-toast";
import { staffData } from "./staffData";
import StaffSelect from "./StaffSelect";

interface AddOpportunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (opportunity: Opportunity) => void;
  donors: Array<{ id: string; name: string }>;
}

const TYPE_OPTIONS = [
  { value: "RFP", label: "RFP - Request for Proposal" },
  { value: "LOI", label: "LOI - Letter of Interest" },
  { value: "CFP", label: "CFP - Call for Proposal" },
];

const CURRENCY_OPTIONS = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "GBP", label: "GBP" },
  { value: "NGN", label: "NGN" },
  { value: "CAD", label: "CAD" },
  { value: "AUD", label: "AUD" },
  { value: "JPY", label: "JPY" },
  { value: "CHF", label: "CHF" },
];

const AddOpportunityDialog: React.FC<AddOpportunityDialogProps> = ({
  isOpen,
  onClose,
  onAddOpportunity,
  donors,
}) => {
  const [title, setTitle] = useState("");
  const [donorId, setDonorId] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [type, setType] = useState<"RFP" | "LOI" | "CFP">("RFP");
  const [deadline, setDeadline] = useState<Date>();
  const [assignedTo, setAssignedTo] = useState("");
  const [sector, setSector] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!title || !donorId || !type || !deadline) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newOpportunity: Opportunity = {
      id: `opp-${Date.now()}`,
      title,
      donorId,
      donorName: donors.find((d) => d.id === donorId)?.name || "",
      amount: parseFloat(amount) || 0,
      type,
      deadline: deadline.toISOString(),
      status: "To Review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo,
      sector,
    };

    onAddOpportunity(newOpportunity);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDonorId("");
    setAmount("");
    setCurrency("USD");
    setType("RFP");
    setDeadline(undefined);
    setAssignedTo("");
    setSector("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-4 text-black px-6 pt-4">
            Add New Opportunity
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 px-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donor">Donor *</Label>
              <Select value={donorId} onValueChange={setDonorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select donor" />
                </SelectTrigger>
                <SelectContent>
                  {donors.map((donor) => (
                    <SelectItem key={donor.id} value={donor.id}>
                      {donor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={type}
                onValueChange={(value: string) => setType(value as "RFP" | "LOI" | "CFP")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 col-span-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Deadline *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assign To</Label>
              <StaffSelect
                value={assignedTo}
                onChange={setAssignedTo}
                id="assignedTo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sector">Sector</Label>
              <Input
                id="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-6 pt-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-black text-white hover:bg-gray-900"
            type="button"
          >
            Add Opportunity
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOpportunityDialog;
