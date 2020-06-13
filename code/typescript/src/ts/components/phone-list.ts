import Phone from "../models/phone";
import { Manufacturer, Storage, OS, Camera } from "../models/specs";

export class PhoneList {
  public constructor() {}

  public static render(phones: Phone[]) {
    const phoneList = document.querySelector(
      ".products-list"
    ) as HTMLUListElement;

    const template = document.querySelector(
      "#product-template"
    ) as HTMLTemplateElement;

    phones.map((phone) => {
      const phoneItem = document.importNode(template, true);

      const labelsToValues: {
        [index: string]: number | string | Manufacturer | Storage | OS | Camera;
      } = {
        id: phone.id,
        "image.small": phone.image.small,
        name: phone.name,
        "specs.manufacturer": phone.specs.manufacturer,
        "specs.storage": phone.specs.storage,
        "specs.os": phone.specs.os,
        "specs.camera": phone.specs.camera,
        price: phone.price,
      };

      for (const label in labelsToValues) {
        const value = labelsToValues[label];
        phoneItem.innerHTML = phoneItem.innerHTML!.replace(
          new RegExp(`{{${label}}}`, "g"),
          value.toString()
        );
      }

      phoneList.appendChild(phoneItem.content);
    });

    const allProducts = document.querySelector(
      ".all-products"
    ) as HTMLUListElement;
    allProducts.classList.add("visible");
  }
}
