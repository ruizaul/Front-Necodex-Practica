import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { getHorario } from '../fetchs/getHorario';
import Swal from 'sweetalert2';
import moment from 'moment';

export const Editar = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const URL = `https://backend-practica-necodex.vercel.app/api/practicantes/${state.uid}`;

  const parseDate = moment(state.nacimiento).utc().format('YYYY-MM-DD');

  const [data, setData] = useState({
    nombre: state.nombre,
    apellidos: state.apellidos,
    genero: state.genero,
    correo: state.correo,
    nacimiento: parseDate,
    telefono: state.telefono,
    clabe: state.clabe,
    horario: state.horario,
  });

  const [horario, setHorario] = useState([]);

  useEffect(() => {
    getHorario(setHorario);
  }, []);

  function submit(e) {
    e.preventDefault();
    axios
      .put(URL, {
        nombre: data.nombre,
        apellidos: data.apellidos,
        genero: data.genero,
        correo: data.correo,
        nacimiento: data.nacimiento,
        telefono: data.telefono,
        clabe: data.clabe,
        horario: data.horario,
      })
      .then(() => {
        Swal.fire({
          allowOutsideClick: false,
          position: 'top-end',
          icon: 'success',
          title: 'Practicante editado exitosamente!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate('/');
        });
      })
      .catch((error) => {
        const errors = error.response.data.errors[0].msg;
        console.log(errors);
        Swal.fire({
          allowOutsideClick: false,
          position: 'bottom-end',
          icon: 'error',
          title: 'Error: ',
          text: `${errors}`,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      {/* Back Button */}
      <button
        className='flex items-center justify-center mt-10 mx-10 text-white  focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center mr-2 dark:bg-[#1a1a1a] dark:hover:bg-[#1e847f]'
        type='button'
        title='Regresar'
        onClick={() => navigate('/')}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-10 w-10'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15 19l-7-7 7-7' />
        </svg>
      </button>

      {/* Titulo */}
      <h1 className='flex items-center justify-center -mb-10 mt-2 mx-10 font-large leading-tight text-4xl text-gray-300'>
        Editar practicante
      </h1>

      {/* Form */}
      <div className='grid content-center gap-4 auto-rows-auto grid-cols-1 my-20'>
        <div className='mx-auto grid-cols-2 px-8 py-8 bg-slate-100 rounded-lg'>
          <form onSubmit={(e) => submit(e)}>
            {/* Nombres */}
            <div className='mb-5'>
              <label htmlFor='name' className='mb-3 block text-base font-medium text-[#07074D]'>
                {'📜 Nombre(s)'}
              </label>
              <input
                onChange={(e) => handle(e)}
                type='text'
                id='nombre'
                placeholder={data.nombre}
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
              />
            </div>

            {/* Apellidos */}
            <div className='mb-5'>
              <label htmlFor='surname' className='mb-3 block text-base font-medium text-[#07074D]'>
                📜 Apellidos
              </label>
              <input
                onChange={(e) => handle(e)}
                type='text'
                id='apellidos'
                placeholder={data.apellidos}
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
              />
            </div>

            {/* Genero */}
            <div className='mb-5'>
              <label htmlFor='email' className='mb-3 block text-base font-medium text-[#07074D]'>
                🚻 Género
              </label>

              <div className='flex items-center mb-4 ml-6'>
                <input
                  type='radio'
                  id='genero'
                  defaultChecked={data.genero === 'H'}
                  value={'H'}
                  name='gender'
                  onChange={(e) => handle(e)}
                  className='w-4 h-4 text-[#1e847f] bg-gray-100 border-gray-300 focus:ring-[#1e847f] dark:focus:ring-[#1e847f] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                ></input>
                <label
                  htmlFor='default-radio-1'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-[#6B7280]'
                >
                  Hombre
                </label>
              </div>

              <div className='flex items-center mb-4 ml-6'>
                <input
                  type='radio'
                  id='genero'
                  defaultChecked={data.genero === 'M'}
                  value={'M'}
                  name='gender'
                  onChange={(e) => handle(e)}
                  className='w-4 h-4 text-[#1e847f] bg-gray-100 border-gray-300 focus:ring-[#1e847f] dark:focus:ring-[#1e847f] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                ></input>
                <label
                  htmlFor='default-radio-2'
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-[#6B7280]'
                >
                  Mujer
                </label>
              </div>
            </div>

            {/* Nacimiento */}
            <div className='mb-5'>
              <label
                htmlFor='datepicker'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                🍰 Fecha de nacimiento
              </label>
              <input
                onChange={(e) => handle(e)}
                value={data.nacimiento}
                type='date'
                id='nacimiento'
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-gray-400'
              />
            </div>

            {/* Correo Electronico */}
            <div className='mb-5'>
              <label htmlFor='email' className='mb-3 block text-base font-medium text-[#07074D]'>
                Correo Electrónico
              </label>
              <input
                onChange={(e) => handle(e)}
                type='email'
                id='correo'
                placeholder={data.correo}
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
              />
            </div>

            {/* Telefono */}
            <div className='mb-5'>
              <label htmlFor='phone' className='mb-3 block text-base font-medium text-[#07074D]'>
                📞 Numero de teléfono
              </label>
              <input
                onChange={(e) => handle(e)}
                type='number'
                min='0'
                id='telefono'
                placeholder={data.telefono}
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
              />
            </div>

            {/* CLABE */}
            <div className='mb-5'>
              <label htmlFor='clabe' className='mb-3 block text-base font-medium text-[#07074D]'>
                🏧 CLABE interbancaria *Opcional
              </label>
              <input
                onChange={(e) => handle(e)}
                type='text'
                id='clabe'
                placeholder={data.clabe}
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
              />
            </div>

            {/* Horario */}
            <div className='mb-5'>
              <label
                htmlFor='countries'
                className='mb-3 block text-base font-medium text-[#07074D]'
              >
                🕧 Preferencia de horario
              </label>
              <select
                value={data.horario._id}
                onChange={(e) => handle(e)}
                id='horario'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6A64F1] focus:border-[#6A64F1] block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                {horario.map((element) => {
                  return (
                    <option key={element._id} value={element._id}>
                      {`${element.entrada} - ${element.salida} `}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Submit Button*/}
            <div className='mt-8 mx-24 '>
              <button className='hover:shadow-form rounded-md bg-[#1e847f] py-3 px-8 text-base font-semibold text-white outline-none'>
                Modificar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
