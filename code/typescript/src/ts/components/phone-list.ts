import Phone from "../models/phone";
import { Manufacturer, Storage, OS, Camera } from "../models/specs";
import { phones } from "../collections/phones";
import PhoneFilter from "./phone-filter";

export default class PhoneList {
  private static instance: PhoneList;
  private phones: Phone[];

  private allProducts: HTMLUListElement;
  private singleProduct: HTMLDivElement;
  private productsList: HTMLUListElement;

  public static get Instance() {
    if (!PhoneList.instance) {
      PhoneList.instance = new PhoneList();
    }

    return PhoneList.instance;
  }

  public static renderPhones() {
    const products = Array.from(
      document.querySelectorAll("li[data-index]")
    ) as HTMLLIElement[];

    for (const product of products) {
      product.classList.remove("hidden");
    }

    if (PhoneFilter.IsNoCheckboxChecked()) {
      return;
    }

    const matchingIds = PhoneFilter.filter(PhoneList.Instance.phones);
    for (const product of products) {
      const id = parseInt(product.getAttribute("data-index")!);
      if (!matchingIds.includes(id)) {
        product.classList.add("hidden");
      }
    }
  }

  private constructor() {
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
    this.renderAllPhones();
    this.addClickEventListeners();
  }

  private renderAllPhones() {
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
    for (const product of Array.from(
      this.productsList.children
    ) as HTMLLIElement[]) {
      product.addEventListener("click", (_: MouseEvent) => {
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
