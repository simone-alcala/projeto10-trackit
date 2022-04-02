import React,  { useEffect, useContext ,useState }  from 'react';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';

function Percentage({habitsList}){
  const { token, setPercentage } = useContext(UserContext);
   useEffect( ()=> { 
    if (token.length > 0) {
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
      const promise = axios.get(URL,CONFIG);
      promise.then((response)=> {
        const habits = response.data;
        const total = habits.length;
        const done = (habits.filter((habit) => habit.done)).length;
        setPercentage (  (total === 0 ? 0 : Math.round((done/total)*100) ));   
      });
      promise.catch((error)=> 
        alert(`Erro ao carregar porcentagem: \n\n${error.response.status} - ${error.response.data.message}`));
    }
  } , [habitsList] );
  
  return <>  </>;
}

export default Percentage;