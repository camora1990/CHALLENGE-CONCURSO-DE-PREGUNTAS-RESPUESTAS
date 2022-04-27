import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8081/api/v1"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App  />);
