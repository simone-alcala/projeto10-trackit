import React from 'react';
import styled from 'styled-components';

import Logo from './../../assets/logo.png'

function LoginHeader(){
  return(
    <Container>
      <img src={Logo} alt='logo' />
      <p>TrackIt</p>
    </Container>
  );
}

const Container = styled.section`
	width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  p{
    font-family: 'Playball';
    font-style: normal;
    font-weight: 400;
    font-size: 70px;
    text-align: center;
    color: var(--header-color);
    margin-bottom: 35px;
  }

  img {
    width: 180px;
    margin-top: 68px
  }
`;

export default LoginHeader;