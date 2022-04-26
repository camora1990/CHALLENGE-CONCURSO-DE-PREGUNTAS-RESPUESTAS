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
      console.log(player)
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
}
