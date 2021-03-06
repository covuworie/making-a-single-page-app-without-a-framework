import Backbone from "backbone";
import PhoneList from "../components/phone-list";
import PhoneFilter from "../components/phone-filter";
import Specs from "../models/specs";

export default class Router extends Backbone.Router {
  private static instance: Router;

  public static get Instance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }

    return Router.instance;
  }

  private constructor() {
    super({
      routes: {
        "": "renderAllPhones",
        "filter?:query": "renderPhones",
        "product/:phoneId(/)": "renderPhone",
        "*notfound": "render404",
      },
    });
  }

  public initialize() {
    Backbone.history.start({ root: "/app/" });
    this.addFilterNavigationListener();
  }

  public renderAllPhones() {
    PhoneList.Instance.renderAllPhones();
    PhoneList.Instance.addClickEventListeners();
    PhoneFilter.Instance;
  }

  public renderPhone(phoneId: number) {
    PhoneList.Instance.renderPhone(phoneId.toString());
  }

  public renderPhones(filter: string) {
    PhoneList.renderPhones(filter);
  }

  public render404() {
    PhoneList.Instance.togglePageVisibility(
      ["all-products", "single-product"],
      "hide"
    );
    PhoneList.Instance.togglePageVisibility(["error"], "show");
  }

  private addFilterNavigationListener() {
    window.addEventListener("hashchange", (_: HashChangeEvent) => {
      const fragment = Backbone.history.getFragment();
      if (!fragment.startsWith("filter?")) {
        return;
      }
      if (!this.isQueryValid(fragment)) {
        this.render404();
        return;
      }
      PhoneFilter.UpdateFilterFromQuery(fragment);
    });
  }

  private isQueryValid(fragment: string) {
    const query = fragment.replace("filter?", "");
    const parts = query.split("&");

    for (const part of parts) {
      const [name, value] = part.split("=");

      switch (name) {
        case "manufacturer":
          if (!Specs.isOfTypeManufacturer(value)) {
            return false;
          }
          break;

        case "storage":
          if (!Specs.isOfTypeStorage(+value)) {
            return false;
          }
          break;
        case "os":
          if (!Specs.isOfTypeOS(value)) {
            return false;
          }
          break;

        case "camera":
          if (!Specs.isOfTypeCamera(+value)) {
            return false;
          }
          break;

        default:
          return false;
      }
    }

    return true;
  }
}
