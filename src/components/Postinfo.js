import { render } from "@testing-library/react";
import React, { Component } from "react";
import "react-router-dom";
import axios from "axios";
import { useNavigate, useHistory, Link } from "react-router-dom";
const urlPosts = "http://localhost:5000/api/posts";
class Postinfo extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    axios
      .get("http://localhost:5000/api/posts", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/Connexion");
      });
  }

  render() {
    let { posts } = this.state;
    return (
      <div className="is-align-self-auto has-background-grey-light">
        {posts ? (
          posts.map((post) => {
            console.log(post.id);
            return (
              <section className={post.id}>
                <br />
                <Link
                  to={{
                  pathname: "/posts/" + post.id,
                  }}>
                <div class="columns is-mobile  ">

                  <div class="column ml-6 mr-6 is-clickable card">
                    <article class="media">
                      <figure class="media-left">
                        <p class="image is-64x64">
                          <img src={post.user.imageUrl} />
                        </p>
                        <strong>{post.user.nom} </strong>
                        <br />
                        <strong>{post.user.prenom} </strong>
                      </figure>
                      <div class="media-content">
                        <div class="content">
                          <p>
                            <strong>{post.nomposte}</strong>
                            <br />
                            {post.messagepost}
                          </p>
                        </div>
                        <nav class="level is-mobile">
                          <div class="level-left">
                            <a class="level-item">
                              <span class="icon is-small">
                                <i class="fas fa-reply"></i>
                              </span>
                            </a>
                            <a class="level-item">
                              <span class="icon is-small">
                                <i class="fas fa-retweet"></i>
                              </span>
                            </a>
                            <a class="level-item">
                              <span class="icon is-small">
                                <i class="fas fa-heart"></i>
                              </span>
                            </a>
                          </div>
                        </nav>
                      </div>
                    </article>
                    <br />
                    
                  </div>

                 </div>
                 </Link>

                <br />
                <br />
              </section>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
export default Postinfo;
