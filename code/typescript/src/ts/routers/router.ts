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
    console.log("Called constructor");
    super({
      routes: {
        "": "renderAllPhones",
        "product/:phoneId": "renderPhone",
      },
    });
  }

  public initialize() {
    Backbone.history.start({ root: "/app/" });
  }

  public renderAllPhones() {  
    PhoneList.Instance.renderAllPhones();
    PhoneList.Instance.addClickEventListeners();
    PhoneFilter.Instance;
  }

  public renderPhone(phoneId: number) {
    PhoneList.Instance.renderPhone(phoneId.toString());
  }
}
