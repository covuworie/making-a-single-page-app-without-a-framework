import Backbone from "backbone";
import PhoneList from "../components/phone-list";
import PhoneFilter from "../components/phone-filter";

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
        "product/:phoneId": "renderPhone",
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

  private addFilterNavigationListener() {
    window.addEventListener("hashchange", (_: HashChangeEvent) => {
      const fragment = Backbone.history.getFragment();
      if (!fragment.startsWith("filter?")) {
        return;
      }
      PhoneFilter.UpdateFilterFromQuery(fragment);
    });
  }
}
