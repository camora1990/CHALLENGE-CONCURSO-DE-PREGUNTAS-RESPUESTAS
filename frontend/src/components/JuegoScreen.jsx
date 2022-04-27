import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Nav } from "../components/ui/Nav";
import { useGetRound } from "../hook/useGetRound";
import { AuthContext } from "../context/authContext";
import { types } from "../types/types";

export const JuegoScreen = () => {
  const { player, dispatch } = useContext(AuthContext);
  const [puntuacion, setPuntuacion] = useState(0);
  const [rondas, setrondas] = useState([]);
  const [siguienteRoda, setsiguienteRoda] = useState(0);
  const [actualRonda, setactualRonda] = useState({});
  const [iniciaJuego, setiniciaJuego] = useState(false);
  const { getRound, state } = useGetRound();
  const [validarRespuesta, setvalidarRespuesta] = useState(false);
  const [opcionSeleccionada, setopcionSeleccionada] = useState({});

  const { opciones, pregunta, categoria } = state;

  const obtenerRondas = async () => {
    try {
      const { data } = await axios.get("/round");
      setrondas(data.rounds);
    } catch (error) {
      throw new Error("Error en funcion getRondas");
    }
  };

  const handleIniciarJuego = async () => {
    setiniciaJuego(true);
    const ronda = rondas[0];
    setactualRonda(ronda);
    getRound(ronda._id);
  };

  const mensajeGanador = () => {
    Swal.fire({
      title: `Felicitaciones ${player.name} ganaste esta partida`,
      width: 600,
      padding: "3em",
      color: "#716add",
      background: "#fff url(/images/trees.png)",
      showCancelButton: true,
      confirmButtonText: "Jugar de nuevo",
      cancelButtonText: "Salir de juego",
      reverseButtons: true,
      backdrop: `
        rgba(0,0,123,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
    }).then(async (e) => {
      if (e.isConfirmed) {
        setsiguienteRoda(0);
        setPuntuacion(0);
      } else {
        dispatch({
          type: types.logout,
        });
      }
      try {
        await axios.post("/score", { point: puntuacion, playe: player._id });
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Tu puntuacion fue almacenada con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {}
    });
  };
  
  const mensajePerdedor = () => {
    
    Swal.fire({
      title: "Respuesta incorrecta",
      text: "sigue practicando",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Intentarlo de nuevo",
      cancelButtonText: "Salir del juego",
    }).then((result) => {
      if (result.isConfirmed) {
        getRound(rondas[0]._id)
        setsiguienteRoda(0);
        setPuntuacion(0);
        setopcionSeleccionada({})
      } else {
        dispatch({
          type: types.logout,
        });
      }
    });
  };

  const validarPregunta = async () => {
    const { isCorrect } = opcionSeleccionada;
    if (isCorrect) {
      const { points } = actualRonda;

      setPuntuacion(puntuacion + points);
      const totalRondas = rondas.length;

      if (siguienteRoda < totalRondas - 1) {
        setsiguienteRoda((siguienteRoda) => {
          return siguienteRoda + 1;
        });
      } else if (siguienteRoda == totalRondas - 1) {
        mensajeGanador();
        return;
      }

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Felicitaciones pasaste a la singuiente ronda",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }
    mensajePerdedor();
  };

  const handleSubmit = () => {
    setvalidarRespuesta(false);
    Swal.fire({
      icon: "question",
      html:
        '<i class="fa-solid fa-face-flushed"></i>' +
        " ¡Estas seguro que esa es la respuesta correcta! " +
        '<i class="fa-solid fa-face-meh-blank"></i>',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Estoy seguro!!',
      showCloseButton: true,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((e) => {
      if (e.isConfirmed) {
        validarPregunta();
      }
    });
  };

  useEffect(() => {
    console.log("Me ejecute");
    obtenerRondas();
  }, []);

  useEffect(() => {
    const obtenerSiguienteRonda = () => {
      setactualRonda(rondas[siguienteRoda]);
      getRound(actualRonda._id);
    };
    iniciaJuego && obtenerSiguienteRonda();
  }, [siguienteRoda, actualRonda]);

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
                  className={`btn btn-outline-dark w-100 mb-3 ${
                    opcion._id == opcionSeleccionada._id ? "active" : ""
                  }`}
                  role="alert"
                  onClick={(e) => {
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
              onClick={handleSubmit}
            >
              Enviar respuesta
            </button>
          </>
        )}
      </div>
    </>
  );
};
