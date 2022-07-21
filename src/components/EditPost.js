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
		data.append('image', newPic);
    data.append('messagepost', messagepost);
    data.append('nomposte', nomposte);
		console.log(newPic); 
    if (messagepost !== "" && nomposte !== "") {
		fetch(API_URL + 'posts/edit/' + postid, {
			method: 'PUT',
      headers :  authHeader (),
			body: data,
		}).then((response) => console.log(response)
    ).then(() => { 
      swal("Post modifié avec succès", "", "success");
      window.location.replace("/posts/" + postid);
    }
    ).catch(() => {
      swal("Erreur lors de la modification du post", "", "error");
    }
    );
  } else {
    swal("Veuillez remplir tous les champs", "", "error");
  }
	};
   // Rendu du formulaire de modification du post
  // Rendering of the form to edit the post
  return (
      
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={editPosts} className="box">
                <label className="label has-text-centered	">Modification du Post</label>

                  <label className="label has-text-centered	">Modification de l'image </label>
                  
                  <div className="controls ">
                    <div className="file has-name is-boxed ">
                      
                      <input
                        className="form-input"
                        type="file"
                        name="imageUrl"
                        accept=".jpg, .jpeg, .png, .gif"
                        onChange={(e) => {
                          setNewPic(e.target.files[0]);
                        }}
                      />
                    </div>
                  </div>

                <div className="field mt-5">
                  <label className="label has-text-centered	">Nom de post</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder="Le nom du post"
                      value={nomposte}
                      onChange={(e) => setnomposte(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label has-text-centered	">Texte du post</label>
                  <div className="field">
                    <div className="control">
                        <textarea className="textarea" 
                        placeholder="Mon post ici"
                        value={messagepost}
                        onChange={(e) => setmessagepost(e.target.value)}>
                        </textarea>
                    </div>
                    </div>
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
