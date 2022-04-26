import { Schema, model } from "mongoose";

class Player {
  name: string;
  email: string;
}

const playerSchema = new Schema<Player>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const playerModel = model<Player>("Player", playerSchema);

export default playerModel;
