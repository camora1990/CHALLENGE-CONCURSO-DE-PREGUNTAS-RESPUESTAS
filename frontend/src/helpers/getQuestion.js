import axios from "axios";
import Swal from "sweetalert2";
export const getQuestion = async (rondaId) => {
  console.log("se ejecuto getQuestion");
  if (!rondaId) {
    return { opciones: [], pregunta: "", categoria: "" };
  }
  try {
    const { data: responseCategory } = await axios.get(`/category/${rondaId}`);
    const idCategory = responseCategory.category._id;
    debugger
    const { data: responseQuestons } = await axios.get(
      `/question/${idCategory}`
    );
    return {
      opciones: responseQuestons.question.options,
      pregunta: responseQuestons.question.question,
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
