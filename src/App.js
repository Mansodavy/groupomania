import "./App.css";
import Login from "./components/Login";
import React, { Component } from "react";
import Register from "./components/Registrations";
import AuthService from "./Middleware/authservice";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./View/Dashboard";
import Profil from "./components/Profil";
import Post from "./components/Post";
import PostEdit from "./components/EditPost";
import CreatePosts from "./components/CreatePosts";
import logo from "./images/icongroupomanianoir.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    
    
    const { currentUser, } = this.state;
    return (
      <div>
        <Router>
          <nav className="navbar is-transparent has-background-grey-lighter">
            <div className="navbar-brand ">
              {currentUser ? (
                <Link to={{ pathname: "/Dashboard" }} className="navbar-brand">
                  <img
                    className=".container-image ml-5 mr-5 mt-2"
                    width={100} height={100}
                    src={logo}
                    alt="Logo Groupomania"
                  />
                </Link>
              ) : (
                <div>
                  <Link to={{ pathname: "/" }} className="navbar-brand">
                    <img
                      className=".container-image ml-5 mr-5 mt-2"
                      width={100} height={100}
                      src={logo}
                      alt="Logo Groupomania"
                    />
                  </Link>
                </div>
              )}



  
</div>

            <div  className="navbar-menu ">
              <div className="navbar-start"></div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <div className="navbar-item has-dropdown is-hoverable ">
                      <a className="navbar-link mr-6">Menu</a>
                      <div className="navbar-dropdown is-boxed mr-10">
                        {currentUser && (
                          <div>
                            <a
                              className="navbar-item"
                              href="http://localhost:3000/Dashboard"
                            >
                              Liste des postes
                            </a>

                            <a
                              className="navbar-item"
                              href="http://localhost:3000/CreatePost"
                            >
                              Crée un post
                            </a>
                          </div>
                        )}
                        {currentUser ? (
                          <div>
                            <a className="navbar-item" href="/Profil">
                              Profil 
                            </a>
                            <a
                              className="navbar-item"
                              href="/Connexion"
                              onClick={this.logOut}
                            >
                              Déconnexion
                            </a>
                          </div>
                        ) : (
                          <div>
                            <a
                              className="navbar-item"
                              href="http://localhost:3000/Connexion"
                            >
                              Connexion
                            </a>
                            <a
                              className="navbar-item"
                              href="http://localhost:3000/Inscription"
                            >
                              Inscription
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Connexion" element={<Login />} />
            <Route path="/Inscription" element={<Register />} />
            <Route path="/Profil" element={<Profil />} />
            <Route path="/CreatePost" element={<CreatePosts />} />
            <Route path="/Posts/:id" element={<Post />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Posts/edit/:id" element={<PostEdit />} />
          </Routes>
        </Router>
      </div>
    );
  }
}
export default App;
