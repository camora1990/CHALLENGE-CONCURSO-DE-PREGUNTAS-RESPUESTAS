import React, { useContext, useEffect, useState } from "react";
import { Nav } from "../components/ui/Nav";
import axios from "axios";
import { useGetRound } from "../hook/useGetRound";
import { AuthContext } from "../context/authContext";
import { useNewHook } from "../hook/useGetRound";

export const JuegoScreen = () => {
  const { player } = useContext(AuthContext);
  const [puntuacion, setPuntuacion] = useState(0);
  const [rondas, setrondas] = useState([]);
  const [siguienteRoda, setsiguienteRoda] = useState(0);
  const [actualRonda, setactualRonda] = useState({});
  const [iniciaJuego, setiniciaJuego] = useState(false);
  const { getRound, state } = useGetRound();
  const [validarRespuesta, setvalidarRespuesta] = useState(false);
  const [opcionSeleccionada, setopcionSeleccionada] = useState({});

  const { opciones, pregunta, categoria, loading } = state;
  const getrondas = async () => {
    try {
      const { data } = await axios.get("/round");
      setrondas(data.rounds);
    } catch (error) {
      throw new Error("Error en funcion getRondas");
    }
  };

  useEffect(() => {
    console.log("Me ejecute");
    getrondas();
  }, []);

  const handleIniciarJuego = () => {
    setiniciaJuego(true);
    const ronda = rondas[0];
    setactualRonda(ronda);
    getRound(ronda._id);
  };

  return (
    <>
      {iniciaJuego && <Nav puntos={puntuacion} />}
      <div className="container">
        {!iniciaJuego ? (
          <div className="alert alert-success mt-5" role="alert">
            <h4 className="alert-heading">Instrucciones del juego</h4>
            <ol>
              <li>
                El juego tiene 5 rondas, cada ronda tiene asignada una categoría
                y cada categoría tiene unas preguntas, el sistema escoge una
                pregunta aleatoriamente.
              </li>
              <li>
                El jugador selecciona una opción de las 4 disponibles, si la
                respuesta es incorrecta el juego termina, si acierta pasa de
                ronda y aumenta la complejidad.
              </li>
              <li>
                Cada ronda tiene una puntuación que se irá acumulando a medida
                que pase a la siguiente.
              </li>
              <li>Se gana si se responden las 5 categorías.</li>
            </ol>

            <hr />
            <button
              className="btn btn-outline-secondary"
              onClick={handleIniciarJuego}
            >
              Iniciar
            </button>
          </div>
        ) : (
          <>
            <h3>{actualRonda.round}</h3>
            <h3>{categoria}</h3>
            <div className="alert alert-secondary" role="alert">
              <h5 className="alert-heading">
                {siguienteRoda + 1}. {pregunta}
              </h5>
              <hr />
              {opciones.map((opcion) => (
                <button
                  key={opcion._id}
                  className="btn btn-outline-dark w-100 mb-3"
                  role="alert"
                  onClick={() => {
                    setvalidarRespuesta(true);
                    setopcionSeleccionada(opcion);
                  }}
                >
                  {opcion.item}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!validarRespuesta}
              className="btn btn-success float-end"
            >
              Enviar respuesta
            </button>
          </>
        )}
      </div>
    </>
  );
};
