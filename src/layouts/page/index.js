import Header from "../../components/navigation/header";
import Container from 'react-bootstrap/Container';
import "./page.css";

const Page = (props) => {
  return (
    <>
      <Header />
      <Container className='mt-5'>
      { props.content }
      </Container>
    </>
  );
}

export default Page;
