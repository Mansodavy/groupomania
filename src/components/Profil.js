import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../Middleware/authservice";
import Footer from "../View/Footer";
import logo from "../images/icongroupomanianoir.png";
import Header from "../View/Header";
import UploadImages from "./UploadImage";
const Register = () => {
  
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  let navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  const routeChange = () => {
    let path = `/Connexion`;
    navigate(path);
  };
  
  const deleteprofil = async (e) => {
    e.preventDefault();
    try {
      await axios.delete("http://localhost:5000/api/user/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      window.localStorage.clear();
      alert("Votre compte a bien été supprimé");
      navigate("/Connexion");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };



  const Editprofil = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        "http://localhost:5000/api/user/editprofil/",
        {
          nom: nom,
          prenom: prenom,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  
  return (
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Editprofil} className="box">
                <label className="label">Modifier le profil</label>
                <div className="field mt-5">
                  <label className="label">Nom</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Charles"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Prénom</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Jean"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <button className="button is-link is-fullwidth">
                    Modifier les informations
                  </button>
                </div>
                <div className="field mt-5">
                  <button
                    onClick={deleteprofil}
                    className="button is-danger is-fullwidth"
                  >
                    Supprimer le compte
                  </button>
                </div>
              </form>
              <div class=" hero has-background is-fullwidth hero-body ">
                <label className="label">Modifier Image</label>
            <UploadImages/>
            </div>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default Register;
