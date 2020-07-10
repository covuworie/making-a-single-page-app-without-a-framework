import Phone from "../models/phone";
import { Manufacturer, Storage, OS, Camera } from "../models/specs";
import { phones } from "../collections/phones";
import PhoneFilter from "./phone-filter";
import Router from "../routers/router";

type Pages = "all-products" | "single-product" | "error";
type PageVisibilty = "show" | "hide";

export default class PhoneList {
  private static instance: PhoneList;
  private phones: Phone[];

  private pages: HTMLDivElement[];
  private productsList: HTMLUListElement;

  public static get Instance() {
    if (!PhoneList.instance) {
      PhoneList.instance = new PhoneList();
    }

    return PhoneList.instance;
  }

  public renderAllPhones() {
    PhoneFilter.Instance.clearFilters();
    this.productsList.innerHTML = "";

    const template = document.querySelector(
      "#product-template"
    ) as HTMLTemplateElement;

    this.phones.map((phone) => {
      const phoneItem = document.importNode(template, true);

      const imagePath = `${location.origin}/app/${phone.image.small}`;
      const labelsToValues: {
        [index: string]: number | string | Manufacturer | Storage | OS | Camera;
      } = {
        id: phone.id,
        "image.small": imagePath,
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

    PhoneList.Instance.togglePageVisibility(
      ["single-product", "error"],
      "hide"
    );
    PhoneList.Instance.togglePageVisibility(["all-products"], "show");
  }

  public static renderPhones(_: string) {
    const products = Array.from(
      document.querySelectorAll("li[data-index]")
    ) as HTMLLIElement[];
    for (const product of products) {
      product.classList.remove("hidden");
    }

    const matchingIds = PhoneFilter.filter(PhoneList.Instance.phones);
    for (const product of products) {
      const id = parseInt(product.getAttribute("data-index")!);
      if (!matchingIds.includes(id)) {
        product.classList.add("hidden");
      }
    }

    PhoneList.Instance.togglePageVisibility(
      ["single-product", "error"],
      "hide"
    );
    PhoneList.Instance.togglePageVisibility(["all-products"], "show");
  }

  public renderPhone(phoneId: string) {
    const preview = document.querySelector(".preview-large") as HTMLDivElement;

    this.phones.forEach((phone) => {
      if (phone.id.toString() === phoneId) {
        preview.querySelector("h3")!.textContent = phone.name;
        const imagePath = `${location.origin}/app/${phone.image.large}`;
        preview.querySelector("img")!.setAttribute("src", imagePath);
        preview.querySelector("p")!.textContent = phone.description;

        Router.Instance.navigate(`product/${phone.id}`, { trigger: true });
      }
    });

    PhoneList.Instance.togglePageVisibility(["error"], "hide");
    PhoneList.Instance.togglePageVisibility(["single-product"], "show");
    this.addCloseEventListener();
  }

  public togglePageVisibility(pages: Pages[], visibility: PageVisibilty) {
    for (const page of pages) {
      this.pages.forEach((page_) => {
        if (page_.classList.contains(page)) {
          if (visibility === "show") {
            page_.classList.add("visible");
          } else if (visibility === "hide") {
            page_.classList.remove("visible");
          }
        }
      });
    }
  }

  public addClickEventListeners() {
    for (const product of Array.from(
      this.productsList.children
    ) as HTMLLIElement[]) {
      product.addEventListener("click", (_: MouseEvent) => {
        const phoneId = product.getAttribute("data-index")!;
        Router.Instance.navigate(`product/${phoneId}`, { trigger: true });
      });
    }
  }

  private constructor() {
    this.pages = Array.from(
      document.querySelectorAll(".page")
    ) as HTMLDivElement[];
    this.productsList = document.querySelector(
      ".products-list"
    ) as HTMLUListElement;

    this.phones = phones.allPhones;
  }

  private addCloseEventListener() {
    const close = document.querySelector(".close") as HTMLSpanElement;
    close!.addEventListener("click", () => {
      PhoneList.Instance.togglePageVisibility(["single-product"], "hide");
      const query = PhoneFilter.Instance.formQueryString();
      if (query.length === 0) {
        Router.Instance.navigate("", { trigger: true });
      } else {
        Router.Instance.navigate(`filter?${query}`, { trigger: true });
      }
    });
  }
}
