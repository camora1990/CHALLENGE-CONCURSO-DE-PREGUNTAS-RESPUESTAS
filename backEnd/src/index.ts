import { Server } from "./bootstrap/Server.bootstrap";
import { DataBase } from "./bootstrap/DataBase.bootstrap";

const server = new Server();
const dataBase = new DataBase();

(async function initServer() {
  try {
    await server.initialize();
    const mongoose = await dataBase.initialize();
    console.log(`connected to dataBase ${mongoose.connections[0].name}`);
  } catch (error) {
    await dataBase.closeConnection()
    console.log(error);
  }
})();
