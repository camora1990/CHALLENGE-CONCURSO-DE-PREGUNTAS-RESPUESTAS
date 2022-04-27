import { Router } from "express";
import { PlayerController } from "../controller/Player.controller";

const playerController = new PlayerController();

class PlayerRoute {
  private _router: Router;
  constructor() {
    this._router = Router();
    this.routes();
  }

  routes(): void {
    this._router.post("/", playerController.postPlayer);
    this._router.post("/login", playerController.login);
  }
  public get router(): Router {
    return this._router;
  }
}

const newPlayerRouter: PlayerRoute = new PlayerRoute();
const { router } = newPlayerRouter;
export { router as playerRoute };
