import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import authHeader from "../Middleware/authHeader";
import swal from "sweetalert";
const API_URL = "http://localhost:5000/api/";

const NewCreatepost = (props) => {
  // On définit le state de notre composant NewCreatePost pour stocker les données du formulaire
  // we define the state of our NewCreatePost component to store the data of the form
  const [newPic, setNewPic] = useState();
  const [messagepost, setmessagepost] = useState("");
  const [nomposte, setnomposte] = useState("");

  // Fonction pour Créer un nouveau post et redirection vers la page du Dashboard
  //  Function to create a new post and redirect to the Dashboard page
  const createPost = (e) => {
    e.preventDefault();

    const Head = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    const data = new FormData();
    data.append("image", newPic);
    data.append("messagepost", messagepost);
    data.append("nomposte", nomposte);
    console.log(data);
    if (newPic === undefined || messagepost === "" || nomposte === "") {
      swal("Veuillez remplir tous les champs et une image", "", "error");
    } else {
      fetch(API_URL + "posts", {
        method: "POST",
        headers: authHeader(),
        body: data,
      }).then((response) => console.log(response));
      swal("Bien jouer!", "Ton poste a été ajouté", "success").then((value) => {
        window.location.replace("/Dashboard");
      });
    }
  };
  // Rendu du composant NewCreatePost
  // Rendering of the NewCreatePost component
  return (
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <br/>

<a
                              className=" button is-link mt-2 mr-5 ml-5 "
                              href="http://localhost:3000/Dashboard"
                            >
                              Liste des postes
                            </a>
      <br/>

            <div className="column is-centered is-desktop mr-3 ml-3">
              <form onSubmit={createPost} className="box">
                <label className="label has-text-centered">
                  Formulaire de création de post
                </label>
                <div className="field mt-5">
                  <label className="label has-text-centered">
                    Ajouter une image
                    
                    <div className="  controls ">
                    <br/>

                      <div className="file is-centered is-boxed  ">
                          <input className="form-input file-input" type="file"  name="imageUrl"
                          accept=".jpg, .jpeg, .png, .gif"
                          onChange={(e) => {
                            setNewPic(e.target.files[0]);
                          }}/>
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload" />
                            </span>
                            <span className="file-label">
                              
                            {newPic ? newPic.name : "Aucun fichier sélectionné"}
                            </span>
                          </span>

                      </div>
                      
                    </div>
                    </label>
                </div>
                <div className="field mt-5">
                  <label className="label has-text-centered">Nom du poste
                  <div className="controls">
                  <br/>
                    <input
                      type="text"
                      className="input"
                      placeholder="ex: Le nom du poste"
                      value={nomposte}
                      onChange={(e) => setnomposte(e.target.value)}
                    />
                  </div>
                  </label>
                </div>
                <div className="field mt-5">
                  <label className="label has-text-centered">
                    Contenue du poste
                  
                  <div className="field">
                    <br/>
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="ex: Je suis un étudiant en informatique"
                        value={messagepost}
                        onChange={(e) => setmessagepost(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  </label>
                </div>
                
                <div className="field mt-5">
                  <button type="submit" className="button is-link is-fullwidth">
                    Crée le poste
                  </button>
                </div>
              </form>
        </div>
      <footer>
        <Footer />
      </footer>
    </section>
  );
};

export default NewCreatepost;
