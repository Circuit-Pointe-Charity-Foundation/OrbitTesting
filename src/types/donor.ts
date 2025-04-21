
// Define all donor-related types here

export interface Donor {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  lastDonation?: string;
  interestTags: string[];
  fundingPeriod?: {
    start: string;
    end: string;
  };
  notes?: string;
  affiliation?: string;
  url?: string;
}

export interface FocusArea {
  id: string;
  name: string;
  amount: string;
  interestTags: string[];
  startDate: string;
  endDate: string;
  donorCount: number;
  criteriaSummary: string;
}

export interface EngagementEntry {
  id: string;
  date: string;
  message: string;
}

export interface GivingRecord {
  id: string;
  date: string;
  amount: string;
  month: string;
  year: string;
}

export interface FundingCycle {
  name: string;
  width: string;
  position: number;
  color: string;
  status: "Upcoming" | "Ongoing" | "Closed";
  startMonth: number;
  endMonth: number;
  description: string;
}
