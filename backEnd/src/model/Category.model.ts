import { model, Schema } from "mongoose";
import { Round } from "./Round.model";

export class Category {
  category: string;
  round: Round;
}

const categorySchema = new Schema<Category>({
  category: {
    type: String,
    required: true,
  },
  round: {
    type: Schema.Types.ObjectId,
    ref: "Round",
    required: true,
  },
});

const categoryModel = model<Category>("Category", categorySchema);

export default categoryModel;
