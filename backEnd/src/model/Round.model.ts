import { Schema, model } from "mongoose";

export class Round {
  round: string;
}

const roundSchema = new Schema<Round>({
  round: {
    type: String,
    required: true,
  },
});

const roundModel = model<Round>("Round", roundSchema);

export { roundModel };
