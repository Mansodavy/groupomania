import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../View/Footer";
import authHeader from "../Middleware/authHeader";
import swal from "sweetalert";
const API_URL = 'http://localhost:5000/api/';

const EditProfile = (props) => {
	const [newPic, setNewPic] = useState();


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
        swal("L'image a été modifiée avec succés ", {
          icon: "success",
        });}
      } else {
        swal("La modification de l'image de profil a été annulée");
      }
    });
                          };   

  return (
      
            <div className="column is-12-desktop">
              <form onSubmit={EditProfiles} className="box">
                  <label className="label has-text-centered	">Modification de l'image du profil
                  
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
                  </label>
                <div className="field mt-5">
                  <button  type="submit" className="button is-link is-fullwidth">
                    Modifier l'image
                  </button>
                </div>
              </form>
            </div>
    
  
  );
  
};

export default EditProfile;
