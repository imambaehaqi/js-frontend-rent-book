import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css'

import Home from './pages/home'
import Auth from './pages/auth'
import BookDetail from './pages/detailBooks';

const App=()=> {
  return (
    <div className='App'>
      <Router>
      <Route
          exact={true}
          path={'/'}
          render={() => {
            return window.localStorage.getItem("token") !== null ? 
            <Redirect to="./home"/>
            :
            <Redirect to="./login"/>;
          }}
        />
        <Route
          path={'/home'}
          render={(props) => {
            return <Home {...props}/>
          }}
        />
        <Route
          path={'/book/:id'}
          component={(props) => {
            return <BookDetail {...props} bookId={props.match.params.id} bookUrl={`http://localhost:1708/books/${props.match.params.id}`} key={props.history.location}/>;
          }} 
        />
        <Route
          path={'/login'}
          render={(props) => {
            return <Auth {...props}/>;
          }}
        />
        <Route
          path={'/register'}
          render={(props) => {
            return <Auth {...props}/>;
          }}
        />
      </Router>
    </div>
  )
}

export default App
