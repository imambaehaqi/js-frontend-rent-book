import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import FormLogin from '../components/formLogin'
import FormRegister from '../components/formRegister'

class auth extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedIn: this.isLoggedIn()
    }
    if(this.isLoggedIn())
      props.history.push('/')
  }

  isLoggedIn(){
    return window.localStorage.getItem('token')
  }

  render () {
    return (
      <div className='app'>
        <div className='main'>
          <div className='left-bg'>
            <div className='text-margin'>
              <div>
                <h1>Book is a window<br />to the world</h1>
              </div>
              <div>
                <h3>Photo by Mark Pan4ratte on Unsplash</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='right-form'>
          <img src={require('../bookshelf.svg')} />
          <Route
            path={'/login'}
            render={() => {
              return (
                this.state.loggedIn ? this.props.history.push('/')
                  : <div>
                    <FormLogin />
                  </div>
              )
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return (
                  <div>
                    <FormRegister />
                  </div>
              )
            }}
          />
          <br />
          <div>
            <h6>By signing up, you agree to Book's
              <br />Terms and Conditions <a>&</a> Privacy Policy
            </h6>
          </div>
        </div>
      </div>
    )
  }
}

export default auth
