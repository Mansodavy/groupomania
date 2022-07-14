import { render } from "@testing-library/react";
import React, { Component } from "react";
import "react-router-dom";
import axios from "axios";
import authHeader from "../Middleware/authHeader";
import { useNavigate, useHistory, Link } from "react-router-dom";
const API_URL = 'http://localhost:5000/api/';

class Postinfo extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(API_URL + "posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
        window.localStorage.removeItem("user");
        window.location.replace("/Connexion");
      });
  }

  render() {
    let { posts } = this.state;
    return (
      <div className="hero has-background-grey-light is-fullheight"> 
      <div className=" hero has-background-grey-light">
              <a href="/CreatePost">
                <button className="button is-link is-fullwidth ">
                  Crée un poste
                </button>
              </a>
              <br />
      <div >
        {posts.length > 0 || posts.length != undefined ? (
          posts.map((post) => {
            return (
              <section className={post.id}>
                <br />
                <Link
                  to={{
                    pathname: "/posts/" + post.id,
                  }}
                >
                  <div className="columns is-mobile   ">
                    <div className="column ml-6 mr-6 is-clickable card">
                      <article className="media">
                        <figure className="media-left">
                          <p className="image is-64x64">
                            <img width={100} height={100} alt={post.nomposte} src={post.user.imageUrl} />
                          </p>
                          <p className="has-text-centered	">crée par</p>
                          <p className="has-text-centered	"><strong>{post.user.nom} </strong></p>
                          <p className="has-text-centered	"><strong >{post.user.prenom} </strong></p>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                              <h1 className="title">
                                <p className="has-text-centered">
                                {post.nomposte}
                                </p>
                              </h1>
                            <p className="tagline has-text-centered"	>
                            {post.messagepost}
                            </p>
                          </div>
                          
                        </div>
                        <br/>
                      </article>
                      {( post.comments.length > 0 ) ? (
                        post.comments.map((commentaire) => {
                          return (
                            <div className="columns is-mobile mb-0">
                              <div className="column is-fullwidth">
                                <div className=" card is-shady my-3 ml-3 mr-3">
                                  <div className="card-content">
                                    <div className="content">
                                      <p className="has-text-centered	 ">{commentaire.commentaire}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        )
                       ) : ( <div> 
                        <div className="columns is-mobile mb-0">
                          <div className="column is-fullwidth">
                            <div className=" card is-shady my-3 ml-3 mr-3">
                              <div className="card-content">
                                <div className="content">
                                  <p  className="has-text-centered	 ">Aucun commentaire</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    
                         </div> )}
                    </div>
                  </div>
                </Link>
                <br/>
              </section>
            );
          })
          
        ) : (
          <div>
            <br />
            <div className="  mb-6 ml-6 mr-6 box">
              <p className="  has-text-centered">
                Il n'y a pas de postes pour le moment
              </p>
              <br />
              <a href="/Profil">
                <button className="button is-warning is-fullwidth ">
                  Profile
                </button>
              </a>
            </div>
            <br />
          </div>
        )}
      </div>
      </div>
      </div>
    );
  }
}
export default Postinfo;
