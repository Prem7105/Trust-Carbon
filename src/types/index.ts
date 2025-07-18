export interface User {
  id: string;
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joinDate: string;
  totalProjects: number;
  totalTokens: number;
  verificationLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  avatar?: string;
  joinDate: string;
  totalProjects: number;
  totalTokens: number;
  verificationLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface SensorLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

export interface Location {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp: string;
}

export interface GeoFenceZone {
  id: number;
  name: string;
  lat: number;
  lng: number;
  radius: number;
  active: boolean;
}

export interface BlockchainData {
  id: number;
  co2_level: number;
  timestamp: string;
  location: string;
  zone: string;
  locationVerified: boolean;
  verified: boolean;
  hash: string;
  previousHash: string;
  blockNumber: number;
}

export interface ChartData {
  time: string;
  value: number;
}

export interface Analytics {
  totalEmissions: number;
  reducedEmissions: number;
  creditsEarned: number;
  verificationRate: number;
  monthlyIncrease: number;
  activeSensors: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Renewable Energy' | 'Forest Conservation' | 'Waste Management' | 'Transportation' | 'Agriculture';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedBy: string;
  submittedDate: string;
  estimatedCredits: number;
  documents: ProjectDocument[];
  location: string;
  duration: string;
  budget: number;
  verificationHash?: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadDate: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'Physical' | 'Digital' | 'Experience' | 'Donation';
  image: string;
  available: boolean;
  stock?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  contractAddress: string;
  mintDate: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'quick_reply' | 'card';
}

export interface VerificationDetails {
  id: string;
  projectId: string;
  verifier: string;
  verificationDate: string;
  status: 'Verified' | 'Pending' | 'Failed';
  transactionHash: string;
  blockNumber: number;
  gasUsed: number;
  verificationNotes: string;
  documents: string[];
  creditsIssued: number;
}

export interface CompanyEmission {
  id: string;
  name: string;
  location: string;
  emission: number;
  verification: 'Verified' | 'Pending' | 'Failed';
  lastUpdated: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'Renewable Energy' | 'Forest Conservation' | 'Waste Management' | 'Transportation' | 'Agriculture';
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Approved' | 'Rejected';
  submittedBy: string;
  submittedDate: string;
  estimatedCredits: number;
  documents: ProjectDocument[];
  location: string;
  duration: string;
  budget: number;
  verificationHash?: string;
}

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadDate: string;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'Physical' | 'Digital' | 'Experience' | 'Donation';
  image: string;
  available: boolean;
  stock?: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  tokenId: string;
  contractAddress: string;
  mintDate: string;
  attributes: NFTAttribute[];
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: string;
  type?: 'text' | 'quick_reply' | 'card';
}

export interface VerificationDetails {
  id: string;
  projectId: string;
  verifier: string;
  verificationDate: string;
  status: 'Verified' | 'Pending' | 'Failed';
  transactionHash: string;
  blockNumber: number;
  gasUsed: number;
  verificationNotes: string;
  documents: string[];
  creditsIssued: number;
}