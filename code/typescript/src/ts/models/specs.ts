export type Camera = 5 | 8 | 12 | 15;
export type Manufacturer =
  | "Apple"
  | "HTC"
  | "Nokia"
  | "Samsung"
  | "Sony"
  | "ZTE";
export type OS = "Android" | "iOS" | "Windows";
export type Storage = 16 | 32;

export default class Specs {
  public constructor(
    public manufacturer: Manufacturer,
    public storage: Storage,
    public os: OS,
    public camera: Camera
  ) {}

  public static isOfTypeCamera(value: number): value is Camera {
    return [5, 8, 12, 15].includes(value);
  }

  public static isOfTypeManufacturer(value: string): value is Manufacturer {
    return ["apple", "htc", "nokia", "samsung", "sony", "zte"].includes(value);
  }

  public static isOfTypeOS(value: string): value is OS {
    return ["android", "ios", "windows"].includes(value);
  }

  public static isOfTypeStorage(value: number): value is Storage {
    return [16, 32].includes(value);
  }
}
