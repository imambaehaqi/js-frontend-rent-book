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
              render={({history}) => {
                return <Home history = {history}/>
              }}
            />
            <Route
              path={'/book/:id'}
              component={({match,history}) => {
                return <DetailBook history={history} bookId={match.params.id} 
                  bookUrl={`http://localhost:1150/books/${match.params.id}`} 
                  key={history.location}/>;
              }} 
            />
            <Route
              path={'/login'}
              render={({history}) => {
                return <Auth history = {history}/>
              }}
            />
            <Route
              path={'/register'}
              render={({history}) => {
                return <Auth history = {history}/>
              }}
            />
          </Provider>
        </Router>
      </div>
    )
}

export default App
