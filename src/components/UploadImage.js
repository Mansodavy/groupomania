import React, { Component } from "react";
import axios from 'axios';

export default class UploadImages extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            imageURL: ''
        }
    }
    
    onFileChange(e) {
        this.setState({ imageURL: e.target.files[0] })
    }
    onSubmit(e) {
        const user = JSON.parse(localStorage.getItem('user'));
        e.preventDefault()
        const formData = new FormData()
        formData.append('imageURL', this.state.imageURL)
        axios.put("http://localhost:5000/api/user/image", formData, {
            headers: {
                Authorization: `Bearer ${user.token}`,
              },
        }).then(res => {
            console.log(res)
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form>
                        <h3>React File Upload</h3>
                        <div className="form-group">
                            <input type="file" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}