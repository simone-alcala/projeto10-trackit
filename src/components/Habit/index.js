import axios from 'axios';
import { useState , useContext, useEffect} from 'react';

import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

function Habit(props){
  
  const { habit, loadList } = props;
  const { token } = useContext(UserContext);
  const [clicked,setClicked] = useState({0:false,1:false,2:false,3:false,4:false,5:false,6:false});
  
  useEffect(()=>{
    if (habit.days!==undefined) 
      for(let day of habit.days) setClicked({...clicked,[day]:true});
  },[]);

  function deleteHabit(e){
    e.preventDefault();

    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm('Deseja realmente excluir?');
    if(confirmation){
      const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
      const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`;
      const promise = axios.delete(URL,CONFIG);
      promise.then((response)=> loadList(true) );
      promise.catch((error)=> alert(`Erro na exclusão: \n\n${error.response.status} - ${error.response.data.message}`));
    }
  }
  
  return (
    <Container key={habit.id} >
      <form onSubmit={deleteHabit}>
        <p>{habit.name}</p>
        <Week>
          <Day clicked={clicked[0]} > D </Day>
          <Day clicked={clicked[1]} > S </Day>
          <Day clicked={clicked[2]} > T </Day>
          <Day clicked={clicked[3]} > Q </Day>
          <Day clicked={clicked[4]} > Q </Day>
          <Day clicked={clicked[5]} > S </Day>
          <Day clicked={clicked[6]} > S </Day>
        </Week>
        <Buttons>
          <Delete type='submit'><ion-icon name="trash-outline"></ion-icon></Delete>
        </Buttons>
      </form> 

    </Container>         
  );
}

const Container = styled.section`
	width: var(--default-width);
	height: 91px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  margin-top: 20px;

  input{
    margin: 19px;
    font-size: 20px;
    color: var(--text-color);
  }

  p{
    margin: 13px 19px;
    font-size: 20px;
    color: var(--text-color);
  }

`;

const Week = styled.div`
  display: flex;
  margin-left: 19px;
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${ props => props.clicked ? '#DBDBDB' : '#FFF'} ;
  border: 1px solid #D5D5D5;
  border-radius: 5px;
  color: ${ props => props.clicked ? '#FFF' : '#DBDBDB'} ;
  margin-right: 4px;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 19px;
  position: relative;
`;

const Delete = styled.button`
  width: 35px;
  height: 35px;
  background: #FFF;
  border-radius: 5px;
  color: var(--text-color);
  border: none;
  font-size: 20px;
  cursor: pointer;
  bottom: 55px;
  right: -100px;
  position: absolute;
`;

export default Habit;
