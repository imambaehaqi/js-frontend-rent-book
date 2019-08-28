import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import './App.css'

import Auth from './pages/auth'
import Home from './pages/home'
import DetailBook from './pages/detailBooks'

const App = () => {
    return (
      <div>
        <Router>
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
        </Router>
      </div>
    )
}

export default App
