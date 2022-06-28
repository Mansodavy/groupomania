import render from "@testing-library/react";
import React, { Component } from "react";
import { useState } from "react";
import "react-router-dom";
import axios from "axios";
import Footer from "../View/Footer";
import Header from "../View/Header";

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
  getUserRank() {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/api/user/verifyrank/" + user.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/Connexion");
      });
  }
  getPost() {
    const user = JSON.parse(localStorage.getItem("user"));
    const postid = window.location.pathname.split("/")[2];
    axios
      .get("http://localhost:5000/api/posts/" + postid, {
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

    };
    const handlePostremove = (event) => {
      axios
        .delete(
          "http://localhost:5000/api/posts/" +
          posts.id,
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

    };
    const user = JSON.parse(localStorage.getItem("user"));
    let { posts } = this.state;
    let { isPost } = this.state;
    const commentpost = async (e) => {
      e.preventDefault();
      try {
        const postid = window.location.pathname.split("/")[2];
        await axios.post(
          "http://localhost:5000/api/posts/" + postid + "/comments",
          {
            commentaire: this.state.commentaire,
            postId: postid,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
          )
        ;
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
      
    };
    if (isPost) {
      return (
        <section className="">
          <br />
          <div class="columns is-multiline">
            <div class="column is-6-tablet">
              <div class="columns is-mobile ">
                <div class="column is-9 ml-6 ">
                  <div class="card mr-3 ">
                    <div class="card-image">
                      <figure class="image is-3by2">
                        <img src={posts.imageUrl} alt="Placeholder image" />
                      </figure>
                    </div>
                    <div class="card-content">
                      <div class="media">
                        <div class="media-content">
                          <p class="title is-4">{posts.nomposte}</p>
                          <p class="subtitle is-6">
                            {posts.user.nom} {posts.user.prenom}
                          </p>
                        </div>
                      </div>

                      <div class="content">{posts.messagepost}</div>
                      <br />
                      <div class="media-content">
                        <div class="field">
                          <p class="control">
                            <textarea
                              class="textarea"
                              placeholder="Add a comment..."
                              value={this.state.commentaire}
                              onChange={this.changeCommentaire}
                            ></textarea>
                          </p>
                        </div>
                        <nav class="level">
                          <div class="level-left">
                            <div class="level-item">
                              <button
                                class="button is-danger"
                                onClick={commentpost}
                              >
                                Poster un commentaire
                              </button>
                              {(user.id === posts.userId ||
                                user.roles === ["ROLE_ADMIN"]) && (
                                <div className="post-control ">
                                  <button
                                    class="button is-danger" id={posts.id}
                                    onClick={handlePostremove}
                                  >
                                    Supprimer le poste
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="column is-6-tablet is-full">
              <article>
                {posts.comments ? (
                  posts.comments.map((comment) => {
                    console.log(comment.id);
                    return (
                      <section id={comment.id}>
                        <div class="column is-9">
                          <div>
                            <div className="columns is-mobile">
                              <div class="column  is-clickable card">
                                <article class="post">
                                  <div class="media">
                                    <div class="media-content">
                                      <div class="content">
                                        <h4>
                                          {posts.user.nom} {posts.user.prenom}
                                        </h4>
                                        <p>{comment.commentaire}</p>
                                      </div>
                                    </div>
                                    <div class="media-right">
                                      {(user.id === comment.userId ||
                                        user.roles === ["ROLE_ADMIN"]) && (
                                        <div
                                          className="post-control"
                                          id={comment.id}
                                        >
                                          <button
                                            class="button is-danger"
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
