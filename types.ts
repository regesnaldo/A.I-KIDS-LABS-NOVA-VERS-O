
export interface ContentItem {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  description: string;
  category: string;
  ageRating: '7+' | '12+' | 'Adulto';
  type: 'video' | 'interactive' | 'game';
  progress?: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  role: 'child' | 'parent';
  xp: number;
  level: number;
}

export interface LearningStat {
  topic: string;
  mastery: number; // 0-100
  timeSpent: number; // minutes
}
