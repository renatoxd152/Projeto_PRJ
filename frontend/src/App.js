import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Cadastrar } from './componentes/Usuario/Cadastrar.js';

import { BrowserRouter } from 'react-router-dom';
import { Compras } from './componentes/Compras/Compras.js';
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/cadastrar' element={<Cadastrar/>}/>
        <Route path='/compras' element={<Compras/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
