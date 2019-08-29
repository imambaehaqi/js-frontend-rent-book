import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import { Form, Button } from 'react-bootstrap'
import {login} from '../publics/actions/users'

class formLogin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      style: props.style,
      email: '',
      password:'',
      loggedIn:false,
      showModal:false,
      modalTitle:'',
      modalMessage:''
  }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      email: this.state.email, 
      password: this.state.password
  }

  this.props.dispatch(login(data))
    .then (res => {
      window.localStorage.setItem("token", res.action.payload.data.token)
      console.log(window.localStorage.getItem('token'))
      this.setState({
        loggedIn:true
      })
    })

    .catch (() => {
      this.setState({
        showModal:true,
        modalTitle:"Failed",
        modalMessage:this.props.user.errMessage
      })
    })
  }

  render () {
    if(window.localStorage.getItem("token")) return <Redirect to="../"/>
    else return (
      <div>
        <div>
          <h1>Login</h1>
          <a>Welcome Back, Please Login<br />to your account</a>
        </div>
        <div>
          <Form className='shadow col-lg-7' style={this.state.style} onSubmit={this.handleSubmit}
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
            <Button variant='dark' type='submit'>
                        Login
            </Button><a>&nbsp;</a>
          </Form>
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
