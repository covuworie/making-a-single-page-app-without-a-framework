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
}
