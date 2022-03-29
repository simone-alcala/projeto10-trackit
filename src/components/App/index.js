import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './../Login';
import UserRegister from './../UserRegister';
import Habits from './../Habits';

function App(){
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/cadastro' element={ <UserRegister /> } />      
          <Route path='/habitos' element={ <Habits /> } />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;