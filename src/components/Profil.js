import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer'
import logo from '../images/icongroupomanianoir.png';
import Header from '../components/Header'
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
                roles: ["user"]
            });
            navigate("/Connexion");
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };
    const getOneUser = async (e) => {
        e.preventDefault();
        let id = window.localStorage.getItem("ID");
        try {
            const request = await axios.get('http://localhost:5000/api/user/getOneUser/' + id , {});
            console.log(request.data);
            window.localStorage.setItem("imageUrl", request.data.imageUrl);
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        } 
    };
    const requete = window.localStorage.getItem("imageUrl");
    window.onload = getOneUser;

    window.onload = requete;
    return (
        <section className="hero has-background is-fullheight is-fullwidth has-background-grey-light ">
            <Header/>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Register} className="box">
                                <label className="label">Modifier le profil</label>
                                <div className="field mt-5">
                                    <figure className="image is-128x128 mx-auto">
                                    <img className="is-rounded" src={requete} />
                                    </figure>
                                    <br/>
                                    <label className="label">Modifier L'image</label>
                                    <div className="controls mx-auto">
                                    <div className="file has-name is-boxed mx-auto">
                                    <label className="file-label mx-auto" >
                                        <input className="file-input" type="file" name="resume"/>
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose a file…
                                        </span>
                                        </span>
                                        <span className="file-name">
                                        Screen Shot 2017-07-29 at 15.54.25.png
                                        </span>
                                    </label>
                                    </div>
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Mot de passe</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <label className="label">Confirmation</label>
                                    <div className="controls">
                                        <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="field mt-5">
                                    <button className="button is-link is-fullwidth">Modifier les informations</button>
                                </div>
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
