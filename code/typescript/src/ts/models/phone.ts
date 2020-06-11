import Specs from "./specs";

export type Rating = 1 | 2 | 3 | 4 | 5;

export default class Phone {
  public constructor(
    public id: number,
    public name: string,
    public price: number,
    public specs: Specs,
    public description: string,
    public rating: Rating,
    public image: {
      small: string;
      large: string;
    }
  ) {}
}
