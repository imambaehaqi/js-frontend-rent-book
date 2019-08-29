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
    handleClose = () => {
      this.setState({showModal: false})
    }
  }

  handleChange (event) {
    const newFormData = { ...this.state.formData }
    const target = event.target
    const name = target.name
    const value = target.value
    newFormData[name] = value
    this.setState({
      formData: newFormData
    })
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
          modalMessage: this.props.users.errMessage
        })
      })
  }

  render () {
    return (
      <div>
        <div style={{ marginLeft: '0px' }}>
          <h1>Register</h1>
          <a>Welcome Back, Please Register<br />to create account</a>
        </div>
        <div style={this.state.style} onSubmit={this.handleSubmit}>
          <Form className='shadow col-lg-7'
            style={{ paddingTop: '8px', paddingBottom: '5px', marginBottom: '10px', marginTop: '10px' }}>
            <Form.Group controlId='formBasicUsername' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>Username:</Form.Text>
              <Form.Control name='username' type='text' onChange={this.handleChange} placeholder='Enter username' />
            </Form.Group>
            <Form.Group controlId='formBasicFullname' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>Fullname:</Form.Text>
              <Form.Control name='fullname' type='text' onChange={this.handleChange} placeholder='Enter fullname' />
            </Form.Group>
            <Form.Group controlId='formBasicEmail' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>Email:</Form.Text>
              <Form.Control name='email' type='email' onChange={this.handleChange} placeholder='Enter email' />
            </Form.Group>
            <Form.Group controlId='formBasicPassword' style={{ marginLeft: '10px' }}>
              <Form.Text className='text-muted'>Password:</Form.Text>
              <Form.Control name='password' type='password' onChange={this.handleChange} placeholder='Enter password' />
            </Form.Group>
          </Form>
          <Button variant='dark' type='submit' className='btn-black'>SignUp</Button><a>&nbsp;</a>
          <Link to='./login' className='btn btn-light' >Login</Link>
        </div>
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
    users: state.users
  }
}

export default connect(mapStateToProps)(formRegister)
