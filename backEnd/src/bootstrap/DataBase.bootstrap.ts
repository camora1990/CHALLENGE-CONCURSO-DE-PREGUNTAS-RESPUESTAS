import { IServer } from "./IServer.bootstrap";
import mongosee, { Connection } from "mongoose";
import config from "../config/config";
import {  roundModel } from "../model/Round.model";
import { roundInitialData } from "../data/round.initalData";

export class DataBase implements IServer {
  private _CONNECTION_STRING: string;
  private _dbClient: Connection;

  constructor() {
    this._CONNECTION_STRING =
      config.connection_string || "mongodb://localhost:27017/PRUEBA-SOFKA";
    this._dbClient = mongosee.connection;
  }

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      mongosee.connect(this._CONNECTION_STRING);

      this._dbClient.on("error", (error) => {
        reject(error);
      });
      this._dbClient.on("open", () => {
        resolve(mongosee);
      });
    });
  }

  async closeConnection(): Promise<void> {
    try {
      await this._dbClient.close(true);
    } catch (error) {
      console.log(error);
    }
  }

  async initializeData(): Promise<void> {
    try {
      await this.deleteData();
      const createRound = roundModel.insertMany(roundInitialData);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteData(): Promise<void> {
    try {
      await roundModel.deleteMany();
    } catch (error) {
      console.log(error);
    }
  }
}
