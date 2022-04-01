import axios from 'axios';
import { useState , useContext, useEffect} from 'react';

import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

function Habit(props){
  
  const {id, adding, name, days:daysAPI } = props;

  const { token } = useContext(UserContext);

  const [habit, setHabit] = useState('');
  const [days, setDays] = useState([]);
  const [idHabit, setIdHabit] = useState(0);
  const [deleted, setDeleted] = useState(false);

  const [clicked,setClicked] = useState({0:false,1:false,2:false,3:false,4:false,5:false,6:false});

  const [creating, setCreating] = useState(adding);

  useEffect(()=>{
    if (name !== null || name!== undefined  ) {
      setIdHabit(id);
      setHabit(name);
      for (let day of daysAPI){
        setClicked({...clicked,[day]:true});
      }
    }
  },[]);

  function toggleDays(day,weekDay){
    if (days.includes(day)){
      setDays(days.filter((d) => d!==day));
      setClicked({...clicked,[day]:false});
    } else {
      setDays([...days,day]);
      setClicked({...clicked,[day]:true});
    }
  }

  function createHabit(e){
    e.preventDefault();

    if (days.length === 0) {
      alert('Selecione pelo menos um dia da semana!');
      return;
    }

    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const BODY = {name: habit, days: days};
    const promise = axios.post(URL,BODY,CONFIG);
    promise.then((response)=>{
      setCreating(false);
      setIdHabit(response.data.id);
    });
    promise.catch((error)=> alert(`Erro na inclusão: \n\n${error.response.status} - ${error.response.data.message}`));
  }

  function deleteHabit(e){
    e.preventDefault();

    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${idHabit}`;
    const promise = axios.delete(URL,CONFIG);
    promise.then((response)=>{
      alert('deu bom');
      console.log(response);
      setDeleted(true);
    });
    promise.catch((error)=> alert(`Erro na exclusão: \n\n${error.response.status} - ${error.response.data.message}`));
  }
  
  return !deleted && (
    <Container key={id} creating={creating} >
      { creating ? 
        <form onSubmit={createHabit} >
          <input type='text' placeholder='nome do hábito' required value={habit} 
            onChange={(e)=>setHabit(e.target.value)}/>
          <Week>
            <Day clicked={clicked[0]} onClick={()=> toggleDays(0,'sun')}> D </Day>
            <Day clicked={clicked[1]} onClick={()=> toggleDays(1,'mon')}> S </Day>
            <Day clicked={clicked[2]} onClick={()=> toggleDays(2,'tue')}> T </Day>
            <Day clicked={clicked[3]} onClick={()=> toggleDays(3,'wed')}> Q </Day>
            <Day clicked={clicked[4]} onClick={()=> toggleDays(4,'thu')}> Q </Day>
            <Day clicked={clicked[5]} onClick={()=> toggleDays(5,'fri')}> S </Day>
            <Day clicked={clicked[6]} onClick={()=> toggleDays(6,'sat')}> S </Day>
          </Week>
          <Buttons>
            <Cancel type='reset'>Cancelar</Cancel>
            <Save type='submit'>Salvar</Save>
          </Buttons>
        </form> 
      : <form onSubmit={deleteHabit}>
          <p>{habit}</p>
          <input type='hidden' value={idHabit} />
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
      }         
    </Container>         
  );
}

const Container = styled.section`
	width: var(--default-width);
	height: ${ props => props.creating ? 180 : 91 }px;
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

const Cancel = styled.button`
  height: 35px;
  background: #fff;
  color: var(--button-color);
  border-radius: 5px;
  margin-right: 15px;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Save = styled.button`
  width: 84px;
  height: 35px;
  background: var(--button-color);
  border-radius: 5px;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
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
