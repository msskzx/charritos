export interface Profile {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  links: any;
  categories: {
    id: string;
    name: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  profileCount?: number;
}

export interface Link {
  name: string;
  url: string;
} 