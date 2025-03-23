export type Genre = {
  id: number;
  name: string;
};

export type Developer = {
  name: string;
};

export type PlatformInfo = {
  platform: {
    name: string;
  };
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
};

export type GameTypes = {
  id: number;
  name: string;
  rating: number;
  released: string;
  background_image: string;
  background_image_additional?: string;
  description_raw: string;
  platforms: PlatformInfo[];
  developers: Developer[];
  reviews_count: number;
  genres: Genre[];
  youtube_count?: string;
  twitch_count?: string;
  reddit_count?: string;
  reddit_url?: string;
  website?: string;
};

export type CarouselGameTypes = {
  id: number;
  name: string;
  background_image: string;
  genres?: Genre[];
  rating: number;
  reviews_count?: number;
};

export type Screenshot = {
  image: string;
};
