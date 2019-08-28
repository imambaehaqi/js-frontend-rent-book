import React, { Component } from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

import {Form, Button} from 'react-bootstrap'

class formRegister extends Component {
    constructor(props){
        super(props)
    
        this.state = {
            style: props.style,
            formData:{
                username: '',
                fullname:'',
                email:'',
                password:''
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    handleChange(event){
        let newFormData = {...this.state.formData}
        const target = event.target
        const name = target.name
        const value = target.value
        newFormData[name] = value
        this.setState({
            formData: newFormData
        })
    }

    handleSubmit(event){
        Axios.post('http://localhost:1150/users/register', this.state.formData)
            .then(res => console.log(res, 'aaa'))
            .catch(err => console.log(err))
        event.preventDefault()
    }

    render() {
        return (
            <div style={this.state.style} onSubmit={this.handleSubmit}>
                <div style={{marginLeft:'0px'}}>
                    <h1>Register</h1>
                    <a>Welcome Back, Please Register<br/>to create account</a>
                </div>
                <Form className="shadow col-lg-7"
                    style={{ paddingTop:'8px', paddingBottom:'5px', marginBottom:'10px', marginTop:'10px'}}>
                    <Form.Group controlId="formBasicUsername" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">Username:</Form.Text>
                        <Form.Control name="username" type="text" onChange={this.handleChange} placeholder="Enter username"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicFullname" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">Fullname:</Form.Text>
                        <Form.Control name="fullname" type="text" onChange={this.handleChange} placeholder="Enter fullname"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">Email:</Form.Text>
                        <Form.Control name="email" type="email" onChange={this.handleChange} placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">Password:</Form.Text>
                        <Form.Control name="password" type="password" onChange={this.handleChange} placeholder="Enter password"/>
                    </Form.Group>
                </Form>
                <Button variant="dark" type="submit" className="btn-black">SignUp</Button><a>&nbsp;</a>
                <Link to="./login" className="btn btn-light" >Login</Link>
            </div>
        )
    }
}

export default formRegister
