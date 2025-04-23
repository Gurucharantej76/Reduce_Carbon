import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ScoreData {
  username: string;
  score: number;
  createdAt: ReturnType<typeof serverTimestamp>;
}

/**
 * Submits a user's score to the Firestore database.
 * @param {string} username - The user's name or ID.
 * @param {number} score - The user's score.
 * @returns {Promise<void>}
 * @throws {Error} If there's an error submitting the score
 */
export async function submitScore(username: string, score: number): Promise<void> {
  try {
    const scoreData: ScoreData = {
      username,
      score,
      createdAt: serverTimestamp()
    };

    await addDoc(collection(db, "scores"), scoreData);
    console.log("Score submitted successfully!");
  } catch (error) {
    console.error("Error submitting score:", error);
    throw error; // Re-throw the error so the caller can handle it
  }
}
