export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  features: string[];
  includes: { item: string; quantity: number }[];
  gallery: string[];
  others: Product[];
}