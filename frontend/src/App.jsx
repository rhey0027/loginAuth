import './App.css';
import Nav from './components/Nav';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return ( 
      <>
        <Nav />
        <ToastContainer />
        <div> 
        <Container>
            <Outlet />
        </Container>
        </div>
      </>
  )
}
export default App;