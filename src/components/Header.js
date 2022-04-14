import React from 'react'
import 'react-router-dom'
import logo from '../images/icongroupomanianoir.png';

function Header() {
    return (
<nav className="navbar is-transparent">
    <div className="navbar-brand ">
          <a className="" href="http://localhost:3000">
            <img className=".container-image ml-5 mr-5 mt-2" width="100"
              src={logo}
              alt="Logo Groupomania"
            />
          </a>
    <div className="navbar-burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" className="navbar-menu">
    <div className="navbar-start">
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="field is-grouped">
        <div className="navbar-item has-dropdown is-hoverable ">
        <a className="navbar-link mr-6" >
          Menu
        </a>
        <div className="navbar-dropdown is-boxed mr-10">
          <a className="navbar-item" href="http://localhost:3000/Profil">
            Profil
          </a>
          <a className="navbar-item" href="http://localhost:3000/Messages">
            Messages
          </a>
          <a className="navbar-item" href="http://localhost:3000/Groupes">
            Groupes
          </a>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    )
}

export default Header
