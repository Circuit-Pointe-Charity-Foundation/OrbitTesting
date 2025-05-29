
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { availableInterestTags } from "@/data/donorData";
import { cn } from "@/lib/utils";

interface ContactPerson {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface AddDonorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AddDonorDialog: React.FC<AddDonorDialogProps> = ({
  open,
  onOpenChange,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [contacts, setContacts] = useState<ContactPerson[]>([
    { id: '1', fullName: '', email: '', phone: '' }
  ]);

  const addContact = () => {
    const newContact: ContactPerson = {
      id: Date.now().toString(),
      fullName: '',
      email: '',
      phone: ''
    };
    setContacts([...contacts, newContact]);
  };

  const removeContact = (id: string) => {
    if (contacts.length > 1) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };

  const updateContact = (id: string, field: keyof ContactPerson, value: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Donor added successfully",
      description: "The new donor has been added to the system",
    });
    if (onSuccess) onSuccess();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Add New Donor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="p-6 space-y-4 w-full">
          <div className="space-y-2">
            <Label htmlFor="orgName">Name of Organization</Label>
            <Input id="orgName" placeholder="Enter organization name" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="affiliation">Affiliation</Label>
            <Input id="affiliation" placeholder="Enter affiliation" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orgUrl">Organization URL</Label>
            <Input id="orgUrl" placeholder="Enter organization website" />
          </div>

          {/* Contact Persons Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Contact Persons</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addContact}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Contact
              </Button>
            </div>
            
            {contacts.map((contact, index) => (
              <div key={contact.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Contact Person {index + 1}</h4>
                  {contacts.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeContact(contact.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`fullName-${contact.id}`}>Full Name</Label>
                    <Input 
                      id={`fullName-${contact.id}`}
                      placeholder="Enter full name"
                      value={contact.fullName}
                      onChange={(e) => updateContact(contact.id, 'fullName', e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor={`email-${contact.id}`}>Email</Label>
                      <Input 
                        id={`email-${contact.id}`}
                        type="email"
                        placeholder="Enter email"
                        value={contact.email}
                        onChange={(e) => updateContact(contact.id, 'email', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor={`phone-${contact.id}`}>Phone Number</Label>
                      <Input 
                        id={`phone-${contact.id}`}
                        placeholder="Enter phone number"
                        value={contact.phone}
                        onChange={(e) => updateContact(contact.id, 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="focusAreas">Focus Area(s)</Label>
            <Select>
              <SelectTrigger id="focusAreas">
                <SelectValue placeholder="Select focus areas" />
              </SelectTrigger>
              <SelectContent>
                {availableInterestTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start of funding timeline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>End of funding timeline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add notes about this donor" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documents">Upload documents</Label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-md text-center">
              <p className="text-sm text-gray-500">Drag and drop files here or</p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2 bg-black text-white hover:bg-gray-900"
                onClick={() => document.getElementById('fileUpload')?.click()}
              >
                Browse
              </Button>
              <input
                id="fileUpload"
                type="file"
                className="hidden"
                multiple
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 flex justify-end">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-gray-900">
              Save Donor
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDonorDialog;
