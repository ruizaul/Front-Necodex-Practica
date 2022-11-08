import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateTable } from "../components/CreateTable";

export const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      {/* Contenedor de todo lo que despliega la pagina */}

      <div className='flex flex-col h-screen'>
        {/* Header de la pagina */}

        <div className='p-2 text-center font-mono text-2xl text-gray-300  bg-teal-300/30 md:text-5xl'>
          Necodex - Catalogo de practicantes
        </div>

        {/* Boton Crear practicante */}
        <div
          className='flex justify-center mt-10 cursor-pointer'
          title='Agregar Practicante'
          onClick={() => {
            navigate('/agregar');
          }}
        >
          <button className='bg-[#1E847F] hover:bg-[#1E847F]/80 text-white font-bold py-2 px-4 border-b-4 border-teal-800 hover:border-teal-900 rounded'>
            Agregar Practicante
          </button>
        </div>

        {/* Mostrar tabla */}

        <div className='flex items-center justify-center p-2'>
          <CreateTable />
        </div>

        {/* Footer de la pagina */}

        <div className='mt-auto p-4 items-center text-gray-500/40 text-center text-sm'>
          {'© 2022 Saul Fimbres. All Rights Reserved.'}
        </div>
      </div>
    </>
  );
};

