import Header from './../Header';
import Footer from './../Footer';
import Percentage from './../Percentage'

import styled from 'styled-components';

function History(){
  
  return (
    <>
      <Header/>
      <Container>
      <Title>Histórico</Title>
      <Subtitle>Em breve você poderá ver o histórico dos seus hábitos aqui!</Subtitle>
      </Container>
      <Footer />
      <Percentage />
    </>
  );
}

const Container = styled.section`
	width: 100%;
	height: calc(100vh-100px);
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 100px 0;
`;

const Title = styled.p `
  width: var(--default-width);
  font-size: 23px;
  color: var(--header-color);
`;

const Subtitle = styled.p `
  width: var(--default-width);
  font-size: 18px;
  color: var(--text-color);
  margin-top: 10px;
  margin-bottom: 28px;
`;

export default History;