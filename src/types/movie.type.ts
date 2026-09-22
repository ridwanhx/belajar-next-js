import { Timestamp } from "firebase/firestore";

// inisialisasi type
export type CastMember = {
  id: number;
  name: string;
  role: string;
};
export type movieType = {
  id: number;
  title: string;
  category: string[];
  director: string;
  casts: CastMember[];
  rating: number;
  poster: string;
  release_date: Timestamp;
  synopsis: string;
  quote: string;
};