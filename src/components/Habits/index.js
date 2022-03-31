import styled from 'styled-components';

import Header from './../Header';
import Footer from './../Footer';

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
 
`;

export default Habits;
