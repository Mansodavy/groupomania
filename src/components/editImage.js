import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import authHeader from "../Middleware/authHeader";
import swal from "sweetalert";
const API_URL = 'http://localhost:5000/api/';

const EditImage = (props) => {
  // On définit le state de notre composant EditProfile pour stocker les données du formulaire
  // we define the state of our EditProfile component to store the data of the form
	const [newPic, setNewPic] = useState();

  // Fonction pour Modifier l'image du profil et redirection vers le Dashboard
  // Function to edit the profile image and redirect to the Dashboard
	const EditProfiles = async (e) => {
    e.preventDefault();

		const Head = new Headers({
			Authorization: 'Bearer ' + localStorage.getItem('token'),
		});
		const data = new FormData();
		data.append('image', newPic);
    swal({
      title: "Etes-vous sûr ?",
      text: "Vous voulez changer votre image de profil ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        if (newPic === "" || newPic === undefined) {
          swal("Erreur !", "Merci de choisir une image", "error");
       } else { 
        axios.put(API_URL + "user/image/", data, {
          headers: authHeader()
        }).then((response) => console.log(response)
        ).then(() => {
          swal("Image modifiée avec succès", "", "success");
          window.location.replace("/Dashboard");

        }
        ).catch(() => {
          swal("Erreur lors de la modification de l'image", "", "error");
        }
        );
        swal("L'image a été modifiée avec succès ", {
          icon: "success",
        });}
      } else {
        swal("La modification de l'image de profil a été annulée");
      }
    });
                          };   
//Render du formulaire de modification de l'image de profil
//Render the form to edit the profile image
  return (
      
            <div className="column is-12-desktop">
              <form onSubmit={EditProfiles} className="box">
                  

                  
                  <div className="file is-centered is-boxed  ">

                  <label className="label has-text-centered	">Modification de l'image du profil
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
                    </label>
                      </div>
                <div className="field mt-5">
                  <button  type="submit" className="button is-link is-fullwidth">
                    Modifier l'image
                  </button>
                </div>
              </form>
            </div>
    
  
  );
  
};

export default EditImage;
