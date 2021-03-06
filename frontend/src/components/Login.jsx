import React, { useContext, useState } from "react";
import { Loading } from "./ui/Loading";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { types } from "../types/types";

export const Login = () => {
  const initialState = { name: "", email: "" };
  const [infoUser, setinfoUser] = useState(initialState);
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setinfoUser({
      ...infoUser,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = login
        ? await axios.post("/player/login", infoUser)
        : await axios.post("/player/", infoUser);

      Swal.fire({
        position: "center",
        icon: "success",
        title: `Bienvenido ${data.player.name}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate("/juego", { replace: true });
      dispatch({
        type: types.login,
        payload: data.player,
      });
    } catch (error) {
      !error.response?.data.ok &&
        Swal.fire("El usuario aun no esta registrado!!");
      setLoading(false);
      setLogin(false);
    }
  };

  return (
    <div className="container">
      {loading && <Loading />}
      <div className="row d-flex justify-content-center p-3">
        <div className="col-12 col-lg-6  p-4 mb-5 bg-body rounded-3 mt-5 custom-tarjetas">
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="d-flex align-items-center mb-3 pb-1 justify-content-center">
              <i className="fas fa-poll fa-2x me-3"></i>
              <span className="h1 fw-bold mb-0 text-center">
                JUEGO DE PREGUNTAS Y RESPUESTAS
              </span>
            </div>
            <h5 className="fw-normal mb-3 pb-3">
              {login ? "Inicio de sesi??n" : "Registarse"}
            </h5>
            <div className="form-floating mb-3">
              <input
                id="floatingEmailLogin"
                type="email"
                name="email"
                autoCapitalize="on"
                className="form-control form-control-lg"
                required={true}
                placeholder="Correo electr??nico"
                autoComplete="off"
                value={infoUser.email}
                onChange={handleChange}
              />
              <label
                htmlFor="floatingEmailLogin"
                className="form-label text-muted"
              >
                Correo electr??nico
              </label>
            </div>
            {!login && (
              <div className="form-floating mb-3">
                <input
                  name="name"
                  id="floatingNameLogin"
                  type="name"
                  autoCapitalize="on"
                  className="form-control form-control-lg"
                  required={true}
                  placeholder="Nombre de usuario"
                  autoComplete="off"
                  value={infoUser.name}
                  onChange={handleChange}
                />
                <label
                  htmlFor="floatingNameLogin"
                  className="form-label text-muted"
                >
                  Nombre de usuario
                </label>
              </div>
            )}

            <button
              type="submit"
              className="form-control btn btn-outline-secondary"
            >
              {login ? "Inicio de sesi??n" : "Registarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
