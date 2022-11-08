import React from "react";
import { useNavigate } from "react-router-dom";
import { CreateTable } from "../components/CreateTable";

export const Home = () => {
  let navigate = useNavigate();

  return (
    <>
      {/* Contenedor de todo lo que despliega la pagina */}

      <div className='container'>
        {/* Header de la pagina */}

        <div className='cont ttle'>
          <span className='gre'>{'<N'}</span>
          <span className='whi'>{'ecodex  -->'}</span>
          <span className='righty'>
            {' Catálogo de practicantes  '}
            <span className='gre2'>{'/>'}</span>
          </span>
        </div>

        {/* Boton Crear practicante */}
        <div
          className='grid content-center gap-4 auto-rows-auto grid-cols-1 mx-auto cursor-pointer'
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

        <div className='cont table'>
          <CreateTable />
        </div>

        {/* Footer de la pagina */}

        <div className='footer'>{'© 2022 Saul Fimbres - Roberto Amaya. All Rights Reserved.'}</div>
      </div>
    </>
  );
};

