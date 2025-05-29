
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import { focusAreas, availableInterestTags } from "@/data/donorData";
import { FocusArea } from "@/types/donor";
import { EditIcon } from "../icons/EditIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

interface FocusAreaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FocusAreaDialog: React.FC<FocusAreaDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [focusAreaList, setFocusAreaList] = useState<FocusArea[]>([...focusAreas]);
  const [editingArea, setEditingArea] = useState<FocusArea | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(focusAreaList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = focusAreaList.slice(startIndex, endIndex);

  const handleSaveSegment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const focusAreaName = (document.getElementById('focusAreaName') as HTMLInputElement)?.value || "New Focus Area";
    const donationAmount = (document.getElementById('donationAmount') as HTMLInputElement)?.value || "0";
    const startDate = (document.getElementById('startDate') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0];
    const endDate = (document.getElementById('endDate') as HTMLInputElement)?.value || new Date().toISOString().split('T')[0];
    
    if (editingArea) {
      const updatedArea: FocusArea = {
        ...editingArea,
        name: focusAreaName,
        amount: donationAmount,
        startDate: startDate,
        endDate: endDate,
        interestTags: selectedTags.length ? selectedTags : editingArea.interestTags,
        criteriaSummary: `Donation Amount: ${donationAmount}, Interest: ${selectedTags.length ? selectedTags.join(', ') : editingArea.interestTags.join(', ')}, Date: ${startDate} - ${endDate}.`
      };
      
      setFocusAreaList(prev => 
        prev.map(area => area.id === editingArea.id ? updatedArea : area)
      );
      setEditingArea(null);
      setSelectedTags([]);
      toast({
        title: "Focus area updated",
        description: "The focus area has been updated successfully.",
      });
    } else {
      const newFocusArea: FocusArea = {
        id: (focusAreaList.length + 1).toString(),
        name: focusAreaName,
        amount: donationAmount,
        interestTags: selectedTags.length ? selectedTags : ["General"],
        startDate: startDate,
        endDate: endDate,
        donorCount: 0,
        criteriaSummary: `Donation Amount: ${donationAmount}, Interest: ${selectedTags.length ? selectedTags.join(', ') : "General"}, Date: ${startDate} - ${endDate}.`
      };
      
      setFocusAreaList(prev => [...prev, newFocusArea]);
      setSelectedTags([]);
      
      toast({
        title: "Focus area created",
        description: "The new focus area has been created successfully.",
      });
      
      // Reset form
      (document.getElementById('focusAreaName') as HTMLInputElement).value = '';
      (document.getElementById('donationAmount') as HTMLInputElement).value = '';
      (document.getElementById('startDate') as HTMLInputElement).value = '';
      (document.getElementById('endDate') as HTMLInputElement).value = '';
    }
  };

  const handleEditArea = (area: FocusArea) => {
    setEditingArea(area);
    setSelectedTags(area.interestTags);
    // Populate the form with the area data
    setTimeout(() => {
      (document.getElementById('focusAreaName') as HTMLInputElement).value = area.name;
      (document.getElementById('donationAmount') as HTMLInputElement).value = area.amount;
      (document.getElementById('startDate') as HTMLInputElement).value = area.startDate;
      (document.getElementById('endDate') as HTMLInputElement).value = area.endDate;
    }, 0);
  };

  const handleDeleteArea = (areaId: string) => {
    setFocusAreaList(prev => prev.filter(area => area.id !== areaId));
    toast({
      title: "Focus area deleted",
      description: "The focus area has been removed successfully.",
    });
  };

  const handleTagChange = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto p-8 bg-white rounded-lg shadow-xl text-black">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2 hover:bg-gray-100 hover:text-black" 
              onClick={() => onOpenChange(false)}
            >
              ← Back to Donor Management
            </Button>
            <span className="flex-1">Focus Area</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
            <h3 className="font-medium mb-4">{editingArea ? 'Edit' : 'Create New'} Focus Area</h3>
            <form onSubmit={handleSaveSegment} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="focusAreaName">Name of Focus Area</Label>
                  <Input id="focusAreaName" placeholder="Enter focus area name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donationAmount">Donation Amount</Label>
                  <Input id="donationAmount" placeholder="Enter amount" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interestTags">Interest Tags</Label>
                  <Select onValueChange={handleTagChange}>
                    <SelectTrigger id="interestTags">
                      <SelectValue placeholder="Select tags" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterestTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedTags.map(tag => (
                      <span key={tag} className="bg-violet-100 text-violet-800 px-2 py-1 rounded-md text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <Button type="submit" className="bg-black text-white hover:bg-gray-900">
                  {editingArea ? 'Update' : 'Save'} Focus Area
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-medium mb-4">Focus Areas List</h3>
            <div className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-[#A273F2]">SL No</TableHead>
                    <TableHead className="text-[#A273F2]">Segment Name</TableHead>
                    <TableHead className="text-[#A273F2]">Criteria Summary</TableHead>
                    <TableHead className="text-[#A273F2]">Number of Donors</TableHead>
                    <TableHead className="text-[#A273F2]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentItems.map((area) => (
                    <TableRow key={area.id}>
                      <TableCell>{area.id}</TableCell>
                      <TableCell>{area.name}</TableCell>
                      <TableCell className="max-w-xs">{area.criteriaSummary}</TableCell>
                      <TableCell>{area.donorCount}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <button 
                            aria-label="Edit focus area" 
                            onClick={() => handleEditArea(area)}
                          >
                            <EditIcon />
                          </button>
                          <button 
                            aria-label="Delete focus area" 
                            onClick={() => handleDeleteArea(area.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FocusAreaDialog;
