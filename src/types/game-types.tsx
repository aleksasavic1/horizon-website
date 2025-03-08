export type Genre = {
  id: number;
  name: string;
};

export type GameTypes = {
  id: number;
  name: string;
  background_image: string;
  genres: Genre[];
  rating: number;
  reviews_count: number;
};

export type CarouselGameTypes = {
  id: number;
  name: string;
  background_image: string;
  genres?: Genre[];
  rating: number;
  reviews_count?: number;
};
