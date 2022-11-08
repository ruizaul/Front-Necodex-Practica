import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <>
      <main class="h-screen w-full flex flex-col justify-center items-center bg-[##1a1a1a]">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-[#1e847f] px-2 text-sm rounded rotate-12 absolute">
          Pagina no encontrada
        </div>
        <button class="mt-5">
          <a class="relative inline-block text-sm font-medium text-white group active:text-[#1e847f] focus:outline-none focus:ring">
            <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#1e847f] group-hover:translate-y-0 group-hover:translate-x-0"></span>

            <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/">Volver a inicio </Link>
            </span>
          </a>
        </button>
      </main>
    </>
  );
};
