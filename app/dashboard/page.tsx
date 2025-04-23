"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

const weeklyGoals = [
  { id: 1, title: "3 Days No Plastic", progress: 66, points: 150 },
  { id: 2, title: "Use Public Transport Twice", progress: 50, points: 100 },
  { id: 3, title: "Reduce Energy Usage by 10%", progress: 30, points: 200 },
];

const tips = [
  { id: 1, title: "Switch to LED Lights", description: "Save energy and earn points!", points: 50 },
  { id: 2, title: "Start Composting", description: "Reduce waste and help the planet", points: 75 },
  { id: 3, title: "Use a Reusable Water Bottle", description: "Say no to plastic", points: 25 },
];

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-100">
            Your Eco Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-lg py-2">
              Level 5 Eco Warrior
            </Badge>
            <Button 
              variant="destructive" 
              onClick={async () => {
                try {
                  await logoutUser();
                  router.push('/login');
                  router.refresh();
                } catch (error) {
                  console.error('Logout error:', error);
                }
              }}
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                    CO2 Saved
                  </h2>
                  <p className="text-3xl font-bold text-green-600">
                    125 kg
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    This week
                  </p>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                    EcoPoints
                  </h2>
                  <p className="text-3xl font-bold text-green-600">
                    850
                  </p>
                  <div className="mt-2">
                    <Progress value={85} className="h-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      150 points to next level
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
                    Current Streak
                  </h2>
                  <p className="text-3xl font-bold text-green-600">
                    🔥 7 Days
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Personal Best: 14 days
                  </p>
                </Card>
              </motion.div>
            </div>

            <Card className="p-6">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {[
                  { text: 'Used public transport', points: 50, time: '2h ago' },
                  { text: 'Switched to LED lights', points: 100, time: '1d ago' },
                  { text: 'Completed weekly challenge', points: 200, time: '2d ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-green-100 dark:bg-green-800">
                        +{activity.points}
                      </Badge>
                      <span className="text-green-700 dark:text-green-300">{activity.text}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            {weeklyGoals.map((goal) => (
              <Card key={goal.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-green-700 dark:text-green-300">
                      {goal.title}
                    </h3>
                    <Badge variant="secondary" className="mt-2">
                      {goal.points} points
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    Update Progress
                  </Button>
                </div>
                <Progress value={goal.progress} className="h-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {goal.progress}% Complete
                </p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tips" className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <Card key={tip.id} className="p-6">
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tip.description}
                </p>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">
                    Earn {tip.points} points
                  </Badge>
                  <Button variant="outline" size="sm">
                    Mark as Done
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
