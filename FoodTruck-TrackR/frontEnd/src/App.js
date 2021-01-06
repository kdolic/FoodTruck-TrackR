import './App.css';
import Home from './components/Home';
import Login from './components/Login'
import RegisterForm from './components/RegisterForm'
import {
  Container,
} from '@material-ui/core/';

function App() {
  return (
    <Container maxWidth='md'>
      <Home />
      <RegisterForm />
      <Login />
    </Container>
  );
}

export default App;
