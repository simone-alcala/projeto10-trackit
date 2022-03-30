import styled from 'styled-components';

import Header from './../HabitsHeader';
import Footer from './../HabitsFooter';

function Habits(){
  return (
    <Container>
      <Header />
      <div></div>
      <Footer />
    </Container>
  );
}

const Container = styled.section`
	width: 100%;
	height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  "Authorization"
`;

export default Habits;
