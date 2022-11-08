import React from "react";
import { useNavigate } from "react-router-dom";
import { getDesactivar } from "../fetchs/getDesactivar";
import Swal from "sweetalert2";

export const TableActionButtons = ({ value, status, data, getData }) => {
  let navigate = useNavigate();

  return (
    <div className="flex items-center -space-x-4 hover:space-x-1">
      {/*"Detalles"*/}
      <button
        className="z-10 block p-4 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 "
        type="button"
        onClick={() => {
          navigate("/detalles", { state: data }, { state2: getData });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      </button>

      {/*"Editar"*/}
      <button
        className="z-20 block p-4 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 "
        type="button"
        onClick={() => {
          navigate("/editar", { state: data });
        }}
      >
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </button>

      {/*"Desactivar"*/}
      <button
        className="z-30 block p-4 text-gray-900 transition-all bg-red-100 border-2 border-white rounded-full hover:scale-110  active:bg-red-50"
        type="button"
        onClick={() => {
          Swal.fire({
            title: "Estas seguro?",
            text: "Se cambiara el estado de este practicante.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1e847f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, cambiar estado!",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              getDesactivar(value, status, getData);
              Swal.fire({
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                allowOutsideClick: false,
                title: "Listo!",
                text: "El estado del practicante ha cambiado",
                timer: 1200,
              });
            }
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-slash-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z" />
        </svg>
      </button>
    </div>
  );
};
