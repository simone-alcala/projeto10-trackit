import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import LoginHeader from '../LoginHeader';
import Loading from '../Loading';

function UserRegister(){
  const [userData, setUserData] = useState({});
  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState('Cadastrar');
  const navigate = useNavigate();

  async function registerUser(e){
    e.preventDefault();
    setDisable(true);
    setButtonText( <Loading size={50} /> );
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    try {
      await axios.post(URL,userData);
      navigate('/');
    } catch (error) {
      alert(`Erro ao cadastrar: \n\n${error}`);
      setDisable(false);
      setButtonText( 'Cadastrar' );
    }
   }

  return(
    <Container>
      <LoginHeader />
      
      <form onSubmit={registerUser}>
        <input type='email' placeholder='email' required value={userData.email} disabled={disable}
          onChange={ e => setUserData({...userData, email: e.target.value }) }/>
        <input type='password' placeholder='senha' required value={userData.password} disabled={disable}
          onChange={ e => setUserData({...userData, password: e.target.value }) }/>
        <input type='text' placeholder='nome' required value={userData.name} disabled={disable}
          onChange={ e => setUserData({...userData, name: e.target.value }) }/>
        <input type='url' placeholder='foto' required value={userData.image} disabled={disable}
          onChange={ e => setUserData({...userData, image: e.target.value }) }/>
        
        <button type='submit' disabled={disable} >{buttonText}</button>

        {disable ? 
          <div>Já tem uma conta? Faça login! </div> :
          <Link to={'/'}> <div>Já tem uma conta? Faça login! </div> </Link> }

      </form>
    </Container>
  );
}

const Container = styled.section`
	width: 100%;
	height: 100vh;
	background: #FFF;
  display: flex;
  align-items: center;
  flex-direction: column;

  form{
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  input {
    margin-bottom: 6px
  }

  button {
    width: var(--input-width);
    height: var(--input-height);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
    background-color: var(--button-color);
    border-radius: 5px;
    margin-bottom: 25px;
    font-size: 21px;
    border: none;
  }

  button:hover, div:hover{
    cursor: pointer;
  }

  div{
    color: var(--button-color);
    font-size: 14px;
    text-decoration: underline;
  }

`;

export default UserRegister;