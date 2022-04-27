import axios from "axios";
import Swal from "sweetalert2";
export const getQuestion = async (rondaId) => {
  if (!rondaId) {
    return { opciones: [], pregunta: "", categoria: "" };
  }
  try {
    const { data: responseCategory } = await axios.get(`/category/${rondaId}`);
    const idCategory = responseCategory.category._id;

    const { data: responseQuestons } = await axios.get(
      `/question/${idCategory}`
    );
    const random = Math.floor(
      Math.random() * (responseQuestons.question.length - 1 - 0 + 1) + 0
    );
    return {
      opciones: responseQuestons.question[random].options.sort(()=>Math.random()-0.5),
      pregunta: responseQuestons.question[random].question,
      categoria: responseCategory.category.category,
    };
  } catch (error) {
    console.log(error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
      footer: '<a href="">Algo salio mal!!</a>',
    });
    throw new Error("Failed in function getQuestion");
  }
};
