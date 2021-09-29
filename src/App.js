import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Landing from './Landing';
import {BrowserRouter} from 'react-router-dom'


function App() {
  return (
  <BrowserRouter>

   <Landing/>
  </BrowserRouter>
  
  );
}

export default App;
