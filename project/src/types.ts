export interface Bookmark {
  id: string;
  title: string;
  url: string;
  category: string;
  favicon?: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}