
export type OpportunityStatus = "To Review" | "In Progress" | "Submitted" | "Awarded" | "Declined";
export type OpportunityType = "RFP" | "LOI" | "CFP";

export interface Opportunity {
  id: string;
  title: string;
  donorId: string;
  donorName: string;
  amount?: number;
  deadline: string;
  type: OpportunityType;
  status: OpportunityStatus;
  assignedTo: string;
  notes?: string;
  sector?: string;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

// Sample data for initial development
export const mockOpportunities: Opportunity[] = [
  {
    id: "op-001",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 50000,
    deadline: "2025-04-15",
    type: "RFP",
    status: "To Review",
    assignedTo: "John Doe",
    notes: "Focus on youth education initiatives in rural areas",
    sector: "Education",
    createdAt: "2025-01-15T10:30:00",
    updatedAt: "2025-01-15T10:30:00"
  },
  {
    id: "op-002",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 75000,
    deadline: "2025-04-20",
    type: "RFP",
    status: "In Progress",
    assignedTo: "John Doe",
    notes: "Targeting technology access for underserved communities",
    sector: "Technology",
    createdAt: "2025-01-10T09:15:00",
    updatedAt: "2025-01-18T14:30:00"
  },
  {
    id: "op-003",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 100000,
    deadline: "2025-04-05",
    type: "LOI",
    status: "Submitted",
    assignedTo: "John Doe",
    notes: "Proposal for healthcare initiatives in urban areas",
    sector: "Healthcare",
    createdAt: "2025-01-05T11:45:00",
    updatedAt: "2025-01-25T16:20:00"
  },
  {
    id: "op-004",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 120000,
    deadline: "2025-04-10",
    type: "CFP",
    status: "Awarded",
    assignedTo: "John Doe",
    notes: "Environmental sustainability program focused on clean water",
    sector: "Environment",
    createdAt: "2025-01-02T08:30:00",
    updatedAt: "2025-03-01T13:15:00"
  },
  {
    id: "op-005",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 80000,
    deadline: "2025-04-18",
    type: "RFP",
    status: "Declined",
    assignedTo: "John Doe",
    notes: "Agricultural development in rural communities",
    sector: "Agriculture",
    createdAt: "2025-01-08T14:20:00",
    updatedAt: "2025-02-28T09:45:00"
  },
  {
    id: "op-006",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 90000,
    deadline: "2025-04-25",
    type: "LOI",
    status: "To Review",
    assignedTo: "John Doe",
    sector: "Education",
    createdAt: "2025-01-20T10:00:00",
    updatedAt: "2025-01-20T10:00:00"
  },
  {
    id: "op-007",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 65000,
    deadline: "2025-04-30",
    type: "CFP",
    status: "In Progress",
    assignedTo: "John Doe",
    sector: "Technology",
    createdAt: "2025-01-22T11:30:00",
    updatedAt: "2025-02-05T14:15:00"
  },
  {
    id: "op-008",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 110000,
    deadline: "2025-04-12",
    type: "RFP",
    status: "Submitted",
    assignedTo: "John Doe",
    sector: "Healthcare",
    createdAt: "2025-01-15T09:45:00",
    updatedAt: "2025-02-10T13:30:00"
  },
  {
    id: "op-009",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 70000,
    deadline: "2025-04-08",
    type: "LOI",
    status: "Awarded",
    assignedTo: "John Doe",
    sector: "Environment",
    createdAt: "2025-01-10T13:20:00",
    updatedAt: "2025-03-05T10:45:00"
  },
  {
    id: "op-010",
    title: "UNICEF Youth Innovation Grant - Q3 2025",
    donorId: "d-001",
    donorName: "UNICEF Nigeria",
    amount: 85000,
    deadline: "2025-04-22",
    type: "CFP",
    status: "Declined",
    assignedTo: "John Doe",
    sector: "Agriculture",
    createdAt: "2025-01-05T15:10:00",
    updatedAt: "2025-02-25T11:30:00"
  }
];
