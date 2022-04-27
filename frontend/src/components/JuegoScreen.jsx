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
      color: "#3f4144",
      background: "#fff url(/confetti.gif)",
      showCancelButton: true,
      confirmButtonText: "Jugar de nuevo",
      cancelButtonText: "Salir de juego",
      reverseButtons: true,
      backdrop: `
        rgba(0,0,0,0.4)
        url("/ganadores.gif")
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
      iconColor:"transparent",
      background: "#fff url(/76ck.gif)",
      color: "#000000",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Intentarlo de nuevo",
      cancelButtonText: "Salir del juego",
    }).then((result) => {
      debugger
      if (result.isConfirmed || result.isDenied) {
        getRound(rondas[0]._id);
        setsiguienteRoda(0);
        setPuntuacion(0);
        setopcionSeleccionada({});
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
      } else if (siguienteRoda === totalRondas - 1) {
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
          <div
            className="custom-tarjetas  rounded alert alert-light mt-5 animate__animated animate__fadeIn"
            role="alert"
          >
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
              Iniciar Juego
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-center mt-2 mb-3">{actualRonda.round}</h1>
            <h3 className="mt-5 text-center">
              <strong>Categoría: </strong>
              {categoria} por <strong>{String(actualRonda.points).replace(/\B(?=(\d{3})+\b)/g, ",")}</strong> Puntos
            </h3>
            <div
              className="bg-transparent alert alert-light rounded  animate__animated animate__fadeInDown border-0"
              role="alert"
            >
              <h5 className="alert-heading ">
                <div className="custom-tarjetas bg-light p-4 rounded">
                  {siguienteRoda + 1}. {pregunta}
                </div>
              </h5>
              <hr />
              {opciones.map((opcion) => (
                <button
                  key={opcion._id}
                  className={` btn btn-outline-secondary  w-100 mb-3 p-2 ${
                    opcion._id === opcionSeleccionada._id ? "active" : ""
                  } custom-tarjetas btn-custom`}
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
