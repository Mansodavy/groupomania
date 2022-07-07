import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import authHeader from "../Middleware/authHeader";
import swal from "sweetalert";
const API_URL = 'http://localhost:5000/api/';

const NewCreatepost = (props) => {
	const [newPic, setNewPic] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [messagepost, setmessagepost] = useState("");
  const [nomposte, setnomposte] = useState("");


	const createPost = (e) => {
		e.preventDefault();

		const Head = new Headers({
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		const data = new FormData();
		data.append('image', newPic);
    data.append('messagepost', messagepost);
    data.append('nomposte', nomposte);
		console.log(data);
    if (newPic === undefined || messagepost === "" || nomposte === "") {
      swal  ("Veuillez remplir tous les champs et une image", "", "error");
    }  
    else{
		fetch(API_URL + 'posts', {
			method: 'POST',
      headers :  authHeader (),
			body: data,
		}).then((response) => console.log(response));
    swal("Bien jouer!", "Ton poste a été postée", "success").then(
      (value) => {
        window.location.replace("/Dashboard");
      }
    );
		props.onCancel();
  }
	};
    
  return (
      
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={createPost} className="box">
                <label className="label has-text-centered">Création du Post</label>
                <div className="field mt-5">
                  <label className="label has-text-centered">Ajouter une image 
                  <div className="controls mx-auto">
                    <div className="file has-name is-boxed mx-auto">
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
                  </label>
                </div>
                <div className="field mt-5">
                  <label className="label has-text-centered">Nom de post</label>
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
                  <label className="label has-text-centered">Texte du post</label>
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
                    Crée le poste
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

export default NewCreatepost;
