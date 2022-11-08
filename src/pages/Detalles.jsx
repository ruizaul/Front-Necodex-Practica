import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { classNames } from '../helpers/Utils';
import { getDesactivar } from '../fetchs/getDesactivar';
import Swal from 'sweetalert2';
import moment from 'moment';

export const Detalles = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const value = state.uid;

  const status = state.status ? 'activo' : 'inactivo';

  const parseDate = moment(state.nacimiento).utc().format('YYYY-MM-DD');

  const data = {
    uid: value,
    nombre: state.nombre,
    apellidos: state.apellidos,
    genero: state.genero,
    correo: state.correo,
    nacimiento: parseDate,
    telefono: state.telefono,
    clabe: state.clabe,
    horario: state.horario,
  };

  return (
    <>
      {/* Back Button */}
      <button
        className='flex items-center justify-center mt-10 mx-10 mb-10 text-white  focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center mr-2 dark:bg-[#1a1a1a] dark:hover:bg-[#1e847f]'
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
      {/* Boton editar */}
      <div
        className='flex items-center justify-center cursor-pointer'
        title='Agregar Practicante'
        onClick={() => {
          navigate('/editar', { state: data });
        }}
      >
        <button className='mb-4 ml-2 -mt-28 bg-[#1E847F] hover:bg-[#1E847F]/80 text-white font-bold py-2 px-4 border-b-4 border-teal-800 hover:border-teal-900 rounded'>
          Editar Practicante
        </button>
      </div>

      {/* Boton desactivar */}
      <div
        className='flex items-center justify-center cursor-pointer'
        title='Agregar Practicante'
        onClick={() => {
          Swal.fire({
            title: 'Estas seguro?',
            text: 'Se cambiara el estado de este practicante.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1e847f',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cambiar estado!',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              getDesactivar(value, status);
              Swal.fire({
                icon: 'success',
                showConfirmButton: false,
                title: 'Listo!',
                timer: 1200,
                text: 'El estado del practicante ha cambiado',
              });
              setTimeout(() => {
                navigate('/');
              }, 1200);
            }
          });
        }}
      >
        <button className='mb-2 -mt-8 bg-[#1E847F] hover:bg-[#1E847F]/80 text-white font-bold py-2 px-4 border-b-4 border-teal-800 hover:border-teal-900 rounded'>
          Activar / Desactivar Practicante
        </button>
      </div>

      {/* Titulo */}
      <h1 className='flex items-center justify-center -mb-10 mt-2 mx-10 font-large leading-tight text-4xl text-gray-300'>
        Detalles practicante
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
                disabled
                onChange={(e) => handle(e)}
                type='text'
                id='nombre'
                value={data.nombre}
                placeholder='Nombre(s)'
                className='w-full rounded-md border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>

            {/* Apellidos */}
            <div className='mb-5'>
              <label htmlFor='surname' className='mb-3 block text-base font-medium text-[#07074D]'>
                📜 Apellidos
              </label>
              <input
                disabled
                onChange={(e) => handle(e)}
                type='text'
                id='apellidos'
                value={data.apellidos}
                placeholder='Apellidos'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>

            {/* Genero */}
            <div className='mb-5'>
              <label htmlFor='email' className='mb-3 block text-base font-medium text-[#07074D]'>
                🚻 Género
              </label>

              <div className='flex items-center mb-4 ml-6'>
                <input
                  disabled
                  type='radio'
                  id='genero'
                  checked={data.genero === 'H'}
                  value={data.genero}
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
                  disabled
                  type='radio'
                  id='genero'
                  name='gender'
                  checked={data.genero === 'M'}
                  value={data.genero}
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
                disabled
                date={data.nacimiento}
                onChange={(e) => handle(e)}
                type='date'
                id='nacimiento'
                value={data.nacimiento}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>

            {/* Correo Electronico */}
            <div className='mb-5'>
              <label htmlFor='email' className='mb-3 block text-base font-medium text-[#07074D]'>
                Correo Electrónico
              </label>
              <input
                disabled
                onChange={(e) => handle(e)}
                type='email'
                id='correo'
                value={data.correo}
                placeholder='Opcional'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>

            {/* Telefono */}
            <div className='mb-5'>
              <label htmlFor='phone' className='mb-3 block text-base font-medium text-[#07074D]'>
                📞 Numero de teléfono
              </label>
              <input
                disabled
                onChange={(e) => handle(e)}
                type='number'
                id='telefono'
                value={data.telefono}
                placeholder='662 1231212'
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
              />
            </div>

            {/* CLABE */}
            <div className='mb-5'>
              <label htmlFor='clabe' className='mb-3 block text-base font-medium text-[#07074D]'>
                🏧 CLABE interbancaria
              </label>
              <input
                disabled
                onChange={(e) => handle(e)}
                type='text'
                id='clabe'
                value={data.clabe}
                placeholder={data.clabe}
                className='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
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
                disabled
                onChange={(e) => handle(e)}
                id='horario'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6A64F1] focus:border-[#6A64F1] block w-full p-2.5 dark:bg-gray-200 dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500'
              >
                <option disabled>Selecciona tu horario</option>
                <option>{`${state.horario.entrada} - ${state.horario.salida} `}</option>
              </select>
            </div>

            {/* activo */}
            <div className='mb-2'>
              <label className='mb-3 block text-base font-medium text-[#07074D]'>⚡ Estado</label>
              <span
                className={classNames(
                  'px-5 py-1 mx-28 uppercase leading-wide font-bold text-xs rounded-full shadow-sm',
                  state.status === true ? 'bg-green-700 text-white' : 'bg-yellow-700 text-white',
                  state.status === false ? 'bg-yellow-700 text-white' : 'bg-green-700 text-white'
                )}
              >
                {status}
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
