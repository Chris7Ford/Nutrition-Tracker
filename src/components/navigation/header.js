import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Create Food</Nav.Link>
          <Nav.Link href="#features">Create Meal</Nav.Link>
          <Nav.Link href="#pricing">Meal Plan Subscription</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
