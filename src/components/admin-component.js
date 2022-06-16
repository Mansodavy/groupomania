import React, { Component, useEffect } from "react";
import "react-router-dom";
import axios from "axios";
import AuthService from "../Middleware/authservice"; 

class Admincomponent extends Component {

    componentDidMount() {
      }
      
    render() {
      let result;
      let tempUser = AuthService.getCurrentUser();

      axios.get("http://localhost:5000/api/admin/lastuserregistered", {
                    headers: {
                        'Authorization': `Bearer ${tempUser.token}`
                    }
                }).then((res) => {
                  return res.data;
     });

      if(!result) {
        return (
            <div>
                <h1>Loading</h1>  
            </div> 
        )
    }else {
        return (
          (result) ? (
          <div>
      <section class="hero is-info welcome is-small">
              <div class="hero-body">
                <div class="container">
                  <h1 class="title">Bonjour, {tempUser.nom} {tempUser.prenom}</h1>
                  <h2 class="subtitle">J'espère que vous allez bien !</h2>
                </div>
              </div>
            </section>
            <br />
            <section class="info-tiles">
              <div class="tile is-ancestor has-text-centered">
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">439k</p>
                    <p class="subtitle">Utilisateurs Inscrit</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">59k</p>
                    <p class="subtitle">Posts</p>
                  </article>
                </div>
                <div class="tile is-parent">
                  <article class="tile is-child box">
                    <p class="title">3.4k</p>
                    <p class="subtitle">Commentaires</p>
                  </article>
                </div>
              </div>
            </section>
            <div class="columns">
              <div class="column ">
                <div class="card events-card">
                  <header class="card-header">
                    <p class="card-header-title">
                      Dernier utilisateurs inscrit
                    </p>
                    <a
                      href="#"
                      class="card-header-icon"
                      aria-label="more options"
                    >
                      <span class="icon">
                        <i class="fa fa-angle-down" aria-hidden="true"></i>
                      </span>
                    </a>
                  </header>
                  <div class="card-table">
                    <div class="content">
                      <table class="table is-fullwidth is-striped">
                        <tbody>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>{result[0].nom}</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td width="5%">
                              <i class="fa fa-bell-o"></i>
                            </td>
                            <td>Lorum ipsum dolem aire</td>
                            <td class="level-right">
                              <a class="button is-small is-primary" href="#">
                                Action
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  </div>
              </div>
              </div>
              </div>


          ) : (
              <div>
                  <h1>Loading</h1>
              </div>
      ))
    } 
      }
    }

export default Admincomponent;
