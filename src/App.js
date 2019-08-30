import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import {Provider} from 'react-redux'

import './App.css'

import Auth from './pages/auth'
import Home from './pages/home'
import DetailBook from './pages/detailBooks'

import store from './publics/store'

const App = () => {
    return (
      <div>
        <Router>
          <Provider store={store}>
            <Route
              exact
              path={'/'}
              render={() => {
                return window.localStorage.getItem('token') !== null
                  ? <Redirect to='./home' />
                  : <Redirect to='./login' />
              }}
            />
            <Route
              path={'/home'}
              render={({props}) => {
                return <Home {...props}/>
              }}
            />
            <Route
              path={'/book/:id'}
              component={(props) => {
                return <DetailBook 
                {...props} bookId={props.match.params.bookid} 
                bookUrl={`http://localhost:1150/books/${props.match.params.id}`}
                bookid = {props.match.params.id} 
                key={props.history.location}/>
              }} 
            />
            <Route
              path={'/login'}
              render={({props}) => {
                return <Auth {...props}/>
              }}
            />
            <Route
              path={'/register'}
              render={({props}) => {
                return <Auth {...props}/>
              }}
            />
          </Provider>
        </Router>
      </div>
    )
}

export default App
