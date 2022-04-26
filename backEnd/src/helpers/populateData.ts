import { categoryInitialData } from "../data/category.initialData";
import { roundInitialData } from "../data/round.initalData";
import categoryModel from "../model/Category.model";
import { roundModel } from "../model/Round.model";

export const populateData = async (): Promise<void> => {
  const createRound = await roundModel.insertMany(roundInitialData);
  let categories: any[] = [];
  createRound.forEach(({ round, _id }) => {
    categoryInitialData
      .filter((category) => category.round === round)
      .forEach(({ category }) => {
        categories.push({
          category,
          round: _id,
        });
      });
  });
  await categoryModel.insertMany(categories);
};
