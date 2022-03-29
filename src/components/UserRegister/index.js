import React from 'react';
import styled from 'styled-components';

import LoginHeader from '../LoginHeader';

function UserRegister(){
  return(
    <Container>
      <LoginHeader />
      
      <form>
        <input type='email' placeholder='email' required />
        <input type='password' placeholder='senha' required />
        <input type='text' placeholder='nome' required />
        <input type='file' placeholder='foto' required />
        <button type='submit' >Cadastrar</button>
        <div>Já tem uma conta? Faça login! </div>
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