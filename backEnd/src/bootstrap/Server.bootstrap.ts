import { Application } from "express";
import express from "express";
import config from "../config/config";
import { IServer } from "./IServer.bootstrap";

export class Server implements IServer {
  private _app: Application;
  private _PORT: string;

  constructor() {
    this._app = express();
    this._PORT = config.port;
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
