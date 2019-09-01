import React, { Component } from 'react'
import {Container, Row, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProfile} from '../publics/actions/users'
import ModalAddBook from './modalAddBook'

class sideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: props.username || "dummy",
      image: props.image || "https://icon-library.net/images/user-login-icon/user-login-icon-17.jpg",
      email: props.email || "dummy@gmail.com",
      level: props.level || "regular",
      fullname: props.fullname || "dummyfullname",
      userid: props.userid,
      history: props.history
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout = (event) => { 
    window.localStorage.removeItem("token")
    if(window.localStorage.getItem("token") === null)
      this.props.history.push('/')
  }

  componentDidMount = async() => {
    await this.props.dispatch(getProfile())
    this.setState({
      ...this.props.users.usersProfile
    })
  }

  render(){
    return (
      <div>
          <Image className="dashboard" src={this.state.image}/><hr/>
          <h5 style={{textAlign:'center'}}><h6>Card Number:</h6><b>CM-{this.state.userid}</b></h5>
          <h4 style={{textAlign:'center'}}>{this.state.fullname}</h4><hr/>
          <Container className="sidebar-buttons ">
            <Row className="justify-content-md-left">
                <Link to="/home/explore" className="btn" style={{width:'100%'}} variant="light">Explore</Link>
            </Row>
            <Row className="justify-content-md-left">
                <Link to="/home/history" className="btn" style={{width:'100%'}} variant="light">History</Link>
            </Row>
              {
                  this.state.level === "admin" ? 
                  <Row className="justify-content-md-left">
                    <ModalAddBook history={this.props.history}/>
                  </Row>
                  :''
              }
            <Row className="justify-content-md-left">
                <Link style={{width:'100%'}} className="btn" variant="light" onClick={this.handleLogout} >Logout</Link>
            </Row>
          </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}

export default connect(mapStateToProps)(sideBar)
