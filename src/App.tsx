import './App.css';
import Navi from './layouts/Navi/Navi';
import RouteDefinitions from './components/Routes/RouteDefinitions';
import Footer from './layouts/Footer/Footer';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />
      <Navi />
      <RouteDefinitions />
      <Footer />
    </>
  );
}

export default App;
