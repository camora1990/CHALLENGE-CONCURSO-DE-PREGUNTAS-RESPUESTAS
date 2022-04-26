import { Router } from "express";
import { QuestionController } from "../controller/Question.controller";

const questionController : QuestionController = new QuestionController()

class QuestionRoute {
  private _router: Router;

  constructor() {
    this._router = Router();
    this.routes();
  }

  routes(): void {
    this.router.get("/:categoryId",questionController.getQuestion);
  }
  public get router(): Router {
    return this._router;
  }
}

const newQuestionRoute: QuestionRoute = new QuestionRoute();
const { router } = newQuestionRoute;
export { router as questionRoute };
