export interface Profile {
  id: string;
  name: string;
  username?: string;
  description: string | null;
  imageUrl: string | null;
  city?: string | null;
  country?: string | null;
  links: any;
  categories: {
    id: string;
    name: string;
  }[];
  donation?: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  profileCount?: number;
  profiles?: Profile[];
}

export interface Link {
  name: string;
  url: string;
} 