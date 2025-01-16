export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  stock: number;
  discount?: number;
  category: 'kadin' | 'erkek' | 'aksesuar';
} 