export type ProductRating = 1 | 2 | 3 | 4 | 5;

export default interface Product {
  id: number;
  name: string;
  price: number;
  specs: {};
  description: string;
  rating: ProductRating;
  image: {
    small: string;
    large: string;
  };
}
