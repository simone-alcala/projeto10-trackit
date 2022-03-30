import axios from 'axios';
import React,  { useState }  from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import LoginHeader from '../LoginHeader';
import Loading from '../Loading';

function Login(){

  const [userData, setUserData] = useState({email:'',password:''});
  const [disable, setDisable] = useState(false);

  const [buttonText, setButtonText] = useState('Entrar');

  const navigate = useNavigate();

  function login(e){
    e.preventDefault();
    //setDisable(true);
    //setButtonText( <Loading size={50} /> );
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
    const promise = axios.post(URL,null);
    
    promise.then((promise)=>console.log(promise));

    promise.catch((error)=>{
      
      console.log(error);
    });
    
    /*try {
      const promise = await axios.post(URL,userData);
      //navigate('/hoje');
      console.log(promise.data);
    } catch (error) {
      alert(`Erro no login: \n\n${error}`);
      setDisable(false);
      setButtonText( 'Entrar' );
    }*/
   }
    
  return(
    <Container>
      <LoginHeader />
    
      <form onSubmit={login}>
        <input type='email' placeholder='email' required value={userData.email} disabled={disable}
                  onChange={ e => setUserData({...userData, email: e.target.value }) }/>
        <input type='password' placeholder='senha' required value={userData.password} 
          onChange={ e => setUserData({...userData, password: e.target.value }) }/>
        
        <button type='submit'> {buttonText}  </button>
        
        {disable ? 
          <div>Não tem uma conta? Cadastre-se! </div> :
          <Link to={'/cadastro'}> <div>Não tem uma conta? Cadastre-se! </div>  </Link>}

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

export default Login;