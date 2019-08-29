import React from 'react'
import { Route } from 'react-router-dom'

import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import DropDownCats from './dropDownCats'
import DropDownTimes from './dropDownTimes'
import DropDownSortBy from './dropDownSort'
import SideBarUser from './sideBar'
import BooksList from './bookList'

import Sidebar from 'react-sidebar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getProfile } from '../publics/actions/users';

class NavBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sidebarOpen: false,
      search:"",
      userData:undefined
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
  }

  onSetSidebarOpen (open) {
    this.setState({ sidebarOpen: open })
  }

  componentDidMount = async () => {
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
      await this.props.dispatch(getProfile())
      this.setState({
        userData: this.props.users.userProfile
      })
  }

  render () {
    return (
      <div>
        <Sidebar
          sidebar={<SideBarUser
            history={this.props.history}
          />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: 'white', zIndex: '20', width: '20%', position: 'fixed' } }} />
        <Navbar bg='light' variant='light' className='shadow' fixed='top'>
          <Nav className='mr-auto'>
            <Button variant='light' onClick={() => this.onSetSidebarOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </Button><a>&nbsp;</a>
            <DropDownCats history={this.props.history}/><a>&nbsp;</a>
            <DropDownTimes history={this.props.history}/><a>&nbsp;</a>
            <DropDownSortBy history={this.props.history}/><a>&nbsp;</a>
            <a style={{ marginLeft: '250px' }}>&nbsp;</a>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
          </Nav>
          <Navbar.Brand href='http://localhost:3001/home'>
            <img src={require('../bookshelf.svg')} style={{ width: '50px', height: '50px' }} />
            <b>Book's</b>
          </Navbar.Brand>
        </Navbar>
        <Route
          path='/home/explore'
          exact
          render={() => {
            return (
              <div>
                <BooksList dataSource={`http://localhost:3030/books${window.location.search}`} />
              </div>
            )
          }}
        />
        <Route
          path='/home/history'
          exact
          render={() => {
            if (this.state.userData !== undefined) {
              return (
                <div>
                  <BooksList dataSource={`http://localhost:3030/borrowings/history/${this.state.userData.id}`} />
                </div>
              )
            } else {
              return (
                <div>
                    Loading...
                </div>
              )
            }
          }}
        />
        <Route
          path='/home/genre/:genre'
          component={(url) => {
            return <BooksList dataSource={`http://localhost:3030/books/genre/${url.match.params.genre}`} />
          }}
        />
        <Route
          path='/home/year/:year'
          component={(url) => {
            return <BooksList dataSource={`http://localhost:3030/books/year/${url.match.params.year}`} />
          }}
        />
      </div>
    )
  }
}

export default NavBar
