import { render } from '@testing-library/react';
import React, { Component } from 'react'
import 'react-router-dom'
import axios from "axios";
const urlPosts = "http://localhost:5000/api/posts";

class Postinfo extends Component {

  state = {
      posts: []
  }

  componentDidMount() {
      this.getPosts();
  }

  getPosts() {

      axios.get('http://localhost:5000/api/posts', {
      })
          .then(res => {
              this.setState({ posts: res.data });
              console.log(res.data);
          })
          .catch(err => {
              console.log(err);
              window.alert('Une erreur ');
          })
  }



render(){
  let { posts } = this.state;
  return (
    <div className="is-align-self-auto">
        { posts ? (posts.map(post => {
            return (
              <section className="">
              <br/>
              <div class="columns is-mobile   " >
              <div class="column is-3 ml-5 is-clickable">
              <div class="card mr-3  ">
              <div class="card-image ">
                <figure class="image is-3by2">
                  <img src={post.imageUrl} alt="Placeholder image"/>
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img src={post.user.imageUrl} alt="Placeholder image"/>
                    </figure>
                  </div>
                  <div class="media-content">
                    <h1 class="title is-4">{post.nomposte}</h1>
                    <p class="subtitle is-10">{post.user.nom} {post.user.prenom} </p>
                  </div>
                </div>
            
                <div class="content">
                  {post.messagepost}
                </div>
              </div>
            </div>
              </div>
                </div>
                
            <br/>
            <br/>
            </section>
            )
        })) : (
            <p>Loading...</p>
        )}
    </div>
  )
    }
  }
export default Postinfo;