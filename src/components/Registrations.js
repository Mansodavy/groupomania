import React, { Component } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../Middleware/authservice";
import Footer from "../View/Footer";
import logo from "../images/icongroupomanianoir.png";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est obligatoire !
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce n'est pas un email valide.
      </div>
    );
  }
};
const vnom = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom d'utilisateur doit comporter entre 3 et 20 caractères.
      </div>
    );
  }
};
const vprenom = (value) => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le prénom doit comporter entre 1 et 20 caractères.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="notification is-danger alert-danger">
  <button className="delete"></button>
  Le mot de passe doit comporter entre  <strong>6 et 40</strong>6 et 40 caractères..
</div>
    );
  }
};
export default class Registrations extends Component {
  
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      nom: "",
      email: "",
      prenom: "",
      password: "",
      successful: false,
      message: "",
    };
  }
  
  onChangeNom(e) {
    this.setState({
      nom: e.target.value,
    });
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nom,
        this.state.prenom,
        this.state.email,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    const user = AuthService.getCurrentUser();
    if (user) {
     window.location.href = "/Dashboard";
    }
    return (
      <section className="hero has-background-grey-lighter is-fullheight is-fullwidth">
        <nav
          className="navbar ml-auto mr-auto"
          role="navigation"
          aria-label="main navigation"
        >
        </nav>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4-desktop">
                <Form
                  onSubmit={this.handleRegister}
                  className="box"
                  ref={(c) => {
                    this.form = c;
                  }}
                >
                  {!this.state.successful && (
                    <div>
                      <div className="field mt-5">
                        <label className="label">Nom</label>
                        <div className="controls">
                          <input
                            type="text"
                            className="input"
                            name="Nom"
                            placeholder="Marc"
                            value={this.state.nom}
                            onChange={this.onChangeNom}
                            validations={[required, vnom]}
                          />
                        </div>
                      </div>
                      <div className="field mt-5">
                        <label className="label">Prenom</label>
                        <div className="controls">
                          <input
                            type="text"
                            className="input"
                            name="Prenom"
                            placeholder="Jean"
                            value={this.state.prenom}
                            onChange={this.onChangePrenom}
                            validations={[required, vprenom]}
                          />
                        </div>
                      </div>
                      <div className="field mt-5">
                        <label className="label">Email</label>
                        <div className="controls">
                          <input
                            type="text"
                            className="input"
                            name="Email"
                            placeholder="Jean@gmail.com"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                            validations={[required, email]}
                          />
                        </div>
                      </div>
                      <div className="field mt-5">
                        <label className="label">Password</label>
                        <div className="controls">
                          <input
                            type="text"
                            className="input"
                            name="Password"
                            placeholder="Mot de passe"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            validations={[required, vpassword]}
                          />
                        </div>
                      </div>

                      <div className="field mt-5">
                        <button className="button is-link is-fullwidth">
                          Inscription
                        </button>
                      </div>
                    </div>
                  )}
                  {this.state.message && (
                    <div className="field mt-5">
                      <div
                        className={
                          this.state.successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                          
                  <Link
                    to={{
                      pathname: "/Connexion",
                    }}
                  >
                    <button className="button is-link is-fullwidth">
                      Déjà un compte ?
                    </button>
                  </Link>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </section>
    );
  }
}
