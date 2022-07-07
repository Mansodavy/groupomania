import render from "@testing-library/react";
import React, { Component } from "react";
import { useState } from "react";
import "react-router-dom";
import axios from "axios";
import Footer from "../View/Footer";
import swal from "sweetalert";
import { Link, useNavigate  } from "react-router-dom";
const API_URL = 'http://localhost:5000/api/';


class Post extends Component {
  constructor(props) {
    super(props);
    this.state = { isPost: false };
  }

  state = {
    posts: [],
    commentaire: "",
  };
  componentDidMount() {
    this.getPost();
  }
  changeCommentaire = (e) => {
    this.setState({ commentaire: e.target.value });
  };
  getPost() {
    const user = JSON.parse(localStorage.getItem("user"));
    const postid = window.location.pathname.split("/")[2];
    axios
      .get(API_URL + "posts/" + postid, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        this.setState({ posts: res.data });
        console.log(res.data);
        this.setState({ isPost: true });
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/Connexion");
      });
  }
  render() {
    const handleCommentremove = (event) => {
      swal({
        title: "Etes-vous sûr ?",
        text: "Vous ne pourrez pas récupérer ce commentaire !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(
              "http://localhost:5000/api/posts/comments/" +
                event.target.parentNode.id,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            )
            .then((res) => {
              console.log(res);
              window.location.reload();
            });
          swal("Le commentaire a été supprimée avec succés ", {
            icon: "success",
          });
        } else {
          swal("La suppression du commentaire a été annulée !");
        }
      });
    };


    const handlePostremove = (event) => {
      swal({
        title: "Etes-vous sûr ?",
        text: "Vous ne pourrez pas récupérer ce post !",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete("http://localhost:5000/api/posts/" + posts.id, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((res) => {
              console.log(res);
            });
          swal(
            "Le post a été supprimée avec succés !",
            {
              icon: "success",
            },
            window.location.replace("/")
            );

        } else {
          swal("La suppression du post a été annulée !");
        }
      });
    };
    const user = JSON.parse(localStorage.getItem("user"));
    let { posts } = this.state;
    let { isPost } = this.state;
    const commentpost = async (e) => {
      if (this.state.commentaire !== undefined) {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem("user"));
        const postid = window.location.pathname.split("/")[2];
        const data = {
          commentaire: this.state.commentaire,
          post_id: postid,
        };
        await axios
          .post(
            "http://localhost:5000/api/posts/comments" + postid ,
            data,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            swal("Bien jouer!", "Tu a postée un commentaire", "success").then(
              (value) => {
                window.location.reload();
              }
            );
          })
          .catch((err) => {
            console.log(err);
            window.location.replace("/Dashboard");
          });
      } else {
        swal("Veuillez remplir le commentaire");
      }
    };
    if (isPost) {
      return (
        <section className="">
          <div className="columns">
          <div className="column is-half">
            <div className="card is-shady my-3 ml-3 mr-3">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src={posts.imageUrl}
                    alt="Placeholder image"
                    className="modal-button"
                    data-target="modal-image2"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>{posts.nomposte}</h4>
                  <p>{posts.messagepost}</p>
                  <div className="field">
                    <p className="control">
                      <textarea
                        className="textarea"
                        placeholder="Add a comment..."
                        value={this.state.commentaire}
                        onChange={this.changeCommentaire}
                      ></textarea>
                    </p>
                  </div>
                  <span
                    onClick={commentpost} className="button is-link modal-button"
                    data-target="modal-image2"
                  >
                    Poster un commentaire
                  </span>
                  {(user.id === posts.userId ||
                            user.roles[0] === "ROLE_ADMIN") && (
                    <div className="field">
                  <span
                    id={posts.id}
                    onClick={handlePostremove} className="button is-danger modal-button  mt-3 mr-3" 
                    data-target="modal-image2"
                  >
                    Supprimer le poste
                  </span>
                  <Link
                  to={{
                  pathname: "/posts/edit/" + posts.id,
                  }}>
          <span
                    id={posts.id}
                    className="button is-warning modal-button mt-3"
                    data-target="modal-image2"
                  >
                    Editer Le Poste
                  </span>          </Link>
                            </div>
                          )}
                </div>
              </div>
            </div>
            </div>
            <div className="column ">
              <article>
                {posts.comments ? (
                  posts.comments.map((comment) => {
                    console.log(comment.id);
                    console.log(user.roles[0]);
                    return (
                      <section id={comment.id}>
                        <div className="column is-12 ">
                          <div>
                            <div className="columns is-mobile">
                              <div className="column  is-clickable card mt-3 ml-3 mr-3">
                                <article className="post">
                                  <div className="media">
                                    <div className="media-content">
                                      <div className="content">
                                        <h4>
                                          {posts.user.nom} {posts.user.prenom}
                                        </h4>
                                        <p>{comment.commentaire}</p>
                                      </div>
                                    </div>
                                    <div className="media-right">
                                      {(user.roles[0] === "ROLE_ADMIN" ||
                                        user.id === comment.userId) && (
                                        <div
                                          className="post-control"
                                          id={comment.id}
                                        >
                                          <button
                                            className="button is-danger"
                                            onClick={handleCommentremove}
                                          >
                                            Supprimer le commentaire
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </article>
                                <br />
                              </div>
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />
                      </section>
                    );
                  })
                ) : (
                  <p>Loading...</p>
                )}
              </article>
            </div>
            </div>
          <br />
          <Footer />
        </section>
      );
    } else {
      return (
        <section className="">
          <p>Loading...</p>
        </section>
      );
    }
  }
}

export default Post;
