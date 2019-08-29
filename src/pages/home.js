import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import CarouselBooks from '../components/carouselBooks'
import BooksList from '../components/bookList'

import { Navbar, Nav, Button } from 'react-bootstrap'
import DropDownCats from '../components/dropDownCats'
import DropDownTimes from '../components/dropDownTimes'
import DropDownSortBy from '../components/dropDownSort'
import SideBarUser from '../components/sideBar'
import {SearchBooks} from '../components/searchBooks'

import Sidebar from 'react-sidebar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { getProfile } from '../publics/actions/users'

class home extends React.Component {
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
            <SearchBooks history={this.props.history}/><a></a>
          </Nav>
          <Navbar.Brand onClick={()=>{this.props.history.push("/home")}}>
            <img src={require('../bookshelf.svg')} style={{ width: '50px', height: '50px' }} />
            <b>Book's</b>
          </Navbar.Brand>
        </Navbar>
        <Route 
          path="/home" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <CarouselBooks history={history}/>
                <BooksList 
                  availability={params.get("available")} 
                  history={history} 
                  sortby={params.get("sortby")} 
                  search={params.get("search")} 
                  dataSource={`http://localhost:1150/books`} 
                  key={window.location.href + this.state} />
              </div>
            );
          }} 
        />
        <Route 
          path="/home/explore" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <BooksList history={history} sortby={params.get("sortby")} search={params.get("search")} dataSource={`http://localhost:1150/books`} 
                  key={window.location.href} />
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
                  <BooksList dataSource={`http://localhost:1150/borrows/history/${this.state.userData.userid}`}/>
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
            return <BooksList dataSource={`http://localhost:1150/books/genres/${url.match.params.genre}`}/>;
          }} 
        />
        <Route 
          path="/home/publish/:publish" 
          component={(url) => {
            return <BooksList dataSource={`http://localhost:1150/books/publish/${url.match.params.year}`}/>;
          }} 
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users,
  }
}

export default connect(mapStateToProps)(home)
