import React from 'react';
import { CreateTable } from '../components/CreateTable';
import neco from '../resources/neco.png';

export const Home = () => {
  return (
    <>
      {/* Contenedor de todo lo que despliega la pagina */}
      <div className='flex flex-col h-screen'>
        {/* Header de la pagina */}
        <div className='flex fixed w-full border-b-2 border-white/20 p-4 justify-center items-center z-50 bg-black/50'>
          <img src={neco} width='60' className='pr-4' />
          <span className='font-mono drop-shadow-md text-2xl text-gray-200 md:text-3xl lg:text-4xl'>
            Necodex - Catalogo de practicantes
          </span>
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
