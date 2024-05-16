import { Route, Routes } from 'react-router-dom';
import './App.css';
import {Cadastrar} from './componentes/Usuario/Cadastrar.js';

import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/cadastrar' element={<Cadastrar/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
