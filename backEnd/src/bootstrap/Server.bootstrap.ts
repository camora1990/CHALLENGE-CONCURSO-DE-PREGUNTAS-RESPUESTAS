import { Application } from "express";
import express from "express";
import cors from "cors";

import config from "../config/config";
import { IServer } from "./IServer.bootstrap";
import { Path } from "../enums/path.enum";
import { playerRoute } from "../routes/Player.routes";
import { roundRoute } from "../routes/Round.routes";
import { categoryRoute } from "../routes/Category.route";
import { questionRoute } from "../routes/Question.route";

export class Server implements IServer {
  private _app: Application;
  private _PORT: number;

  constructor() {
    this._app = express();
    this._PORT = Number(config.port) || 5000;
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cors({ origin: "*" }));
  }

  routes(): void {
    this._app.use(Path.player, playerRoute);
    this._app.use(Path.round, roundRoute);
    this._app.use(Path.category, categoryRoute);
    this._app.use(Path.question, questionRoute);
  }

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._app
        .listen(this._PORT)
        .on("listening", () => {
          resolve(`Server init on port ${this._PORT}`);
          console.log(`Server init on port ${this._PORT}`);
        })
        .on("error", (error) => reject(error));
    });
  }
}
