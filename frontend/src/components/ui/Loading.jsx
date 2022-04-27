import React from "react";
import "./loading.css"
export const Loading = () => {
  return (
    <div className="loading-spinner ">
      <div className="loading-img ">
        <img src="/spinner.gif" alt="" />
        <p>Cargando espere por favor......</p>
      </div>
    </div>
  );
};
