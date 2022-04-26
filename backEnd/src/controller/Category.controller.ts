import { Request, Response } from "express";
import categoryModel from "../model/Category.model";

export class CategoryController {
  async getCategory(req: Request, res: Response): Promise<Response> {
    const { roundId } = req.params;
    try {
      const category = await categoryModel.findOne({ round: roundId });

      return category
        ? res.status(200).json({
            ok: true,
            message: "Category",
            category,
          })
        : res.status(404).json({
            ok: false,
            message: "Category not found",
          });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: error.message,
      });
    }
  }
}
