"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { transportQuestions, electricityQuestions, consumptionQuestions } from '@/data/quiz-questions';
import { QuizQuestion } from '@/types';

const categories = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'transport', title: 'Transport', questions: transportQuestions },
  { id: 'electricity', title: 'Electricity', questions: electricityQuestions },
  { id: 'consumption', title: 'Consumption', questions: consumptionQuestions },
];

export default function Onboarding() {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [points, setPoints] = useState(0);

  const handleAnswer = (questionId: string, answer: any, points: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    setPoints(prev => prev + points);
  };

  const nextQuestion = () => {
    if (currentCategory === 0) {
      setCurrentCategory(1);
      return;
    }

    const currentQuestions = categories[currentCategory]?.questions;
    if (currentQuestions && questionIndex < currentQuestions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else if (currentCategory < categories.length - 1) {
      setCurrentCategory(prev => prev + 1);
      setQuestionIndex(0);
    }
  };

  const renderQuestion = (question: QuizQuestion) => {
    if (question.type === 'choice') {
      return (
        <div className="grid grid-cols-2 gap-4">
          {question.options?.map((option) => (
            <Button
              key={option.value}
              variant={answers[question.id] === option.value ? 'default' : 'outline'}
              className="h-20 text-lg transition-all"
              onClick={() => handleAnswer(question.id, option.value, option.points)}
            >
              {option.icon} {option.label}
            </Button>
          ))}
        </div>
      );
    }

    if (question.type === 'slider' && question.sliderConfig) {
      const { min, max, step, unit } = question.sliderConfig;
      return (
        <div className="space-y-4">
          <Slider
            defaultValue={[min]}
            max={max}
            step={step}
            onValueChange={([value]) => handleAnswer(question.id, value, Math.max(0, max - value))}
          />
          <p className="text-center text-gray-600 dark:text-gray-300">
            {answers[question.id] || min} {unit}
          </p>
        </div>
      );
    }
  };

  const progress = ((currentCategory * 100) + (questionIndex + 1) * 25) / (categories.length * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <main className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="mb-8">
            <Progress value={progress * 100} className="mb-2" />
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
              <span>Progress</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCategory}-${questionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {currentCategory === 0 ? (
                <div className="text-center space-y-6">
                  <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">
                    Welcome to CarbonCutter!
                  </h1>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p>Let's start your eco-friendly journey with a quick quiz.</p>
                    <p>You'll earn eco-points for sustainable choices! 🌱</p>
                  </div>
                  <Badge variant="secondary" className="text-lg py-2">
                    Current Points: {points}
                  </Badge>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-green-700 dark:text-green-200">
                    {categories[currentCategory]?.questions?.[questionIndex]?.question}
                  </h2>
                  {categories[currentCategory]?.questions?.[questionIndex] && 
                    renderQuestion(categories[currentCategory].questions[questionIndex])}
                </div>
              )}

              <div className="pt-6 flex justify-between">
                {currentCategory > 0 && questionIndex > 0 ? (
                  <Button 
                    variant="outline"
                    onClick={() => setQuestionIndex(prev => prev - 1)}
                  >
                    Back
                  </Button>
                ) : currentCategory > 0 ? (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCurrentCategory(prev => prev - 1);
                      setQuestionIndex((categories[currentCategory - 1]?.questions?.length || 1) - 1);
                    }}
                  >
                    Previous Section
                  </Button>
                ) : (
                  <Link href="/">
                    <Button variant="outline">Exit</Button>
                  </Link>
                )}

                {currentCategory === categories.length - 1 && 
                 questionIndex === (categories[currentCategory]?.questions?.length || 0) - 1 ? (
                  <Link href="/dashboard">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      See Your Results!
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={nextQuestion}
                  >
                    {currentCategory === 0 ? "Let's Start!" : "Next"}
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </Card>
      </main>
    </div>
  );
}
