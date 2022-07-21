import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../images/icongroupomanianoir.png';
import Footer from '../View/Footer';
import AuthService from "../Middleware/authservice";
import swal from 'sweetalert';
const API_URL = 'http://localhost:5000/api/';


const Login = () => {
    let navigate = useNavigate(); 
    
  // Fonction routeChange qui permet la redirection vers la page d'inscription
  // Function routeChange that allows the redirection to the registration page
    const routeChange = () =>{ 
  let path = `/Inscription`; 
  navigate(path);
    }
   // On définit le state pour stocker les données du formulaire
  // we define the state to store the data of the form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const userHasAuthenticated = null;
  let token = null


  const Auth = async (e) => {
   // On vérifie le formulaire avant de lancer la requête
  // wait for the form to be valid before sending the request
    if (email === "") {
      swal("Erreur !", "Merci de remplir le champ de l'email", "error")
    }
    if (password === "") {
      swal("Erreur !", "Merci de remplir le champ du mot de passe", "error")
    }
    e.preventDefault();
    try {
      if (password === "" && email === "") {
        swal("Erreur !", "Merci de remplir les champs", "error")
      } else{
    const { data } = await axios.post(API_URL +"auth/signin", {
        email: email,
        password: password,
      })      
      .then(response => {
        if (response.data.token) {
          // Sauvegarde de l'user dans le localStorage avec le token
          // Save the user in the localStorage with the token
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/Dashboard");
          window.location.reload();
        }
      
      });}
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  // Si l'utilisateur est connecté, on le redirige vers la page Dashboard
  // If the user is connected, we redirect him to the Dashboard page
  const user = AuthService.getCurrentUser();
  if (user) {
    navigate("/Dashboard");
  } 
  // Rendu du composant Login
  // Render of the Login component
  return (
    <section className="hero has-background-grey-lighter is-fullheight is-mobile">
      <nav className="navbar ml-auto mr-auto" role="navigation" aria-label="main navigation">
      </nav>
          <div className="columns is-centered is-mobile">
                                    
            <div className="column is-4-desktop is-9-mobile ">
              <form className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                                                      
                  <label className="label">Email</label>
                  <div className="controls">
                                                            
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                                                      
                  <label className="label">Mot de passe</label>
                                                      
                  <div className="controls">
                    <input
                      type="password"
                      className="input"
                      placeholder="******"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                                                        
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link is-fullwidth" onClick={Auth}>
                    Connexion
                  </button>
                  
                                                      
                  <button className="button is-link is-fullwidth" onClick={routeChange}>
                    Inscription
                  </button>
                </div>
                
                                                            
                
              </form>
                                      
            </div>
                                
          </div>
                          
                    
              
    <footer>
        <Footer/>
    </footer>
    </section>
  );
};
export default Login;
