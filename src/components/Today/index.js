import React,  { useEffect, useContext }  from 'react';
import axios from 'axios';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' 

import styled from 'styled-components';

import Header from '../Header';
import Footer from '../Footer';
import UserContext from '../../contexts/UserContext';

function Today(){

  const { token } = useContext(UserContext);
  const date = dayjs().locale('pt-br').format('dddd, DD/MM');
  const formatedDate = date[0].toUpperCase() + date.substring(1);

  useEffect(()=>{

    if (token.length>0) {
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
      const promise = axios.get(URL,CONFIG);
      promise.then((response)=>console.log(response.data));
      promise.catch((error)=>console.log(error.response));
    }
    
  },[token]);

  return (
    <>
      <Header/>
      <Container>

        <Title>{`${formatedDate}`}</Title>
        <Subtitle>Nenhum hábito concluído ainda</Subtitle>
     
      </Container>
      <Footer />
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
  color: var(--subtitle-color);
  margin-top: 10px;
`;

export default Today;