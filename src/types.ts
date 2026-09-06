export type MCANPost =
  | 'Amir'
  | 'Amira'
  | 'Naibul Amir'
  | 'General Secretary'
  | 'Assistant General Secretary'
  | 'Public Relations Officer (PRO)'
  | 'Imam'
  | 'Naibul Imam'
  | 'Financial Secretary'
  | 'Treasurer'
  | 'Welfare Director'
  | 'Organizing Secretary'
  | 'Da\'wah Director'
  | 'Library & ICT Officer'
  | 'Corps Member';

export interface Member {
  id: string; // e.g. MCAN-OS-2024-0012
  fullName: string;
  stateCode: string; // Format: OS/24A/XXXX
  callUpNumber?: string;
  mcanPost: MCANPost | string;
  phoneNumber: string;
  whatsappNumber?: string;
  email?: string;
  passportUrl: string; // base64 or photo URL
  gender: 'Male' | 'Female';
  lga: string; // Osun State LGA
  ppa: string; // Place of Primary Assignment
  bloodGroup?: string;
  batch: string; // e.g., 2024 Batch A, 2024 Batch B
  residence?: string; // Lodge or private
  registrationDate: string;
  verified: boolean;
  verificationHash: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
}

export type ProgramFrequency = 'weekly' | 'monthly' | 'yearly';

export interface ProgramActivity {
  id: string;
  title: string;
  frequency: ProgramFrequency;
  schedulePattern: string; // e.g., "Every Sunday, 10:00 AM - 1:00 PM"
  time: string;
  venue: string;
  description: string;
  targetAudience: string;
  category: 'Spiritual' | 'Dawah' | 'Welfare' | 'Educational' | 'Conference' | 'Camp';
  coordinator: string;
  isUpcoming?: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Urgent' | 'Weekly' | 'Monthly' | 'Yearly' | 'General' | 'Camp';
  content: string;
  publishedAt: string;
  pinned: boolean;
  author: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'Camp Guide' | 'Spiritual & Dua' | 'Prayer Timetable' | 'MCAN Constitution' | 'Lodge Directory' | 'Khutbah';
  description: string;
  format: 'PDF' | 'Text' | 'Directory' | 'Table' | 'Guide';
  downloadUrl?: string;
  readTime?: string;
  details?: string[];
}

export interface DonationAccount {
  bankName: string;
  accountNumber: string;
  accountName: string;
  purpose: string;
  note?: string;
}
