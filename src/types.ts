export type PageId = 
  | 'dashboard' 
  | 'analyze' 
  | 'history' 
  | 'analytics' 
  | 'categories' 
  | 'settings' 
  | 'about';

export type TicketPriority = 'High' | 'Medium' | 'Low' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved';
export type TicketSource = 'Email' | 'Chat' | 'Phone' | 'Web Portal';

export interface Ticket {
  id: string;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  subject: string;
  body: string;
  category: string;
  priority: TicketPriority;
  aiConfidence: number; // e.g. 95.1
  assignedTo: string;
  assignedTeam: string;
  status: TicketStatus;
  createdAt: string;
  source: TicketSource;
  extractedKeywords: string[];
  sentiment: {
    label: 'Positive' | 'Neutral' | 'Negative' | 'Urgent';
    score: number; // e.g. -0.74 to 0.85
  };
  classificationReason: string;
  recommendedAction: string;
  customerImpact: string;
  slaTarget: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  ticketCount: number;
  confidence: number;
  accuracy: number;
  description: string;
  color: string;
  assignedTeam: string;
  slaHours: number;
  sampleKeywords: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  team: string;
  avatarColor: string;
  status: 'Online' | 'Busy' | 'Away';
  assignedCount: number;
}
