import { render } from '@testing-library/react'
import React, { Component } from 'react'
import 'react-router-dom'
import axios from 'axios'
import authHeader from '../Middleware/authHeader'
import { useNavigate, useHistory, Link } from 'react-router-dom'
const API_URL = 'http://localhost:5000/api/'

class Postinfo extends Component {
  // On definit le state de notre composant Postinfo pour stocker les posts
  // we define the state of our Postinfo component to store the posts
  state = {
    posts: [],
  }
  // fetching the posts
  // On appelle la fonction getPosts() quand le composant est chargé
  componentDidMount() {
    this.getPosts()
  }

  // fetching the posts from the API and storing them in the state to be displayed
  // Récupération des posts stockage dans le state pour afficher les posts
  getPosts() {
    const user = JSON.parse(localStorage.getItem('user'))
    axios
      .get(API_URL + 'posts', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })

      .then((res) => {
        this.setState({ posts: res.data })
      })
      .catch((err) => {
        console.log(err)
        window.localStorage.removeItem('user')
        window.location.replace('/Connexion')
      })
  }

  // Renderings of posts and the last 3 comments associated with each post
  // Rendu des posts et des 3 dernier commentaires associés à chaque post
  render() {
    let { posts } = this.state
    return (
      <div className="hero has-background-grey-light is-fullheight">
        <div className="ml-6 mr-6  hero has-background-grey-light">
          {/* Bouton pour crée des posts toujours présents sur la page */}
          {/* Button to create posts always present on the page */}
          <br />

          <a href="/CreatePost">
            <button
              className="
                 button is-link is-fullwidth "
            >
              Crée un poste
            </button>
          </a>
          <br />
          <div>
            {/* Si le state "posts" et supérieur à 0 / ne sont pas undefined dans ce cas on map et affichent les posts sinon on render qu'il n'y a pas de posts */}
            {/* If the state "posts" is greater than 0 / are not undefined in this case we map and display the posts otherwise we return that there are no posts */}
            {posts.length > 0 || posts.length != undefined ? (
              posts.map((post) => {
                return (
                  // Link to the post page with id of the post
                  // Lien vers la page du post avec L'id du post.
                  <section key={post.id} className={post.id}>
                    <br />
                    <Link
                      to={{
                        pathname: '/posts/' + post.id,
                      }}
                    >
                      <section key={post.id}>
                        {/* Rendu du post en récupérant les information pour les affichée */}
                        {/* Render the post by retrieving the information for posting */}
                        <div className="columns">
                          <div className="column is-mobile">
                            <div className="box content">
                              <article className="post">
                                <div className="card-image has-text-centered">
                                  <figure className="image is-128x128 is-inline-block">
                                    <img
                                      width={500}
                                      height={500}
                                      alt={post.nomposte}
                                      src={post.imageUrl}
                                    ></img>
                                  </figure>
                                </div>
                                <h4 className="has-text-centered">
                                  <strong>{post.nomposte}</strong>
                                </h4>
                                <p className="has-text-centered">
                                  {post.messagepost}
                                </p>
                              </article>
                            </div>
                          </div>
                        </div>
                        {/* Si il y a des commentaire et que donc supérieur a 0 on map et on affiche les 3 dernier commentaire */}
                        {/* If there are comments and therefore greater than 0 we map and display the last 3 comments */}
                        {post.comments.length > 0 ? (
                          post.comments.map((commentaire) => {
                            return (
                              // Rendu des commentaires en récupérant les information pour les afficher
                              // Render the comments by retrieving the information for displaying

                              <article
                                key={commentaire.id}
                                className="media box"
                              >
                                <figure className="media-left">
                                  <p className="image is-64x64">
                                    <img
                                      width={64}
                                      height={64}
                                      alt={commentaire.user.prenom}
                                      src={commentaire.user.imageUrl}
                                    />
                                  </p>
                                </figure>
                                <div className="media-content">
                                  <div className="field">
                                    <p>

                                      <strong>
                                        {commentaire.user.nom}
                                      </strong>{' '}
                                      <strong>{commentaire.user.prenom}</strong>
                                      <br />
                                      {commentaire.commentaire}

                                    </p>
                                  </div>
                                </div>
                              </article>
                            )
                          })
                        ) : (
                          // Si il n'y a pas de commentaire on affiche que le poste avec un message Aucun commentaire
                          // If there is no comment we display only the post with a message no comment
                          <div>
                            <div className="columns is-mobile mb-0">
                              <div className="column is-fullwidth">
                                <div className=" card is-shady my-3 ml-3 mr-3">
                                  <div className="card-content">
                                    <div className="content">
                                      <p className="has-text-centered	 ">
                                        Aucun commentaire
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </section>
                    </Link>

                    <br />
                  </section>
                )
              })
            ) : (
              // Si il n'y a pas de post on affiche un message "Il n'y a pas de post pour le moment" avec un bouton vers le profile
              // If there is no post we display a message "There is no post for the moment" with a button to the profile
              <div>
                <br />
                <div className="  mb-6 ml-6 mr-6 box">
                  <p className="  has-text-centered">
                    Il n'y a pas de postes pour le moment
                  </p>
                </div>
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default Postinfo
