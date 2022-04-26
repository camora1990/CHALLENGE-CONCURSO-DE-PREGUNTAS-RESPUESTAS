import { Request, Response } from "express";
import roundModel from "../model/Round.model";


export class RoundController {
  async getRounds(req: Request, res: Response): Promise<Response> {
    try {
      const rounds = await roundModel.find();
      return res.status(200).json({
        ok: true,
        message: "Rondas del juego",
        rounds,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}
