import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from './../../contexts/UserContext';
import Login from './../Login';
import UserRegister from './../UserRegister';
import Habits from './../Habits';
import Today from './../Today';


function App(){
  
  const [token, setToken] = useState([]);
  const [avatar, setAvatar] = useState([]);

  return(
    <BrowserRouter>

      <UserContext.Provider value={ {token,setToken,avatar,setAvatar} } >

        <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/cadastro' element={ <UserRegister /> } />      
            <Route path='/habitos' element={ <Habits /> } />      
            <Route path='/hoje' element={ <Today /> } />  
        </Routes>

      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;