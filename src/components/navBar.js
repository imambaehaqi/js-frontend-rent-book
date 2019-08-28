import React from 'react'
import Axios from 'axios'
import { Route } from 'react-router-dom'

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import DropDownCats from './dropDownCats'
import DropDownTimes from './dropDownTimes'
import DropDownSortBy from './dropDownSort'
import SideBarUser from './sideBar'
import BooksList from './bookList'

import Sidebar from 'react-sidebar'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        sidebarOpen: true
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen(open){
      this.setState({sidebarOpen: open})
  }

  // componentWillMount(){
  //   if(!document.cookie.includes('token=Bearer'))
  //   window.location.replace('http://localhost:3000/')

  //   Axios.get('http://localhost:1150/users/profile', {
  //       headers:{
  //           Authorization : document.cookie.split('=')[1],
  //       }
  //   })
  //   .then(res => {
  //       const userData = res.data.data
  //       this.setState({
  //           userData : userData
  //       })
  //   })
  //   .catch(err => console.log(err))
  // }

  render () {
    return (
      <div>
        <Sidebar
          sidebar = {<SideBarUser
            username="Imam"
          />}
          open = {this.state.sidebarOpen}
          onSetOpen = {this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", zIndex:"20", width:'20%', position:'fixed'} }}>
        </Sidebar>
        <Navbar bg="light" variant="light" className="shadow" fixed="top">
          <Nav className="mr-auto">
            <Button variant="light" onClick={() => this.onSetSidebarOpen(true)}>
                  <FontAwesomeIcon icon={faBars}/>
            </Button><a>&nbsp;</a>
            <DropDownCats/><a>&nbsp;</a>
            <DropDownTimes/><a>&nbsp;</a>
            <DropDownSortBy/>
            <a style={{marginLeft:'250px'}}>&nbsp;</a>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Nav>
          <Navbar.Brand href="http://localhost:3001/home">
            <img src={require('../bookshelf.svg')} style={{width:'50px', height:'50px'}}/>
            <b>Book's</b>
          </Navbar.Brand>
        </Navbar>
        <Route 
          path="/home/explore" 
          exact={true}
          render={() => {
              return(
              <div>
                  <BooksList dataSource={`http://localhost:3030/books${window.location.search}`}/>
              </div>
              );
          }} 
        />
        <Route 
            path="/home/history" 
            exact={true}
            render={() => {
                if(this.state.userData !== undefined )
                return(
                    <div>
                    <BooksList dataSource={`http://localhost:3030/borrowings/history/${this.state.userData.id}`}/>
                    </div>
                );
                else 
                return(
                    <div>
                    Loading...
                    </div>
                );
            }} 
        />
        <Route 
            path="/home/genre/:genre" 
            component={(url) => {
                return <BooksList dataSource={`http://localhost:3030/books/genre/${url.match.params.genre}`}/>;
            }} 
            />
            <Route 
            path="/home/year/:year" 
            component={(url) => {
                return <BooksList dataSource={`http://localhost:3030/books/year/${url.match.params.year}`}/>;
            }} 
        />
      </div>
      )
    }
  }

export default NavBar