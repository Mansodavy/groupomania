import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import AuthService from "../Middleware/authservice";
import Footer from "../View/Footer";
import logo from "../images/icongroupomanianoir.png";
import EditImage from "./editImage";
const API_URL = 'http://localhost:5000/api/';

const Register = () => {
  // On définit le state de notre composant Register pour stocker les données du formulaire
  // we define the state of our Register component to store the data of the form
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();
  let navigate = useNavigate();
  const user = AuthService.getCurrentUser();
  // Suppression du Profil de l'utilisateur et redirection a la page de connexion
  // Delete the profile of the user and redirect to the login page
  const deleteprofil = async (e) => {
    e.preventDefault();
    //Utilisation de swal pour afficher un message de confirmation
    // Use swal to display a confirmation message
    swal({
      title: "Etes-vous sûr ?",
      text: "Vous voulez changer les informations de votre profil ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        try {
          axios.delete( API_URL + "user/", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
    
          window.localStorage.clear();
          swal("Votre profil a été supprimé avec succès", {
            icon: "success",
          });
          navigate("/Connexion");
        } catch (error) {
          swal("Erreur lors de la modification du Profil", "", "error");
        }
      } else {
        swal("La modification du profil a été annulée");
      }

    });
  };


    //Modification du profil de l'utilisateur et redirection au Dashboard
    //Edit the profile of the user and redirect to the Dashboard
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
    //Rendu du Profil de l'utilisateur
    //Render the profile of the user
  
  return (
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      
      <div className="hero-body">
        
        <div className="container">
          
          <div className="columns is-centered">
            
            <div className="column is-6-desktop">
              <form onSubmit={Editprofil} className="box">
                <label className="label has-text-centered">Modifier le profil</label>

                <div className="field mt-5">
                  <label className="label has-text-centered">Nom
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Charles"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                  </label>
                </div>
                <div className="field mt-5">
                  <label className="label has-text-centered">Prénom
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Jean"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                    
                  </div>
                  </label>
                </div>
                <div className="field mt-5">
                  <button className="button is-link is-fullwidth">
                    Modifier les informations
                  </button>
                </div>
                <div className="field mt-5">
                  <button
                    onClick={deleteprofil}
                    className="button is-black is-fullwidth"
                  >
                    Supprimer le compte
                  </button>
                  <br/>
                  <a
                              className=" button is-warning is-fullwidth"
                              href="http://localhost:3000/Dashboard"
                            >
                              Liste des postes
                            </a>
                </div>
              </form>
              {/* Rendu du composant EditImage */}
              {/* Rendering EditImage */}
              <EditImage/>
                
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
