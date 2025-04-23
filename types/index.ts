export type QuizQuestion = {
  id: string;
  question: string;
  type: 'choice' | 'slider';
  options?: {
    value: string;
    label: string;
    icon: string;
    points: number;
  }[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    unit: string;
  };
  category: 'transport' | 'electricity' | 'consumption';
  impactMultiplier: number;
};

export type UserProgress = {
  ecoPoints: number;
  carbonSaved: number;
  rank: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  completedChallenges: number;
  currentStreak: number;
};

export type Challenge = {
  id: string;
  title: string;
  description: string;
  points: number;
  duration: number; // in days
  category: 'transport' | 'electricity' | 'consumption';
  icon: string;
};
