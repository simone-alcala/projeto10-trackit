import { useContext }  from 'react';

import UserContext from '../../contexts/UserContext';

import styled from 'styled-components';

function HabitsHeader(){
  const { avatar } = useContext(UserContext);
  return (
    <Container imgSrc>
      <div>
        TrackIt
        <img src={avatar} alt='user' />
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
  background-color: var(--header-color);
  position: fixed;
  z-index: 1;
  top: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

  div{
    width: var(--default-width);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFF;
    font-family: 'Playball';
    font-size: 39px;

    img{
      width: 51px;
      height: 51px;
      border-radius: 98.5px;
    }
  }

`;

export default HabitsHeader;