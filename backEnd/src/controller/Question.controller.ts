import { Request, Response } from "express";
import questionModel from "../model/Question.model";

export class QuestionController {
  async getQuestion(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    try {
      const question = await questionModel
        .find({ category: categoryId })
        .populate({ path: "category" });

      return res.status(200).json({
        ok: true,
        message: "Question of category",
        question: question,
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}
