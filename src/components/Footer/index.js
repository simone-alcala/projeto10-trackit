import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer(){
  return (
    <Container>
      <div>
        <Link to='/habitos'><p>Hábitos</p></Link>
        <Today> Hoje </Today>
        <Link to='/historico'><p>Histórico</p></Link>
      </div>
    </Container>
  );
}

const Container = styled.section`
	width: 100%;
	height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  position: fixed;
  z-index: 1;
  bottom: 0;

  div{
    width: var(--default-width);
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    color: var( --button-color);
    position: relative;
  }
  
  a{
    color: var( --button-color);
  }

  p:hover{
    cursor: pointer;
  }

`;

const Today = styled.div`
  max-width: 71px;
  max-height: 91px;
  bottom: 15px;
  position: absolute;
  background: var( --button-color);
  border-radius: 50%;
  color: #FFF;
`;

export default Footer;