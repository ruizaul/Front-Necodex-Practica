import React from 'react';
import { CreateTable } from '../components/CreateTable';

export const Home = () => {
  return (
    <>
      {/* Contenedor de todo lo que despliega la pagina */}

      <div className='flex flex-col h-screen'>
        {/* Header de la pagina */}

        <div className='p-2 text-center font-mono text-2xl text-gray-300  bg-teal-300/30 md:text-5xl'>
          Necodex - Catalogo de practicantes
        </div>

        {/* Mostrar tabla */}

        <div className='flex m-auto items-center p-2'>
          <CreateTable />
        </div>

        {/* Footer de la pagina */}

        <div className='mb-2 p-4 items-center text-gray-500/40 text-center text-sm'>
          {'© 2022 Saul Fimbres. All Rights Reserved.'}
        </div>
      </div>
    </>
  );
};
