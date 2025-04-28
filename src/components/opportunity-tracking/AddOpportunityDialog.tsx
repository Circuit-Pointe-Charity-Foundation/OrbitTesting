
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { Opportunity, OpportunityType } from "@/types/opportunity";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface AddOpportunityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOpportunity: (opportunity: Opportunity) => void;
  donors: { id: string; name: string }[];
}

const formSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  donorId: z.string().min(1, { message: "Please select a donor" }),
  amount: z.string().optional(),
  deadline: z.date({ required_error: "Please select a deadline" }),
  type: z.enum(["RFP", "LOI", "CFP"], { required_error: "Please select a type" }),
  assignedTo: z.string().min(1, { message: "Please enter an assignee" }),
  notes: z.string().optional(),
  sector: z.string().optional()
});

const AddOpportunityDialog: React.FC<AddOpportunityDialogProps> = ({
  isOpen,
  onClose,
  onAddOpportunity,
  donors,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      donorId: "",
      amount: "",
      assignedTo: "",
      notes: "",
      sector: ""
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const selectedDonor = donors.find(donor => donor.id === data.donorId);
    
    const newOpportunity: Opportunity = {
      id: uuidv4(),
      title: data.title,
      donorId: data.donorId,
      donorName: selectedDonor?.name || "",
      amount: data.amount ? parseFloat(data.amount) : undefined,
      deadline: format(data.deadline, "yyyy-MM-dd"),
      type: data.type as OpportunityType,
      status: "To Review",
      assignedTo: data.assignedTo,
      notes: data.notes,
      sector: data.sector,
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    onAddOpportunity(newOpportunity);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Opportunity</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="donorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donor Association</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select donor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {donors.map((donor) => (
                        <SelectItem key={donor.id} value={donor.id}>
                          {donor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funding Amount (optional)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunity Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RFP">RFP</SelectItem>
                      <SelectItem value="LOI">LOI</SelectItem>
                      <SelectItem value="CFP">CFP</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Team Member</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (optional)</FormLabel>
                  <FormControl>
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border-2 border-dashed rounded-md p-6 text-center">
              <p className="text-sm text-gray-500">
                Drag and drop files here or browse
              </p>
              <Button variant="outline" className="mt-2" type="button">
                Browse
              </Button>
              <input type="file" hidden />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Opportunity</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOpportunityDialog;
