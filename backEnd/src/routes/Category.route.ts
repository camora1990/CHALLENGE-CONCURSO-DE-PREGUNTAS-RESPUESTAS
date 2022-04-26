import { Router } from "express";
import { CategoryController } from "../controller/Category.controller";

const categoyController: CategoryController = new CategoryController();

class CategoryRoute {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.routes();
  }

  routes(): void {
    this._router.get("/:roundId", categoyController.getCategory);
  }

  public get router(): Router {
    return this._router;
  }
}

const newCategoryRoute: CategoryRoute = new CategoryRoute();

const { router } = newCategoryRoute;

export { router as categoryRoute };
