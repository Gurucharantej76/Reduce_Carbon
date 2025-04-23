import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Leaderboard from "@/components/Leaderboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 dark:text-green-100">
            CarbonCutter
          </h1>
          <p className="text-xl text-green-700 dark:text-green-200">
            Make a difference, one eco-friendly choice at a time
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">
              Track Your Impact
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Discover your carbon footprint and track your progress towards a greener lifestyle.
            </p>
            <Link href="/onboarding">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Start Your Journey
              </Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-300">
              Already a Member?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sign in to view your dashboard and continue making a positive impact.
            </p>
            <Link href="/login">
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Sign In
              </Button>
            </Link>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-8">
            Why Choose CarbonCutter?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Gamified Experience</h4>
              <p className="text-gray-600 dark:text-gray-300">Earn EcoPoints while saving the planet</p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Personalized Tips</h4>
              <p className="text-gray-600 dark:text-gray-300">Get custom recommendations for your lifestyle</p>
            </div>
            <div className="p-4">
              <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Real Impact</h4>
              <p className="text-gray-600 dark:text-gray-300">See your actual contribution to sustainability</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
