import { Router } from "express";
import { RoundController } from "../controller/Round.controller";

const roundController :RoundController = new RoundController()

class RoundRoute {
  private _route: Router;
  constructor() {
    this._route = Router();
    this.routes();
  }

  routes() :void{
    this._route.get("/",roundController.getRounds);
  }

  public get route(): Router {
    return this._route;
  }
}

const newRoundRoute: RoundRoute = new RoundRoute();
const { route } = newRoundRoute;
export {
    route as roundRoute
}
