import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CadastrarCompra } from './componentes/Compras/CadastrarCompras.js';
import { Compras } from './componentes/Compras/Compras.js';
import { Cadastrar } from './componentes/Usuario/Cadastrar.js';
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/cadastrar' element={<Cadastrar/>}/>
        <Route path='/compras' element={<Compras/>}/>
        <Route path='/cadastrarCompras' element={<CadastrarCompra/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
