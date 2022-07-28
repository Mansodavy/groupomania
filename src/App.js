import "./App.css";
import Login from "./components/loginPage";
import React, { Component } from "react";
import Register from "./components/registerPage";
import AuthService from "./Middleware/authservice";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./View/Dashboard";
import Profil from "./components/profil";
import Post from "./components/onePost";
import PostEdit from "./components/editPost";
import CreatePosts from "./components/createPost";
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
    
    function Burger (props) {
      var burger = document.querySelector('.burger');
      var nav = document.querySelector('#'+burger.dataset.target);

      burger.addEventListener('click', function(){
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
      });
    } 
    const { currentUser, } = this.state;
    return (
      <div>
        <Router>
          <nav className="navbar is-transparent has-background-grey-lighter">
            <div className="navbar-brand ">
              {currentUser ? (
                <Link to={{ pathname: "/Dashboard" }} className="navbar-brand">
                  <img
                    className=".container-image ml-6 mr-5 mt-2"
                    width={150} height={100}
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
              <div className="navbar-end">
                <div className="navbar-item">
                    <div className="navbar-item ">
                    <div className="">

                        {currentUser ? (
                          
                          <div>
                                                      <div>
                          </div>
                            <p className="control">
                            <a className="navbar-item button is-warning mt-2 mr-3 ml-3 mb-3" href="/Profil">
                              Profil 
                            </a>
                            </p>
                            <a
                              className="navbar-item button is-black mr-3 ml-3 mb-3"
                              href="/Connexion"
                              onClick={this.logOut}
                            >
                              Déconnexion
                            </a>
                          </div>
                        ) : (
                          <div>
                            
                          </div>
                        )}
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
