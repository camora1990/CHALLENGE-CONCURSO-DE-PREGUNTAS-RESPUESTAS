import { categoryInitialData } from "../data/category.initialData";
import { questionInitialData } from "../data/question.initialData";
import { roundInitialData } from "../data/round.initalData";
import categoryModel from "../model/Category.model";
import questionModel from "../model/Question.model";
import { roundModel } from "../model/Round.model";

export const populateData = async (): Promise<void> => {
  const createRound = await roundModel.insertMany(roundInitialData);
  let categories: any[] = [];
  createRound.forEach(({ round, _id }) => {
    categoryInitialData
      .filter((category) => category.round.round === round)
      .forEach(({ category }) => {
        categories.push({
          category,
          round: _id,
        });
      });
  });
  const newCategories = await categoryModel.insertMany(categories);
  let questions: any[] = [];
  newCategories.forEach(({ category, _id }) => {
    questionInitialData
      .filter((question) => question.category.category === category)
      .forEach((question) => {
        questions.push({
          ...question,
          category: _id,
        });
      });
  });
  await questionModel.insertMany(questions);
};
