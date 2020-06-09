import Product, { ProductRating } from "./product";

export default class Phone implements Product {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public specs: {
      manufacturer: "Apple" | "HTC" | "Nokia" | "Samsung" | "Sony" | "ZTE";
      storage: 16 | 32;
      os: "Android" | "iOS" | "Windows";
      camera: 5 | 8 | 12 | 15;
    },
    public description: string,
    public rating: ProductRating,
    public image: {
      small: string;
      large: string;
    }
  ) {}
}
