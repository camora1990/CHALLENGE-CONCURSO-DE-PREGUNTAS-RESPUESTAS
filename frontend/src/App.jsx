import { useEffect, useReducer } from "react";
import { AuthContext } from "./context/authContext";
import { authReducer } from "./context/authReducer";
import { AppRouter } from "./routers/AppRouter";
import "./App.css"
const init = () => {
  return JSON.parse(localStorage.getItem("player")) || { logged: false };
};

function App() {
  const [player, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("player", JSON.stringify(player));
  }, [player]);

  return (
    <AuthContext.Provider value={{ player, dispatch }}>
      <div className="font-monospace">

      <AppRouter />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
