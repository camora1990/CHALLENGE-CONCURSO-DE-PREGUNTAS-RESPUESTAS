import { Router } from "express";
import { PlayerController } from "../controller/Player.controller";

const playerController = new PlayerController();

class PlayerRoute {
  private _route: Router;
  constructor() {
    this._route = Router();
    this.routes();
  }

  routes() {
    this._route.post("/", playerController.postPlayer);
  }
  public get route(): Router {
    return this._route;
  }
}

const newPlayerRouter: PlayerRoute = new PlayerRoute();
const { route } = newPlayerRouter;
export { route as playerRoute };
