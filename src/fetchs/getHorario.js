import axios from 'axios';

export const getHorario = async (state) => {
  const peticion = await axios.get('https://backend-practica-necodex.vercel.app/api/horarios/');

  state(peticion.data.horarios, []);
};
