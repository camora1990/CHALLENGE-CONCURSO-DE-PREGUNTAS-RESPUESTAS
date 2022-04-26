import { Player } from "./Player.model";
import { Schema, model } from "mongoose";

class Score {
  point: number;
  player: Player;
}

const scoreSchema = new Schema<Score>({
  point: {
    type: Number,
    required: true,
  },
  player: {
    type: Schema.Types.ObjectId,
    ref: "Player",
  },
});

const scoreModel = model<Score>("Score", scoreSchema);

export default scoreModel;
