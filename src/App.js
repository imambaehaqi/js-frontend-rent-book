import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Auth from './pages/auth'
import Home from './pages/home'
import DetailBooks from './pages/detailBooks'

class App extends React.Component {
  constructor (props) {
    super(props)
    const isLoggedIn = document.cookie.includes('token=Bearer ')
    this.state = {
      loggedIn: isLoggedIn
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <Router>
          <Route
            exact
            path={'/'}
            render={() => {
              return this.state.loggedIn
                ? <Redirect to='./home' />
                : <Redirect to='./login' />
            }}
          />
          <Route
            path={'/home'}
            render={() => {
              return <Home />
            }}
          />
          <Route
            path={'/detail'}
            component={(url) => {
              return <DetailBooks bookUrl={`http://localhost:1150/books/${url.match.params.bookid}`} />
            }}
          />
          <Route
            path={'/login'}
            render={() => {
              return <Auth />
            }}
          />
          <Route
            path={'/register'}
            render={() => {
              return <Auth />
            }}
          />
        </Router>
      </div>
    )
  }
}

export default App
