import axios from 'axios';
import { useState , useContext} from 'react';

import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

import Loading from '../Loading';

function NewHabit(props){
  
  const {id, loadList } = props;

  const { token } = useContext(UserContext);

  const [habit, setHabit] = useState('');
  const [days, setDays] = useState([]);
  const [added, setAdded] = useState(false);
  const [cancel, setCancel] = useState(false);

  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState('Salvar');

  const [clicked,setClicked] = useState({0:false,1:false,2:false,3:false,4:false,5:false,6:false});

  function toggleDays(day){
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
    
    if (days.length === 0) return alert('Selecione pelo menos um dia da semana!') ;

    setDisable(true);
    setButtonText( <Loading size={40} /> );
    
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const BODY = {name: habit, days: days};
    const promise = axios.post(URL,BODY,CONFIG);
    promise.then((response)=>{
      loadList(true);
      setAdded(true);
    });
    promise.catch((error)=> { 
      setDisable(false);
      setButtonText( 'Salvar' );
      alert(`Erro na inclusão: \n\n${error.response.status} - ${error.response.data.message}`) });
  }

  function cancelHabit(e){
    setCancel(true);
  }
  
  return (!added && !cancel)  && (
    <Container key={id} >
      <form onSubmit={createHabit} >
        <input type='text' placeholder='nome do hábito' required value={habit} 
          onChange={(e)=>setHabit(e.target.value)} disabled={disable}/>
        <Week>
          <Day clicked={clicked[0]} onClick={()=> toggleDays(0)} disabled={disable}> D </Day>
          <Day clicked={clicked[1]} onClick={()=> toggleDays(1)} disabled={disable}> S </Day>
          <Day clicked={clicked[2]} onClick={()=> toggleDays(2)} disabled={disable}> T </Day>
          <Day clicked={clicked[3]} onClick={()=> toggleDays(3)} disabled={disable}> Q </Day>
          <Day clicked={clicked[4]} onClick={()=> toggleDays(4)} disabled={disable}> Q </Day>
          <Day clicked={clicked[5]} onClick={()=> toggleDays(5)} disabled={disable}> S </Day>
          <Day clicked={clicked[6]} onClick={()=> toggleDays(6)} disabled={disable}> S </Day>
        </Week>
        <Buttons>
          <Cancel onClick={cancelHabit} type='reset' disabled={disable}>Cancelar</Cancel>
          <Save type='submit' disabled={disable}>{buttonText}</Save>
        </Buttons>
      </form>    
    </Container>         
  );
}

const Container = styled.section`
	width: var(--default-width);
	height: 180px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--button-color);
  border-radius: 5px;
  color: #fff;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;


export default NewHabit;
