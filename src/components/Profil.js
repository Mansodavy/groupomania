import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AuthService from "../Middleware/authservice";
import Footer from "../View/Footer";
import logo from "../images/icongroupomanianoir.png";
import EditProfile from "./editProfiles";
const API_URL = 'http://localhost:5000/api/';

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
      await axios.delete( API_URL + "user/", {
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
    swal({
      
      title: "Etes-vous sûr ?",
      text: "Vous voulez changer les informations de votre profil ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (nom === "" || prenom === "") {
          swal("Erreur !", "Merci de remplir tout les champs", "error");
        } else {
        axios.put(
          "http://localhost:5000/api/user/",
          {
            nom: nom,
            prenom: prenom,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            
          }
        
        ).then((response) => console.log(response)
        ).then(() => {
          swal("Profil modifiée avec succès", "", "success");
          window.location.replace("/Dashboard");

        }
        ).catch(() => {
          swal("Erreur lors de la modification du Profil", "", "error");
        }
        );
  }
      } else {
        swal("La modification du profil a été annulée");
      }

    });
  };

  
  return (
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-6-desktop">
              <form onSubmit={Editprofil} className="box">
                <label className="label has-text-centered">Modifier le profil</label>

                <div className="field mt-5">
                  <label className="label has-text-centered">Nom</label>
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
                  <label className="label has-text-centered">Prénom</label>
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
                    className="button is-link is-fullwidth"
                  >
                    Supprimer le compte
                  </button>
                </div>
              </form>
              <EditProfile/>
                
            </div>
            </div>
          </div>
          <div>
          </div>
        </div>

        
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default Register;
