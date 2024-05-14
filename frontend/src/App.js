import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cadastrar from './componentes/Usuario/Cadastrar.js';
import { AuthProvider } from './utils/AuthContext';
import { PrivateRoute } from './utils/PrivateRoute.js';
function App() {
  return (
    
   <AuthProvider>
      <Routes>
        <Route path='/cadastrar' element={<PrivateRoute><Cadastrar/></PrivateRoute>}/>
      </Routes>
   </AuthProvider>
  );
}


export default App;
