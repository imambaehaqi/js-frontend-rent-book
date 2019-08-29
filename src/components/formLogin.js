import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

import {connect} from 'react-redux'
import {login} from '../publics/actions/users'

class formLogin extends Component {
  constructor(props){
    super(props)
    this.state = {
      style: props.style,
      email: '',
      password:'',
      loggedIn:false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email, 
      password: this.state.password
    }
    await this.props.dispatch(login(data))
    window.localStorage.setItem("token", this.props.users.token)
    this.setState({
      loggedIn:true
    })
  }

  render () {
    if(window.localStorage.getItem("token")) return <Redirect to="../"/>
    else return (
      <div>
        <div style={{ marginLeft: '0px' }}>
          <h1>Login</h1>
          <a>Welcome Back, Please Login<br />to your account</a>
        </div>
        <div style={this.state.style} onSubmit={this.handleSubmit}>
          <Form className='shadow col-lg-7'
            style={{ paddingTop: '8px', paddingBottom: '5px', marginBottom: '10px', marginTop: '10px' }}>
            <Form.Group controlId='formBasicEmail' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>
                            Email:
              </Form.Text>
              <Form.Control type='email' placeholder='Enter email' name="email"
                onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId='formBasicPassword' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>
                            Password:
              </Form.Text>
              <Form.Control type='password' placeholder='Password' name="password"
                onChange={this.handleChange}/>
            </Form.Group>
          </Form>
          <Button variant='dark' type='submit'>
                        Login
          </Button><a>&nbsp;</a>
          <Link to='./register' className='btn btn-light' >SignUp</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    users: state.users
  }
}

export default connect(mapStateToProps)(formLogin)
