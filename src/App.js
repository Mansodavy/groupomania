import './App.css';
import Login from './components/Login';
import Register from './components/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Dashboard from './View/Dashboard';
import Profil from './components/Profil';
import Post from './components/Post';
import CreatePosts from './components/CreatePosts';
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
          <Route path="/CreatePost" element={<CreatePosts/>} />
          <Route path="/Posts/:id" element={ <Post/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
