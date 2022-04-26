import { Router } from "express";
import { ScoreController } from "../controller/ScoreController";

const scoreController: ScoreController = new ScoreController();

class ScoreRoute {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.routes();
  }

  routes(): void {
    this.router.post("/", scoreController.postScore);
    this.router.get("/", scoreController.getScore);
  }
  public get router(): Router {
    return this._router;
  }
}

const newScoreRoute: ScoreRoute = new ScoreRoute();
const { router } = newScoreRoute;

export { router as scoreRoute };
