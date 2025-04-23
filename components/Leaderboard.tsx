"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/getLeaderboard";
import { Card } from "@/components/ui/card";
import type { Timestamp } from "firebase/firestore";

interface LeaderboardEntry {
  username: string;
  score: number;
  createdAt: Timestamp;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScores() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getLeaderboard();
        setScores(data);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again later.");
        console.error("Error loading leaderboard:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchScores();
  }, []);

  if (isLoading) {
    return (
      <Card className="p-4 max-w-md mx-auto mt-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-4 max-w-md mx-auto mt-6">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-800 dark:text-green-100">
        Leaderboard
      </h2>
      {scores.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No scores yet! Be the first to play and set a score.
        </p>
      ) : (
        <ul className="space-y-2">
          {scores.map((entry, index) => (
            <li
              key={`${entry.username}-${entry.createdAt.toMillis()}`}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 flex items-center justify-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full text-sm font-medium">
                  {index + 1}
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {entry.username}
                </span>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">
                {entry.score}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
