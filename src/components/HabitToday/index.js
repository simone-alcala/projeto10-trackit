import axios from 'axios';
import React,  { useContext ,useState }  from 'react';

import UserContext from '../../contexts/UserContext';

import styled from 'styled-components';

function HabitToday(props){
  const { habitInfo, load } = props;

  const {id, name, done:habitDone} = habitInfo;

  const currentSequence = habitInfo.currentSequence > 1 ? 
    `${habitInfo.currentSequence} dias` : `${habitInfo.currentSequence} dia`;
  const highestSequence = habitInfo.highestSequence > 1 ? 
    `${habitInfo.highestSequence} dias` : `${habitInfo.highestSequence} dia`;  

  const { token } = useContext(UserContext);
  const [done, setDone] = useState(habitDone);

  function handleDone(){
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    let URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/`;

    done ? URL += 'uncheck' : URL += 'check';
    
    const promise = axios.post(URL,null,CONFIG);

    promise.then( ()=> {
      load(true);
      setDone(!done);
    });
    promise.catch((error)=> alert(`Erro ao atualizar hábito: \n\n${error.response.status}`)) ;

  }   
    
  

  return(
    <Container>
      <div>
        <Name>{name}</Name>
        <Other>Sequência atual: <Span done={done}>{currentSequence} </Span></Other>
        <Other>Seu recorde: <Span done={done}>{highestSequence}</Span></Other>
      </div>
      <Icon onClick={handleDone} done={done}><ion-icon name="checkmark-outline"></ion-icon></Icon>   
    </Container>
  );
}

const Container = styled.section`
	width: var(--default-width);
	height: 94px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 14px;
  background-color: #fff;
  border-radius: 5px;
  color: var(--text-color);
 `;

const Span = styled.span`
  color: ${props => props.done ? '#8FC549' :  '#666666'};
`;

const Name = styled.div`
  width: 225px;
  font-size: 20px;
  margin-bottom: 9px;
`;

const Other = styled.div`
  width: 225px;
  font-size: 13px;
  margin-top: 3px;
`;

const Icon = styled.div`
  width: 69px;
  height: 69px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => props.done ? '#8FC549' :  '#EBEBEB'};
  color: #fff;
  cursor:pointer;

  ion-icon{
    font-size: 40px;
    --ionicon-stroke-width: 75px;
  }
`;

export default HabitToday;
