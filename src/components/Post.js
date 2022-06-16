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
    commentaire:"",
  };
  componentDidMount() {
    this.getPosts();
  }
  changeCommentaire = (e) => {
    this.setState({ commentaire: e.target.value });
  };
  
  getPosts() {
    const user = JSON.parse(localStorage.getItem('user'));
    const postid = window.location.pathname.split("/")[2];
    axios
      .get("http://localhost:5000/api/posts/" + postid, {
        headers: {
          'Authorization': `Bearer ${user.token}` 
        }})
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
    const user = JSON.parse(localStorage.getItem('user'));
    let { posts } = this.state;
    let { isPost } = this.state;
    const commentpost = async (e) => {
      e.preventDefault();
      try {
        const postid = window.location.pathname.split("/")[2];
        console.log(postid);
        await axios.post("http://localhost:5000/api/posts/" + postid + "/comments", {
          commentaire: this.state.commentaire,
          postId: postid,
        }, {
          headers: {
            'Authorization': `Bearer ${user.token}` 
          }});
      } catch (error) {
        console.log(error)
      }
    };
    if (isPost) {
      return (
        <section className="">
          <br />
          <div class="columns is-multiline">
          <div class="column is-6-tablet"><div class="columns is-mobile ">
            <div class="column is-9 ml-6 ">
              <div class="card mr-3 ">
                <div class="card-image">
                  <figure class="image is-3by2">
                    <img src={posts.imageUrl} alt="Placeholder image" />
                  </figure>
                </div>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img
                          src={posts.user.imageUrl}
                          alt="Placeholder image"
                        />
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">
                        {posts.user.nom} {posts.user.prenom}
                      </p>
                      <p class="subtitle is-6">@johnsmith</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                  </div>
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
                          <a class="button is-info" onClick={commentpost}>
                            Submit
                          </a>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div></div>
          <div class="column is-4-tablet">
                <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img src="https://bulma.io/images/placeholders/128x128.png"/>
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <br/>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </article>
</div>
          </div>
      
          <br />
          <Footer />
        </section>
      );
    } else {
        return(
      <section className="">
        <p>Loading...</p>
      </section>);
    
    }
  }
}

export default Post;
