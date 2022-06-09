import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import logo from "../images/icongroupomanianoir.png";
import Header from "../View/Header";
const Register = () => {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/Connexion`;
    navigate(path);
  };
 let id = localStorage.getItem("ID");
  const getOneUser = async (e) => {
    e.preventDefault();
    let id = window.localStorage.getItem("ID");
    try {
        const request = await axios.get(
            "http://localhost:5000/api/user/getOneUser/",
            {
              headers: {
                'Authorization': `Bearer ${localStorage.token}` 
              }}
        );
        console.log(request.data);
        window.localStorage.setItem("imageUrl", request.data.imageUrl);
    } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
    }
};
const deleteprofil = async (e) => {
  e.preventDefault();
  try {
    await axios.delete("http://localhost:5000/api/user/",
      {headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }}
    );
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
    await axios.put("http://localhost:5000/api/user/editprofil/", {
      nom: nom,
      prenom: prenom,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}` 
      }});
  } catch (error) {
    if (error.response) {
      setMsg(error.response.data.msg);
    }
  }
};
window.onload = getOneUser;

    

  return (
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <Header />
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={Editprofil} className="box">
                <label className="label">Modifier le profil</label>
                <div className="field mt-5">
                  <figure className="image is-128x128 mx-auto">
                    <img className="is-rounded" src={window.localStorage.imageUrl} />
                  </figure>
                  <br />
                </div>
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
                  <button onClick={deleteprofil} className="button is-danger is-fullwidth">
                    Supprimer le compte
                  </button>
                </div>
              </form>
            </div>
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
