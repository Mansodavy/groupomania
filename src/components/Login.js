import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from '../images/icongroupomanianoir.png';
import Footer from '../View/Footer';
import AuthService from "../Middleware/authservice";


const Login = () => {
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
  let path = `/Inscription`; 
  navigate(path);
    }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  const userHasAuthenticated = null;
  let token = null
  const Auth = async (e) => {

    e.preventDefault();
    try {
    const { data } = await axios.post("http://localhost:5000/api/auth/signin", {
        email: email,
        password: password,
      })      
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          navigate("/Dashboard");
          window.location.reload();
        }
        return response.data;
      
      });
    } catch (error) {
      if (error.responsecode == 404) {
        alert("Utilisateur Inconnu");
      }
    }
  };
  const user = AuthService.getCurrentUser();
  if (user) {
    navigate("/Dashboard");
  } 
  
  return (
    <section className="hero has-background-grey-light is-fullheight is-mobile">
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
                  
                                                      
                  <button className="button is-info is-fullwidth" onClick={routeChange}>
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
