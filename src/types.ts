export type UserRole = 'admin' | 'relawan' | 'user';

export interface KearifanLokal {
  id: string;
  title: string;
  region: string;
  description: string;
  philosophies: string[];
  bestPractices: string[];
  imageUrl?: string;
  category: 'Mitigasi Bencana' | 'Zonasi Adat' | 'Konservasi Air' | 'Harmoni Lingkungan';
}

export interface Consultation {
  id: string;
  userId: string;
  userName: string;
  title: string;
  location: string;
  terrainType: string;
  wisdomPreferenceId: string;
  question: string;
  status: 'pending' | 'answered';
  createdAt: string;
  answer?: {
    id: string;
    volunteerId: string;
    volunteerName: string;
    volunteerTitle: string;
    response: string;
    wisdomRecommendation: string;
    createdAt: string;
  };
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  title: string;
  institution: string;
  certifiedHours: number;
  consultationsAnswered: number;
}
