import { Manufacturer, Storage, OS, Camera } from "../models/specs";
import Phone, { Rating } from "../models/phone";
import data from "../../data/products.json";
import Image from "../models/image";
import Specs from "../models/specs";

export class Phones {
  private phones: Phone[] = [];
  private static instance: Phones;

  private constructor() {
    for (const datum of data) {
      const specs = new Specs(
        datum.specs.manufacturer as Manufacturer,
        datum.specs.storage as Storage,
        datum.specs.os as OS,
        datum.specs.camera as Camera
      );
      const image = new Image(datum.image.small, datum.image.large);
      const phone = new Phone(
        datum.id,
        datum.name,
        datum.price,
        specs,
        datum.description,
        datum.rating as Rating,
        image
      );
      this.phones.push(phone);
    }
  }

  public static getInstance(): Phones {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new Phones();
    return this.instance;
  }

  public get allPhones(): Phone[] {
    return this.phones;
  }
}

export const phones = Phones.getInstance();
