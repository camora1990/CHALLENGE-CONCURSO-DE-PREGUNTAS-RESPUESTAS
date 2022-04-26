import { model, Schema } from "mongoose";
import { Category } from "./Category.model";
export class Question {
  question: string;
  category: Category;
  options: any;
}

const questionSchema = new Schema<Question>({
  question: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  options: {
    type: [
      {
        item: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],
    minlength: 4,
    maxlength: 4,
  },
});

const questionModel = model<Question>("Question", questionSchema);

export default questionModel;
