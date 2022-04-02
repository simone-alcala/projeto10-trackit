import React,  { useEffect, useContext ,useState }  from 'react';
import axios from 'axios';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' 

import styled from 'styled-components';

import Header from './../Header';
import Footer from './../Footer';
import HabitToday from './../HabitToday';
import UserContext from '../../contexts/UserContext';
import Percentage from './../Percentage'

function Today(){

  const { token, percentage } = useContext(UserContext);
  const date = dayjs().locale('pt-br').format('dddd, DD/MM');
  const formatedDate = date[0].toUpperCase() + date.substring(1);
  const [habitsList, setHabitsList] = useState([]);
  
  useEffect( ()=> { if (token.length > 0) getList(token) } , [token] );
  
  function loadList(load){
    if (load) getList(token);
  }

  function getList(token){
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
    const promise = axios.get(URL,CONFIG);

    promise.then((response)=> {
      setHabitsList([...response.data]) ;
    });
      
    promise.catch((error)=> 
      alert(`Erro ao carregar lista: \n\n${error.response.status} - ${error.response.data.message}`));
  }   
   
  return (
    <>
      <Header/>
      <Container>

        <Title>{`${formatedDate}`}</Title>
        {percentage > 0 ?
          <Subtitle done={true}>{percentage}% dos hábitos concluídos</Subtitle>
        : <Subtitle done={false}>Nenhum hábito concluído ainda</Subtitle>
        }
        
        {habitsList.length > 0 &&
          habitsList.map((habitInfo,index)=><HabitToday key={index} habitInfo={habitInfo} load={loadList}/>)}
      </Container>
      <Footer />

      <Percentage habitsList={habitsList}/>

    </>
  );
}

const Container = styled.section`
	width: 100%;
	height: calc(100vh-100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px 0;
`;

const Title = styled.p `
  width: var(--default-width);
  font-size: 23px;
  color: var(--header-color);
`;

const Subtitle = styled.p `
  width: var(--default-width);
  font-size: 18px;
  color: ${props => props.done ? '#8FC549' :'#bababa'} ;//var(--subtitle-color);
  margin-top: 10px;
  margin-bottom: 28px;
`;

export default Today;