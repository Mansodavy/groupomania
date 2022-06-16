import React, { Component } from "react";
import UserService from "../Middleware/userservice";
import { useNavigate, useHistory, Link } from "react-router-dom";
import Footer from "../View/Footer";
import Postinfo from "../components/Postinfo";
import Admincomponent from "./admin-component";
export default class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      posts: [],
    };
  }
  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    return (
      <section>
        <div class="container">
          <div class="columns">
            <div class="column is-3 ">
              <aside class="menu is-hidden-mobile">
                <br />
                <p class="menu-label">General</p>
                <ul class="menu-list">
                  <li>
                    <a class="is-active">Statistiques</a>
                  </li>
                </ul>
                <p class="menu-label">Administration</p>
                <ul class="menu-list">
                  <li>
                    <a>Panel des postes</a>
                  </li>
                  <li>
                    <a>Panel des Utilisateurs</a>
                  </li>
                  <li>
                    <a>Panel des Commentaires</a>
                  </li>
                </ul>
              </aside>
            </div>
            <div class="column is-9">
              <nav class="breadcrumb" aria-label="breadcrumbs"></nav>
              <Admincomponent />

            </div>
          </div>
        </div>

        <br />
        <footer>
          <Footer />
        </footer>
      </section>
    );
  }
}
