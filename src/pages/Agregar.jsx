import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getHorario } from '../fetchs/getHorario';
import Swal from 'sweetalert2';

export const Agregar = () => {
  const navigate = useNavigate();
  const URL = 'https://backend-practica-necodex.vercel.app/api/practicantes/';

  const [data, setData] = useState({
    nombre: '',
    apellidos: '',
    genero: '',
    correo: '',
    nacimiento: '',
    telefono: '',
    clabe: '',
    horario: '',
  });

  const [horario, setHorario] = useState([]);

  useEffect(() => {
    getHorario(setHorario);
  }, []);

  function submit(e) {
    e.preventDefault();
    axios
      .post(URL, {
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
          position: 'top-end',

          icon: 'success',
          title: 'Practicante creado exitosamente!',
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
          position: 'bottom-end',
          allowOutsideClick: false,
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
      <div className='flex items-center justify-center flex-col gap-5'>
        {/* Back Button */}
        <button
          className='flex self-start mt-10 text-white  focus:outline-none font-medium rounded-r-lg text-sm p-2.5 text-center mr-2 dark:bg-[#1a1a1a] dark:hover:bg-[#1e847f]'
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
        <h1 className='flex self-center text-center text-2xl font-large leading-tight md:text-4xl text-gray-300'>
          Crear practicante
        </h1>

        {/* Form */}
        <div className='flex self-center flex-row gap-2 mb-10'>
          <div className='w-56 md:w-full p-5 bg-slate-100 rounded-lg'>
            <form
              onSubmit={(e) => {
                submit(e);
              }}
            >
              {/* Nombres */}
              <div className='mb-5'>
                <label htmlFor='name' className='mb-3 block text-base font-medium text-[#07074D]'>
                  {'📜 Nombre(s)'}
                </label>
                <input
                  autoFocus
                  required
                  onChange={(e) => handle(e)}
                  type='text'
                  id='nombre'
                  value={data.nombre}
                  placeholder='Nombre(s)'
                  className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
                />
              </div>

              {/* Apellidos */}
              <div className='mb-5'>
                <label
                  htmlFor='surname'
                  className='mb-3 block text-base font-medium text-[#07074D]'
                >
                  📜 Apellidos
                </label>
                <input
                  required
                  onChange={(e) => handle(e)}
                  type='text'
                  id='apellidos'
                  value={data.apellidos}
                  placeholder='Apellidos'
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
                    required
                    type='radio'
                    id='genero'
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
                    required
                    type='radio'
                    id='genero'
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
                  required
                  onChange={(e) => handle(e)}
                  type='date'
                  id='nacimiento'
                  value={data.nacimiento}
                  className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-gray-400'
                />
              </div>

              {/* Correo Electronico */}
              <div className='mb-5'>
                <label htmlFor='email' className='mb-3 block text-base font-medium text-[#07074D]'>
                  Correo Electrónico
                </label>
                <input
                  required
                  onChange={(e) => handle(e)}
                  type='email'
                  id='correo'
                  value={data.correo}
                  placeholder='correo@necodex.com'
                  className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
                />
              </div>

              {/* Telefono */}
              <div className='mb-5'>
                <label htmlFor='phone' className='mb-3 block text-base font-medium text-[#07074D]'>
                  📞 Numero de teléfono
                </label>
                <input
                  required
                  onChange={(e) => handle(e)}
                  type='number'
                  id='telefono'
                  maxLength='10'
                  value={data.telefono}
                  placeholder='6621641978'
                  className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium placeholder-gray-400 text-teal-600'
                />
              </div>

              {/* CLABE */}
              <div className='mb-5'>
                <label htmlFor='clabe' className='mb-3 block text-base font-medium text-[#07074D]'>
                  🏧 CLABE interbancaria
                </label>
                <input
                  onChange={(e) => handle(e)}
                  type='text'
                  id='clabe'
                  value={data.clabe}
                  placeholder='*Opcional'
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
                  required
                  onChange={(e) => handle(e)}
                  id='horario'
                  defaultValue='Default'
                  className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-gray-400'
                >
                  <option disabled value='Default'>
                    Selecciona tu horario
                  </option>
                  {horario.map((element) => {
                    return (
                      <option
                        key={element._id}
                        value={element._id}
                      >{`${element.entrada} - ${element.salida} `}</option>
                    );
                  })}
                </select>
              </div>

              {/* Submit Button*/}
              <div className='flex justify-center mt-8'>
                <button className='hover:shadow-form rounded-md bg-[#1e847f] py-3 px-8 text-base font-semibold text-white outline-none'>
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
