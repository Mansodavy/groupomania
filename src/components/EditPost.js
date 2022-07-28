import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import authHeader from "../Middleware/authHeader";
import swal from "sweetalert";
const API_URL = 'http://localhost:5000/api/';
const EditPost = (props) => {
    // On définit le state de notre composant EditPost pour stocker les données du formulaire
  // we define the state of our EditPost component to store the data of the form
	const [newPic, setNewPic] = useState();
  const [messagepost, setmessagepost] = useState("");
  const [nomposte, setnomposte] = useState("");

  // Fonction pour Modifier un post et redirection vers la page du post édité
  // function to edit a post and redirect to the edited post page
	const editPosts = (e) => {
		e.preventDefault();

		const Head = new Headers({
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
    const postid = window.location.pathname.split("/")[3];
    console.log(postid);
		const data = new FormData();
    if (messagepost != "") {
      data.append('messagepost', messagepost);
    }
    if (nomposte != "") {
      data.append('nomposte', nomposte);
    }
		data.append('image', newPic);
		console.log(newPic); 

		fetch(API_URL + 'posts/edit/' + postid, {
			method: 'PUT',
      headers :  authHeader (),
			body: data,
		}).then((response) => console.log(response)
    ).then(() => { 
      swal("Poste modifié avec succès", "", "success");
      window.location.replace("/posts/" + postid);
    }
    ).catch(() => {
      swal("Erreur lors de la modification du poste", "", "error");
    }
    );

	};
   // Rendu du formulaire de modification du post
  // Rendering of the form to edit the post
  return (
      
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered ">
            <div className="column is-fullwidth  is-centered">
              <form onSubmit={editPosts} className="box">

                  <label className="label has-text-centered	">Modification de l'image du poste
                  
                  <div className="file is-centered is-boxed  ">
    <div>
      <br/>
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

                <div className="field mt-5">
                  <label className="label has-text-centered	">Nom de poste
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
                  <label className="label has-text-centered	">Contenue du poste
                  <div className="field">
                    <br/>
                    <div className="control">
                        <textarea className="textarea" 
                        placeholder="ex: Le contenue du poste"
                        value={messagepost}
                        onChange={(e) => setmessagepost(e.target.value)}>
                        </textarea>
                    </div>
                    </div>
                    </label>
                </div>
                <div className="field mt-5">
                  <button  type="submit" className="button is-link is-fullwidth">
                  Modifier le poste
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

export default EditPost;
