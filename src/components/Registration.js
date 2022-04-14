import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import logo from '../images/icongroupomanianoir.png';
const Register = () => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const history = useNavigate();
    let navigate = useNavigate(); 
    const routeChange = () =>{ 
    let path = `/Connexion`; 
    navigate(path);
    }
 
    const Register = async (e) => {
        
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/signup', {
                nom: nom,
                prenom: prenom,
                email: email,
                password: password,
                imageUrl: "http://localhost:5000/images/Avatar.jpg",
                roles: ["user"]
            });
            navigate("/Connexion");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }
 
    return (
        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <nav className="navbar ml-auto mr-auto" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="" href="http://localhost:3000">
            <img className=".container-image " width="150"
              src={logo}
              alt="Logo Groupomania"
            />
          </a>
        </div>
      </nav>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <p className="has-text-centered">{msg}</p>
                                <div className="field mt-5">
                                    <label className="label">Nom</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Name"
                                            value={nom} onChange={(e) => setNom(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Prenom</label>
                                    <div className="controls">
                                        <input type="text" className="input" placeholder="Prenom" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Email</label>
                                    <div className="controls">
                                        <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Password</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-link is-fullwidth">Inscription</button>
                                </div>

                                <button className="button is-info is-fullwidth" onClick={routeChange}>
                                Déjà un compte ?
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    <footer>
        <Footer/>
    </footer>
        </section>
    )
}

export default Register
