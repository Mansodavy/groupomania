import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const NewCreatepost = (props) => {
	const [newPic, setNewPic] = useState();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [messagepost, setmessagepost] = useState("");
  const [nomposte, setnomposte] = useState("");


	const createPost = (e) => {
		e.preventDefault();

		const myHeaders = new Headers({
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		const data = new FormData();
		data.append('image', newPic);
		data.append('nomcreateur', nom);
		data.append('prenomcreateur', prenom);
    data.append('messagepost', messagepost);
    data.append('nomposte', nomposte);
		console.log(data);
		fetch('http://localhost:5000/api/posts', {
			method: 'POST',
			headers: myHeaders,
			body: data,
		}).then((response) => console.log(response));
		props.onCancel();
	};
    
  return (
      
    <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
      <Header />
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4-desktop">
              <form onSubmit={createPost} className="box">
                <label className="label">Création du Post</label>
                <div className="field mt-5">
                  <label className="label">Modifier L'image</label>
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
                </div>
                <div className="field mt-5">
                  <label className="label">Nom de post</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder=""
                      value={nomposte}
                      onChange={(e) => setnomposte(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Nom du createur du poste</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder=""
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Prenom</label>
                  <div className="controls">
                    <input
                      type="text"
                      className="input"
                      placeholder=""
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field mt-5">
                  <label className="label">Texte du post</label>
                  <div class="field">
                    <div class="control">
                        <textarea class="textarea" 
                        placeholder="Normal textarea"
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
