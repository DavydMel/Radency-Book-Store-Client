import {Review} from "./review";

export interface BookDetail {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  rating: number;
  reviews: Review[];
}
