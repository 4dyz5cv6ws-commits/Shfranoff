export type ReviewSource = 'Яндекс Карты' | 'Google' | '2ГИС' | 'сайт';

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string; // YYYY-MM-DD
  source: ReviewSource;
}
