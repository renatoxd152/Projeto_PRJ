import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PrivateRoute } from '../src/utils/PrivateRoute.js';
import './App.css';
import { CadastrarCliente } from './componentes/Clientes/CadastrarCliente.js';
import { ListarClientes } from './componentes/Clientes/ListarClientes.js';
import { CadastrarCompra } from './componentes/Compras/CadastrarCompras.js';
import { Compras } from './componentes/Compras/Compras.js';
import { ListarProdutos } from './componentes/Produtos/ListarProdutos.js';
import { Produtos } from './componentes/Produtos/Produtos.js';
import { Cadastrar } from './componentes/Usuario/Cadastrar.js';
import { AuthProvider } from './utils/AuthContext.js';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Cadastrar/>}/>
          <Route path='/compras' element={<PrivateRoute><Compras/></PrivateRoute>}/>
          <Route path='/cadastrarCompras' element={<CadastrarCompra/>}/>
          <Route path='/cadastrarProduto' element={<PrivateRoute><Produtos/></PrivateRoute>}/>
          <Route path='/listarProdutos' element={<PrivateRoute><ListarProdutos/></PrivateRoute>}/>
          <Route path='/cadastrarCliente' element={<CadastrarCliente/>}/>
          <Route path='/listarClientes' element={<ListarClientes/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  
  );
}


export default App;
