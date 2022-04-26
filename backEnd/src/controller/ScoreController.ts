import { Request, Response } from "express";
import scoreModel from "../model/Score.model";

export class ScoreController {
  async getScore(req: Request, res: Response): Promise<Response> {
    try {
      const scores = await scoreModel.find().populate({ path: "player" });
      return res.status(200).json({
        ok: true,
        message: "Lista de ganadores",
        scores,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }

  async postScore(req: Request, res: Response): Promise<Response> {
    const { player, point } = req.body;
    try {
      const newScore = new scoreModel({
        player,
        point,
      });
      (await newScore.save()).populate({ path: "player" });
      return res.status(200).json({
        ok: true,
        message: "Puntaje guardado con exito",
        newScore,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}
