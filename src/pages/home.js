import React from 'react'
import Sidebar from 'react-sidebar'
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import {Button, Navbar} from 'react-bootstrap'

import BooksList from '../components/bookList'
import UserSideBar from '../components/sideBar'
import Bookshelf from '../bookshelf.svg'
import GenreDropdown from "../components/dropDownGenre"
import YearDropdown from '../components/dropDownTimes'
import PopularBooksCarousel from '../components/carouselBooks'
import SortByDropdown from '../components/dropDownSort'
import {SearchBook} from '../components/searchBooks'
import {getProfile} from '../publics/actions/users'
import AvailabilityDropdown from '../components/dropDownAvailable'
import HistoryTable from '../components/historyBorrow'

class Home extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      sidebarOpen : false,
      search:"",
      userData:undefined,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this)
    
  }
  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen : open
    })
  }
  componentDidMount= () => {
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
    if(!this.props.user.userProfile)
      this.props.dispatch(getProfile())
  }

  render(){
    return(
      <div>
        <Sidebar
          children={''}
          sidebar={
            <UserSideBar
              history={this.props.history}
            />}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
          styles={{ sidebar: { background: "white", zIndex:"20", position:"fixed" } }}
        >
        </Sidebar>
        <Navbar className="bg-light justify-content-between shadow-lg">
          <Button variant="light" onClick={() => this.onSetSidebarOpen(true)}>
            <FontAwesomeIcon icon={faBars}/>
          </Button>
          <GenreDropdown history={this.props.history}/>
          <YearDropdown history={this.props.history}/>
          <SortByDropdown history={this.props.history}/>
          <AvailabilityDropdown history={this.props.history} />
          <SearchBook history={this.props.history}/>
          <Navbar.Brand onClick={()=>{this.props.history.push("/home")}}>
            <img src={Bookshelf} alt="bookshelf" style={{width:'50px'}}/><b>Book's</b>
          </Navbar.Brand>
        </Navbar>
        <Route 
          path="/home" 
          exact={true}
          render={({history}) => {
            let params = new URLSearchParams(window.location.search)
            return(
              <div>
                <PopularBooksCarousel history={history}/>
                <BooksList 
                  availability={params.get("availability")}
                  history={history} 
                  sortby={params.get("sortby")} 
                  search={params.get("search")} 
                  dataSource={`http://localhost:1708/books`} 
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
                <BooksList
                  availability={params.get("availability")} 
                  history={history}
                  sortby={params.get("sortby")} 
                  search={params.get("search")} 
                  dataSource={`http://localhost:1708/books`} 
                  key={window.location.href} />
              </div>
            );
          }} 
        />
        <Route 
          path="/home/history" 
          exact={true}
          render={({history}) => {
            if(this.props.user.userProfile.id !== undefined )
              return(
                <div>
                  <HistoryTable history={history} />
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
            return <BooksList dataSource={`http://localhost:1708/books/genre/${url.match.params.genre}`}/>;
          }} 
        />
        <Route 
          path="/home/year/:year" 
          component={(url) => {
            return <BooksList dataSource={`http://localhost:1708/books/year/${url.match.params.year}`}/>;
          }} 
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}
export default connect(mapStateToProps)(Home)