
import { Donor, FocusArea, EngagementEntry, GivingRecord } from "@/types/donor";

export const donorData: Donor[] = [
  {
    id: "01",
    name: "FEHD Foundation",
    contact: "Mary Smith",
    email: "MSmith@fehd.org",
    phone: "+234 701234 5678",
    lastDonation: "Jan 2024",
    interestTags: ["Health", "Education", "Environment", "Gender"],
    fundingPeriod: {
      start: "Jan 2024",
      end: "Dec 2024"
    },
    notes: "FEHD Foundation has been a significant supporter of our healthcare initiatives.",
    affiliation: "NGO",
    url: "https://fehdfoundation.org"
  },
  {
    id: "02",
    name: "Global Initiative Fund",
    contact: "John Doe",
    email: "jdoe@globalinitiative.org",
    phone: "+234 701234 5679",
    lastDonation: "Feb 2024",
    interestTags: ["Education", "Technology"],
    fundingPeriod: {
      start: "Feb 2024",
      end: "Jan 2025"
    }
  },
  {
    id: "03",
    name: "Sustainable Future Coalition",
    contact: "Sarah Johnson",
    email: "sjohnson@sustainablefuture.org",
    phone: "+234 701234 5680",
    lastDonation: "Mar 2024",
    interestTags: ["Environment", "Agriculture"],
    fundingPeriod: {
      start: "Mar 2024",
      end: "Feb 2025"
    }
  },
  {
    id: "04",
    name: "Education First Foundation",
    contact: "David Williams",
    email: "dwilliams@edufirst.org",
    phone: "+234 701234 5681",
    lastDonation: "Apr 2024",
    interestTags: ["Education", "Youth Development"],
    fundingPeriod: {
      start: "Apr 2024",
      end: "Mar 2025"
    }
  },
  {
    id: "05",
    name: "Health Access Coalition",
    contact: "Emily Brown",
    email: "ebrown@healthaccess.org",
    phone: "+234 701234 5682",
    lastDonation: "May 2024",
    interestTags: ["Health", "Community Services"],
    fundingPeriod: {
      start: "May 2024",
      end: "Apr 2025"
    }
  }
];

export const focusAreas: FocusArea[] = [
  {
    id: "01",
    name: "High-Value Health Donors",
    amount: "N500K",
    interestTags: ["Health", "Gender", "Education"],
    startDate: "Jan 2024",
    endDate: "Dec 2025",
    donorCount: 100,
    criteriaSummary: "Donation Amount: N500K, Interest: Health, Gender, Education, Date: Jan 2024 - Dec 2025."
  },
  {
    id: "02",
    name: "Education Technology Supporters",
    amount: "N300K",
    interestTags: ["Education", "Technology"],
    startDate: "Feb 2024",
    endDate: "Jan 2026",
    donorCount: 75,
    criteriaSummary: "Donation Amount: N300K, Interest: Education, Technology, Date: Feb 2024 - Jan 2026."
  },
  {
    id: "03",
    name: "Environmental Sustainability Partners",
    amount: "N400K",
    interestTags: ["Environment", "Sustainability"],
    startDate: "Mar 2024",
    endDate: "Feb 2026",
    donorCount: 50,
    criteriaSummary: "Donation Amount: N400K, Interest: Environment, Sustainability, Date: Mar 2024 - Feb 2026."
  }
];

export const engagementHistory: EngagementEntry[] = [
  {
    id: "1",
    date: "April 17th, 2024",
    message: "Discussed funding priorities and upcoming initiatives."
  },
  {
    id: "2",
    date: "February 2024",
    message: "Met with donor representatives to present new program opportunities. Donor expressed interest in youth-focused initiatives."
  },
  {
    id: "3",
    date: "March 2024",
    message: "Follow-up call to discuss potential partnerships on educational programs."
  }
];

export const givingRecords: GivingRecord[] = [
  {
    id: "01",
    date: "Jan 2024",
    amount: "N20,000",
    month: "Jan",
    year: "2024"
  },
  {
    id: "02",
    date: "Jan 2024",
    amount: "N20,000",
    month: "Jan",
    year: "2024"
  },
  {
    id: "03",
    date: "Jan 2024",
    amount: "N20,000",
    month: "Jan",
    year: "2024"
  },
  {
    id: "04",
    date: "Jan 2024",
    amount: "N20,000",
    month: "Jan",
    year: "2024"
  }
];

// Monthly donation data for the chart
export const monthlyDonationData = [
  { month: "Jan", amount: 20 },
  { month: "Feb", amount: 35 },
  { month: "Mar", amount: 25 },
  { month: "Apr", amount: 40 },
  { month: "May", amount: 15 },
  { month: "Jun", amount: 30 },
  { month: "Jul", amount: 20 },
  { month: "Aug", amount: 35 },
  { month: "Sep", amount: 25 },
  { month: "Oct", amount: 40 },
  { month: "Nov", amount: 15 },
  { month: "Dec", amount: 30 }
];

export const availableInterestTags = [
  "Health", 
  "Education", 
  "Environment", 
  "Gender", 
  "Technology", 
  "Agriculture", 
  "Youth Development", 
  "Community Services",
  "Sustainability",
  "Infrastructure",
  "Disaster Relief",
  "Arts & Culture"
];
