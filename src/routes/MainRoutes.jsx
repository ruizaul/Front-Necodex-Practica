import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Agregar, Editar, Detalles, Page404 } from '../pages';

export const MainRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agregar' element={<Agregar />} />
          <Route path='/editar' element={<Editar />} />
          <Route path='/detalles' element={<Detalles />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
    </>
  );
};
