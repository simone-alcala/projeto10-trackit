import axios from 'axios';
import { useState ,useEffect ,useContext} from 'react';

import styled from 'styled-components';
import UserContext from '../../contexts/UserContext';

import Header from './../Header';
import Footer from './../Footer';
import Habit from './../Habit';
import NewHabit from './../NewHabit';
import Percentage from './../Percentage'

function Habits(){

  const [habits, setHabits] = useState({enableNewHabit: false, enableAddHabit: true});
  const [habitsList, setHabitsList] = useState([]);
  const { token } = useContext(UserContext);
  
  useEffect(()=>{ if (token.length > 0) getList(token) } , [token]);
  
  function loadList(loading){
    if (loading.load) getList(token);
    if (!loading.delete) setHabits({...{enableNewHabit: false, enableAddHabit: true}});
  }

  function newHabit(){
    setHabits({...{enableNewHabit: true, enableAddHabit: false}});
  }

  function getList(token){
    const CONFIG =  { headers: { Authorization: `Bearer ${token}` } };
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const promise = axios.get(URL,CONFIG);     
    promise.then((response)=> {
      setHabitsList([...response.data]) ;
    });         
    promise.catch((error)=> alert(`Erro ao carregar hábitos: \n\n${error.response.status} - ${error.response.data.message}`));
  }

  return (
    <>
      <Header />
      <Container>
        <Title> <P>Meus hábitos</P> <Add onClick={newHabit} disabled={habits.enableAddHabit}>+</Add> </Title>

        {habits.enableNewHabit && <NewHabit loadList={loadList} updateButtons={setHabits}/> }

        {habitsList.length > 0 ?
          habitsList.map((habit,index) => <Habit key={index} loadList={loadList} habit={habit} /> )
        : <NoHabit>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabit>  }
      </Container>
      <Footer />
      <Percentage habitsList={habitsList}/>
    </>
  );

}

const Container = styled.section`
	width: var(--default-width);
	height: calc(100vh-100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px auto;
`;

const Title = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p `
  font-size: 23px;
  color: var(--header-color);
`;

const Add = styled.div`
  width: 40px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--button-color);
  border-radius: 5px;
  color: #FFF;
  cursor:pointer;
  
`;

const NoHabit = styled.div`
  color: var(--text-color);
  font-size: 18px;
  margin-top: 29px;
  line-height: 22px;
`;

export default Habits;
