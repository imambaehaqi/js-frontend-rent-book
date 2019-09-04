import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Form, Button, Modal } from 'react-bootstrap'

import {register} from '../publics/actions/users'

class formRegister extends Component {
  constructor (props) {
    super(props)

    this.state = {
      style: props.style,
      formData: {
        username: '',
        fullname: '',
        email: '',
        password: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleClose = () => {
    this.setState({showModal: false})
  }

  handleChange = (event) => {
    let newFormData = {...this.state.formData}
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    },()=>{console.log(this.state.formData)})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.dispatch(register(this.state.formData))
      .then(res => {
        this.setState({
          showModal: true,
          modalTitle:"Success Register",
          modalMessage: res.action.payload.data.message
        })
      })
      .catch(()=>{
        this.setState({
          showModal:true,
          modalTitle:"Failed Register",
          modalMessage: this.props.user.errMessage
        })
      })
  }

  render () {
    return (
      <div className="container">
        <h1 className="text-left">Register</h1>
        <h6>Welcome Back, Please Register<br />to create account</h6>
        <Form className='shadow col-lg-8 text-left' style={this.state.style} onSubmit={this.handleSubmit}>
          <Form.Group controlId='formBasicUsername'>
            <Form.Text className='text-muted'>Username:</Form.Text>
            <Form.Control name='username' type='text' onChange={this.handleChange} placeholder='Enter username' />
          </Form.Group>
          <Form.Group controlId='formBasicFullname'>
            <Form.Text className='text-muted'>Fullname:</Form.Text>
            <Form.Control name='fullname' type='text' onChange={this.handleChange} placeholder='Enter fullname' />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Text className='text-muted'>Email:</Form.Text>
            <Form.Control name='email' type='email' onChange={this.handleChange} placeholder='Enter email' />
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <Form.Text className='text-muted'>Password:</Form.Text>
            <Form.Control name='password' type='password' onChange={this.handleChange} placeholder='Enter password' />
          </Form.Group>
          <Button variant='dark' type='submit' className='btn-black'>SignUp</Button>
          <Link to='./login' className='btn btn-light' >Login</Link>
        </Form>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
            <Modal.Header>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.state.modalMessage}</Modal.Body>
            <Modal.Footer>
              <Button variant="warning" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(formRegister)