import axios from "axios";
import authHeader from './authHeader';
const API_URL = 'http://localhost:5000/api/auth/';
class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "signin", {
        email: email,
        password: password,
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          window.location.reload();
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(nom, prenom, email, password) {
    return axios.post(API_URL + "signup", {
      nom,
      prenom,
      email,
      password,
      imageUrl: "http://localhost:5000/images/Avatar.jpg",
      roles: ["user"]
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService();