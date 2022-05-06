import React from 'react'
import { createPortal } from 'react-dom';
import 'react-router-dom'

const getpostid = () => {
    const postid = window.location.pathname.split('/')[2];
    return postid;
}



function Posts() {
    return (

<section>
<br/>
<div class="columns is-mobile">
  <div class="column is-3 ml-5  is-flex  ">
  <div class="card mr-3 ">
  <div class="card-image">
    <figure class="image is-3by2">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris.
    </div>
      
  </div>
  
</div>
<div class="card">
  <div class="card-image">
    <figure class="image is-3by2">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris.
    </div>
      
  </div>
  
</div>
  </div>
    </div>
  <div class="column is-2 is-one-quarter">
  <div class="card mx-*10">
  </div>
    </div>
<br/>
  
</section>

    )
}

export default Posts
