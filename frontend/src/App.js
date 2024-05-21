import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { CadastrarCliente } from './componentes/Clientes/CadastrarCliente.js';
import { ListarClientes } from './componentes/Clientes/ListarClientes.js';
import { CadastrarCompra } from './componentes/Compras/CadastrarCompras.js';
import { Compras } from './componentes/Compras/Compras.js';
import { ListarProdutos } from './componentes/Produtos/ListarProdutos.js';
import { Produtos } from './componentes/Produtos/Produtos.js';
import { Cadastrar } from './componentes/Usuario/Cadastrar.js';
function App() {
  return (
  
    <BrowserRouter>
      <Routes>
        <Route path='/cadastrar' element={<Cadastrar/>}/>
        <Route path='/compras' element={<Compras/>}/>
        <Route path='/cadastrarCompras' element={<CadastrarCompra/>}/>
        <Route path='/cadastrarProduto' element={<Produtos/>}/>
        <Route path='/listarProdutos' element={<ListarProdutos/>}/>
        <Route path='/cadastrarCliente' element={<CadastrarCliente/>}/>
        <Route path='/listarClientes' element={<ListarClientes/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}


export default App;
