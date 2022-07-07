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
      <div className=" hero has-background is-fullheight is-fullwidth has-background-grey-light ">
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
                          <strong>{post.user.nom} </strong>
                          <br />
                          <strong>{post.user.prenom} </strong>
                        </figure>
                        <div className="media-content">
                          <div className="content">
                            <div className="columns is-gapless is-mobile mb-0">
                              <h3 className="title text-xl track-visited">
                                {post.nomposte}
                              </h3>
                            </div>
                            <p className="tagline">
                            {post.messagepost}
                            </p>
                          </div>
                          <nav className="level is-mobile">
                            <div className="level-left">
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
                <section>
                  <div className="columns is-mobile   ">
                    <div className="column ml-6 mr-6 is-clickable card">
                      <div>
                        <div>
                          <br />
                          <a href="/CreatePost">
                            <button className="button is-link is-fullwidth ">
                              Crée un poste
                            </button>
                          </a>
                          <br />
                          <a href="/Profil">
                            <button className="button is-warning is-fullwidth ">
                              Profile
                            </button>
                          </a>

                        </div>
                      </div>
                      <br />
                    </div>
                  </div>

                  <br />
                  <br />
                </section>
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
              <a href="/CreatePost">
                <button className="button is-link is-fullwidth ">
                  Crée un poste
                </button>
              </a>
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
    );
  }
}
export default Postinfo;
