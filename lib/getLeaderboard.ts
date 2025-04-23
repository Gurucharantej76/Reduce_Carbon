import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";

interface LeaderboardEntry {
  username: string;
  score: number;
  createdAt: Timestamp;
}

/**
 * Fetches the top 10 scores from Firestore, ordered by score descending.
 * @returns {Promise<LeaderboardEntry[]>} An array of user score objects.
 * @throws {Error} If there's an error fetching the leaderboard data
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const scoresRef = collection(db, "scores");
    const topScoresQuery = query(
      scoresRef,
      orderBy("score", "desc"),
      limit(10)
    );
    
    const querySnapshot = await getDocs(topScoresQuery);
    const leaderboard: LeaderboardEntry[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      leaderboard.push({
        username: data.username,
        score: data.score,
        createdAt: data.createdAt,
      });
    });

    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    throw error; // Re-throw the error so the caller can handle it appropriately
  }
}
