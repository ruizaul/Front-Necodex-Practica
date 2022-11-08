import axios from 'axios';

export const getDesactivar = async (value, status, getData) => {
  const stat = status ? false : true;

  await axios
    .put(`https://backend-practica-necodex.vercel.app/api/practicantes/${value}`, {
      status: stat,
    })
    .then(() => {
      return getData();
    });
};
