import { Request, Response } from "express";
import playerModel from "../model/Player.model";

export class PlayerController {
  async postPlayer(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const player = new playerModel({
      name: name.trim().toUpperCase(),
      email: email.trim().toUpperCase(),
    });

    try {
      await player.save();
      return res.status(201).json({
        ok: true,
        message: "Player created successfully",
        player,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { email } = req.body || "";
    try {
      const player = await playerModel.findOne({ email: email.toUpperCase() });
      return player
        ? res.status(200).json({
            status: 200,
            ok: true,
            message: "Bienvenido",
            player,
          })
        : res.status(404).json({
            status: 404,
            ok: false,
            message: "Jugador no resgistrado",
          });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}
