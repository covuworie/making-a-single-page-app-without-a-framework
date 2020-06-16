import Phone from "../models/phone";
import { Manufacturer, Storage, OS, Camera } from "../models/specs";
import { phones } from "../collections/phones";

export class PhoneList {
  private allProducts: HTMLUListElement;
  private singleProduct: HTMLDivElement;
  private productsList: HTMLUListElement;
  private phones: Phone[];

  public constructor() {
    this.allProducts = document.querySelector(
      ".all-products"
    ) as HTMLUListElement;
    this.singleProduct = document.querySelector(
      ".single-product"
    ) as HTMLDivElement;
    this.productsList = document.querySelector(
      ".products-list"
    ) as HTMLUListElement;

    this.phones = phones.allPhones;
    this.render();
    this.addClickEventListeners();
  }

  private render() {
    const template = document.querySelector(
      "#product-template"
    ) as HTMLTemplateElement;

    this.phones.map((phone) => {
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

      this.productsList.appendChild(phoneItem.content);
    });

    this.allProducts.classList.add("visible");
  }

  private addClickEventListeners() {
    for (const product of this.productsList.children) {
      (product as HTMLLIElement).addEventListener("click", (_: MouseEvent) => {
        this.renderPhone(product.getAttribute("data-index")!);
      });
    }
  }

  private renderPhone(phoneId: string) {
    const preview = document.querySelector(".preview-large") as HTMLDivElement;

    this.phones.forEach((phone) => {
      if (phone.id.toString() === phoneId) {
        preview.querySelector("h3")!.textContent = phone.name;
        preview.querySelector("img")!.setAttribute("src", phone.image.large);
        preview.querySelector("p")!.textContent = phone.description;
      }
    });

    this.singleProduct.classList.add("visible");
    this.addCloseEventListener();
  }

  private addCloseEventListener() {
    const close = document.querySelector(".close") as HTMLSpanElement;
    close!.addEventListener("click", () => {
      this.singleProduct.classList.remove("visible");
    });
  }
}
