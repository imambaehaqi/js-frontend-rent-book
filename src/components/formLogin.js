import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'
import Axios from 'axios'

import {Form, Button} from 'react-bootstrap'

export class formLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            style: props.style,
            email: '',
            password: '',
            loggedIn: false,
            loading: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loggingIn = this.loggingIn.bind(this)
    }

    handleChange(event){
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        this.setState({
            loading: true
        })
        Axios.post('http://localhost:1150/users/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(this.loggingIn)
        .catch(function (error){
            console.log(error)
        })
        event.preventDefault()
    }

    loggingIn(res){
        this.setState({
            loading: false
        })
        console.log(res)
        const token = res.data.token
        if(token === undefined){
            window.alert(res.data.message)
        } else {
            document.cookie = `token=${token}`
            window.location.reload()
        }
    }

    render() {
        if(document.cookie.includes('token=Bearer ')) return <Redirect to = '../'/>
        else return (
            <div style={this.state.style} onSubmit={this.handleSubmit}>
                <div style={{marginLeft:'0px'}}>
                <h1>Login</h1>
                <a>Welcome Back, Please Login<br/>to your account</a>
                </div>
                <Form className="shadow col-lg-7" 
                    style={{ paddingTop:'8px', paddingBottom:'5px', marginBottom:'10px', marginTop:'10px'}}>
                    <Form.Group controlId="formBasicEmail" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">
                            Email:
                        </Form.Text>
                        <Form.Control type="email" placeholder="Enter email"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" style={{marginLeft:'10px'}}>
                        <Form.Text className="text-muted">
                            Password:
                        </Form.Text>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                </Form>
                <Button variant="dark" type="submit">
                        Login
                </Button><a>&nbsp;</a>
                <Link to="./register" className="btn btn-light" >SignUp</Link>
            </div>
        )
    }
}

export default formLogin
