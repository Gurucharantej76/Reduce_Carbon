import { Timestamp } from "firebase/firestore";

export interface LeaderboardEntry {
  username: string;
  score: number;
  createdAt: Timestamp;
}
