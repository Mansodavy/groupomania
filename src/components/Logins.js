import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import logo from '../images/icongroupomanianoir.png';
import { useNavigate, Link } from "react-router-dom";
import Footer from '../View/Footer';
import AuthService from "../Middleware/authservice"; 

//Nouvelle page en cours de création
  
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !
      </div>
    );
  }
};

export default class Logins extends Component {
  
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    
    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
    
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true
    });
    this.form.validateAll();
    
    if (this.checkBtn.context._errors.length === 0) {
      
      AuthService.login(this.state.email, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }
  render() {
    return (
      <section className="hero has-background-grey-light is-fullheight is-mobile">
      <nav className="navbar ml-auto mr-auto" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="" href="http://localhost:3000">
            <img className=".container-image " width="150"
              src={logo}
              alt="Logo Groupomania"
            />
          </a>
        </div>
      </nav>
          <div className="columns is-centered is-mobile">
                                    
            <div className="column is-4-desktop is-9-mobile ">
              <Form className="box" onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}>
                <p className="has-text-centered"></p>
                <div className="field">
                                                      
                  <label className="label">Email</label>
                  <div className="controls">
                                                            
                  <Input
                  type="email"
                  className="input"
                  name="email"
                  value={this.state.Email}
                  onChange={this.onChangeEmail}
                  validations={[required]}
                  />
                  </div>
                </div>
                <div className="field">
                                                      
                  <label className="label">Mot de passe</label>
                                                      
                  <div className="controls">       
                  <Input
                      type="password"
                      className="input"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required]}
                    />
                                                        
                                            
                                            
                  </div>
                </div>
                <div className="field">
                  <button className="button is-link is-fullwidth" >
                    Connexion
                  </button>
                </div>

                              <Link
                  to={{
                  pathname: "/Inscription",
                  }}>
                <button className="button is-info is-fullwidth"  >
                    Inscription
                  </button>
              </Link>
                {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
              </Form>

              
                                      
            </div>
                                
          </div>
                          
                    
              
    <footer>
        <Footer/>
    </footer>
    </section>
  );
  }
}