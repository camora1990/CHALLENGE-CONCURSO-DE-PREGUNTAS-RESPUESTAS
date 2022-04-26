import { Schema, model } from "mongoose";

export class Round {
  round: string;
  points: number
}

const roundSchema = new Schema<Round>({
  round: {
    type: String,
    required: true,
  },
  points:{
      type: Number,
      require: true
  }
});

const roundModel = model<Round>("Round", roundSchema);

export default roundModel;
