import { QuizQuestion } from '@/types';

export const transportQuestions: QuizQuestion[] = [
  {
    id: 'transport-1',
    question: 'How do you usually commute to work/school?',
    type: 'choice',
    category: 'transport',
    impactMultiplier: 1,
    options: [
      { value: 'car', label: 'Car (alone)', icon: '🚗', points: 0 },
      { value: 'carpool', label: 'Carpool', icon: '🚗', points: 25 },
      { value: 'public', label: 'Public Transport', icon: '🚌', points: 50 },
      { value: 'bike', label: 'Bicycle', icon: '🚲', points: 75 },
      { value: 'walk', label: 'Walk', icon: '🚶', points: 100 },
    ],
  },
  {
    id: 'transport-2',
    question: 'How many kilometers do you travel by car per week?',
    type: 'slider',
    category: 'transport',
    impactMultiplier: 0.2,
    sliderConfig: {
      min: 0,
      max: 500,
      step: 10,
      unit: 'km',
    },
  },
];

export const electricityQuestions: QuizQuestion[] = [
  {
    id: 'electricity-1',
    question: 'Do you use energy-efficient LED bulbs?',
    type: 'choice',
    category: 'electricity',
    impactMultiplier: 1,
    options: [
      { value: 'all', label: 'Yes, all bulbs', icon: '💡', points: 100 },
      { value: 'most', label: 'Most bulbs', icon: '💡', points: 75 },
      { value: 'some', label: 'Some bulbs', icon: '💡', points: 50 },
      { value: 'none', label: 'No LED bulbs', icon: '💡', points: 0 },
    ],
  },
  {
    id: 'electricity-2',
    question: 'Average daily hours of air conditioning use?',
    type: 'slider',
    category: 'electricity',
    impactMultiplier: 0.3,
    sliderConfig: {
      min: 0,
      max: 24,
      step: 1,
      unit: 'hours',
    },
  },
];

export const consumptionQuestions: QuizQuestion[] = [
  {
    id: 'consumption-1',
    question: 'How often do you eat meat?',
    type: 'choice',
    category: 'consumption',
    impactMultiplier: 1,
    options: [
      { value: 'daily', label: 'Daily', icon: '🥩', points: 0 },
      { value: 'weekly', label: '2-3 times/week', icon: '🥩', points: 50 },
      { value: 'rarely', label: 'Rarely', icon: '🥗', points: 75 },
      { value: 'never', label: 'Never (Vegetarian/Vegan)', icon: '🥗', points: 100 },
    ],
  },
  {
    id: 'consumption-2',
    question: 'How many single-use plastic items do you use per week?',
    type: 'slider',
    category: 'consumption',
    impactMultiplier: 0.2,
    sliderConfig: {
      min: 0,
      max: 50,
      step: 1,
      unit: 'items',
    },
  },
];
