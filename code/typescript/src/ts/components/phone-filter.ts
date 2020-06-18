import PhoneList from "./phone-list";
import { Manufacturer, Storage, OS, Camera } from "../models/specs";
import Phone from "../models/phone";

export default class PhoneFilter {
  private static instance: PhoneFilter;
  private checkboxes: HTMLInputElement[];

  public static get Instance() {
    if (!PhoneFilter.instance) {
      PhoneFilter.instance = new PhoneFilter();
    }

    return PhoneFilter.instance;
  }

  public static filter(phones: Phone[]) {
    const manufacturers: string[] = [];
    const storages: string[] = [];
    const oss: string[] = [];
    const cameras: string[] = [];

    for (const checkbox of PhoneFilter.Instance.checkboxes) {
      if (!checkbox.checked) {
        continue;
      }

      switch (checkbox.name) {
        case "manufacturer":
          manufacturers.push(checkbox.value);
          break;

        case "storage":
          storages.push(checkbox.value);
          break;

        case "os":
          oss.push(checkbox.value);
          break;

        case "camera":
          cameras.push(checkbox.value);
          break;
      }
    }

    const matchingIds = PhoneFilter.createMatchingIds(
      phones,
      manufacturers,
      storages,
      oss,
      cameras
    );
    return matchingIds;
  }

  public static IsNoCheckboxChecked() {
    for (const checkbox of this.Instance.checkboxes) {
      if (checkbox.checked) {
        return false;
      }
    }
    return true;
  }

  private constructor() {
    this.checkboxes = Array.from(
      document.querySelectorAll(".filter-criteria input[type=checkbox]")
    );
    this.addCheckboxListeners();
    this.addClearFilterListener();
  }

  private addCheckboxListeners() {
    for (const checkbox of this.checkboxes) {
      checkbox.addEventListener("change", PhoneList.renderPhones);
    }
  }

  private addClearFilterListener() {
    const button = document.querySelector(".filter-clear") as HTMLButtonElement;
    button.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      this.clearFilters();
    });
  }

  private static createMatchingIds(
    phones: Phone[],
    manufacturers: string[],
    storages: string[],
    oss: string[],
    cameras: string[]
  ) {
    const matchingIds: number[] = [];
    for (const phone of phones) {
      if (
        PhoneFilter.nothingChecked(manufacturers, storages, oss, cameras) ||
        !PhoneFilter.specInArray(phone.specs.manufacturer, manufacturers) ||
        !PhoneFilter.specInArray(phone.specs.storage, storages) ||
        !PhoneFilter.specInArray(phone.specs.os, oss) ||
        !PhoneFilter.specInArray(phone.specs.camera, cameras)
      ) {
        continue;
      }
      matchingIds.push(phone.id);
    }
    return matchingIds;
  }

  private static nothingChecked(
    manufacturers: string[],
    storages: string[],
    oss: string[],
    cameras: string[]
  ) {
    if (
      manufacturers.length === 0 &&
      storages.length === 0 &&
      oss.length === 0 &&
      cameras.length === 0
    ) {
      return true;
    }
    return false;
  }

  private static specInArray(
    spec: Manufacturer | Storage | OS | Camera,
    array: string[]
  ) {
    if (array.length > 0 && !array.includes(spec.toString().toLowerCase())) {
      return false;
    }
    return true;
  }

  private clearFilters() {
    for (const checkbox of PhoneFilter.Instance.checkboxes) {
      checkbox.checked = false;
    }

    PhoneList.renderPhones();
  }
}
