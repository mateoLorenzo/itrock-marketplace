export interface Review {
  id: number;
  user: string;
  initials: string;
  date: string;
  text: string;
}

export interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}
