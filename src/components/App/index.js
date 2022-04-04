import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import UserContext from './../../contexts/UserContext';
import NonSavedHabitContext from './../../contexts/NonSavedHabitContext';

import Login from './../Login';
import UserRegister from './../UserRegister';
import Habits from './../Habits';
import Today from './../Today';
import History from './../History';

function App(){
  
  const [token, setToken] = useState( getToken );
  const [avatar, setAvatar] = useState([]);
  const [habits, setHabits] = useState([]);
  const [percentage, setPercentage] = useState([]);

  const [nonSaved, setNonSaved] = useState({name:'', days:[], clicked:{} });

  function getToken (){
    const localToken = localStorage.getItem('tokenSimone');
    
    console.log(localToken);
    
    if ( localToken !== undefined && localToken !== null && localToken !== '') {
      return localStorage.getItem('tokenSimone') ;
    } else {
      return '';
    }

  }

  return(
    <BrowserRouter>
      <UserContext.Provider value={{token,setToken,avatar,setAvatar,habits,setHabits,percentage, setPercentage} } >
        <NonSavedHabitContext.Provider value={ {nonSaved, setNonSaved} } >       
          <Routes>
              <Route path='/' element={ <Login /> } />
              <Route path='/cadastro' element={ <UserRegister /> } /> 
              <Route path='/habitos' element={ <Habits /> } />               
              <Route path='/hoje' element={ <Today /> } />  
              <Route path='/historico' element={ <History /> } />  
          </Routes>
        </NonSavedHabitContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;