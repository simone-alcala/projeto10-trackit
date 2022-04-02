import { Link } from 'react-router-dom';
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

import styled from 'styled-components';

function Footer(props){
  
  const { percentage } = props ;
  
  return (
    <Container>
      <div>
        <Link to='/habitos'><p>Hábitos</p></Link>
        <Link to='/hoje'>
          <Today> 
            <CircularProgressbar
              value = { percentage===undefined ? 66 : percentage }
              text = {'Hoje'}
              background
              backgroundPadding = {8}
              styles = { buildStyles ( {
                backgroundColor: '#52B6FF',
                textColor: '#FFFFFF',
                pathColor: '#FFFFFF',
                trailColor: 'transparent'
              })}
            /> 
          </Today>
        </Link>
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
  max-width: 91px;
  max-height: 91px;
  bottom: 20px;
  position: absolute;
  border-radius: 50%;
  cursor: pointer;
`;

export default Footer;