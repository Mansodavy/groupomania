import '../components/App.css';
import Login from './Login';
import Register from './Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'
import Dashboard from './Dashboard';
import Profil from './Profil';
// HERE FOR ROUTING WE HAVE TO DEFINE PATHS SO 
// THROUGH REACT-ROUTER WE CAN ROUTE AND GIVE THE PATH TO INDIVIDUAL COMPONENTS

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/Connexion" element={<Login/>}/>
          <Route path="/Inscription" element={<Register/>}/>
          <Route path="/Accueil" element={<Home/>} />
          <Route path="/Dashboard" element={<Dashboard/>} />
          <Route path="/Profil" element={<Profil/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
