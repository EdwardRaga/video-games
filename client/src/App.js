import './App.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     <NavBar/>
     <Route path={"/home"} component={Home}/>
     
    </div>
  );
}

export default App;
