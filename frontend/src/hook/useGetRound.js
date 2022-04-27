import { useState } from "react";
import { getQuestion } from "../helpers/getQuestion";

export const useGetRound = () => {
  const [state, setstate] = useState({
    opciones: [],
    pregunta: "",
    categoria: "",
  });

  const getRound = async (roundId) => {
    const { opciones, pregunta, categoria } = await getQuestion(roundId);
    
    setstate({
      opciones,
      pregunta,
      categoria,
    });
  };

  return {
    state,
    getRound,
  };
};
