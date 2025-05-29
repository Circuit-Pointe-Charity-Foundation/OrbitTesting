
export interface ProposalLibraryItem {
  id: string;
  title: string;
  description: string;
  fileType: string;
  uses: number;
  imageSrc: string;
  rating: number;
}

export const sampleProposals: ProposalLibraryItem[] = [
  {
    id: "pl1",
    title: "Empower Change: A Fundraising Proposal",
    description: "Hey there! Have you ever thought about exploring new horizons together?",
    fileType: "Word",
    uses: 742,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992.svg",
    rating: 5,
  },
  {
    id: "pl2",
    title: "Together We Rise: Community Support Initiative",
    description: "Imagine the possibilities if we teamed up on this project!",
    fileType: "PowerPoint",
    uses: 1256,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992-1.svg",
    rating: 5,
  },
  {
    id: "pl3",
    title: "Seeds of Hope: A Green Fundraising Campaign",
    description: "What if we joined forces to create something truly amazing?",
    fileType: "Word",
    uses: 934,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992-2.svg",
    rating: 5,
  },
  {
    id: "pl4",
    title: "Building Futures: Education Fundraising Proposal",
    description: "Let's brainstorm some exciting ideas that could take us to the next level!",
    fileType: "Word",
    uses: 389,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992-3.svg",
    rating: 4,
  },
  {
    id: "pl5",
    title: "Hearts United: A Charitable Giving Proposal",
    description: "How about we collaborate and bring our unique strengths together?",
    fileType: "PowerPoint",
    uses: 1004,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992-4.svg",
    rating: 4,
  },
  {
    id: "pl6",
    title: "Voices for Change: Advocacy Fundraising Proposal",
    description: "I have a vision that I think we could turn into reality if we work together!",
    fileType: "Word",
    uses: 582,
    imageSrc: "https://c.animaapp.com/LmcWXGMJ/img/rectangle-39992-5.svg",
    rating: 4,
  },
  {
    id: "pl7",
    title: "Tech for Good: Innovation Fundraising Initiative",
    description: "Revolutionary ideas await - let's transform communities together!",
    fileType: "PowerPoint",
    uses: 623,
    imageSrc: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    rating: 5,
  },
  {
    id: "pl8",
    title: "Clean Water Access: Global Health Initiative",
    description: "Every drop counts - join us in bringing clean water to underserved communities.",
    fileType: "Word",
    uses: 891,
    imageSrc: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    rating: 5,
  },
];
