
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import StaffSelect from "./StaffSelect";

interface OpportunityFormData {
  title: string;
  donorId: string;
  amount: string;
  currency: string;
  type: "RFP" | "LOI" | "CFP";
  deadline: Date | undefined;
  assignedTo: string;
  sector: string;
}

interface OpportunityFormProps {
  form: UseFormReturn<OpportunityFormData>;
  donors: Array<{ id: string; name: string }>;
  typeOptions: Array<{ value: string; label: string }>;
  currencyOptions: Array<{ value: string; label: string }>;
}

const OpportunityForm: React.FC<OpportunityFormProps> = ({
  form,
  donors,
  typeOptions,
  currencyOptions,
}) => {
  const { watch, setValue } = form;
  const deadline = watch("deadline");
  const donorId = watch("donorId");
  const [donorSelectOpen, setDonorSelectOpen] = useState(false);

  const selectedDonor = donors.find(donor => donor.id === donorId);

  return (
    <div className="grid gap-4 py-4 px-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          {...form.register("title")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="donor">Donor *</Label>
          <Popover open={donorSelectOpen} onOpenChange={setDonorSelectOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={donorSelectOpen}
                className="w-full justify-between"
              >
                {selectedDonor ? selectedDonor.name : "Select donor..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search donors..." />
                <CommandList>
                  <CommandEmpty>No donor found.</CommandEmpty>
                  <CommandGroup>
                    {donors.map((donor) => (
                      <CommandItem
                        key={donor.id}
                        value={donor.name}
                        onSelect={() => {
                          setValue("donorId", donor.id);
                          setDonorSelectOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            donorId === donor.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {donor.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select
            value={watch("type")}
            onValueChange={(value) => setValue("type", value as "RFP" | "LOI" | "CFP")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map(option => (
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
          <Select value={watch("currency")} onValueChange={(value) => setValue("currency", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencyOptions.map(option => (
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
            {...form.register("amount")}
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
              onSelect={(date) => setValue("deadline", date)}
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
            value={watch("assignedTo")}
            onChange={(value) => setValue("assignedTo", value)}
            id="assignedTo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector">Sector</Label>
          <Input
            id="sector"
            {...form.register("sector")}
          />
        </div>
      </div>
    </div>
  );
};

export default OpportunityForm;
