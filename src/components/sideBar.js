import React, { Component } from 'react'
import Axios from 'axios'
import {Container, Row, Button} from 'react-bootstrap'

import {Link} from 'react-router-dom'

export class sideBar extends Component {
    constructor(props){
        super(props)
        this.state = {
          username: props.username || "dummy",
          image: props.image || "https://icon-library.net/images/user-login-icon/user-login-icon-17.jpg",
          email: props.email || "dummy@gmail.com",
          level: props.level || "regular",
          fullname: props.fullname || "dummyfullname",
          id: props.id
        }
        this.handleLogout = this.handleLogout.bind(this)
      }
      handleLogout = (event) => { 
        const time = new Date()
        document.cookie = "token=; "+time.toUTCString+"path=/"
        window.location.reload()
      }
      componentDidMount(){
        Axios.get("http://localhost:1150/users/profile",{
          headers:{
            Authorization : document.cookie.split("=")[1],
          }
        })
          .then(res => {
            const userData=res.data.data;
            this.setState({
              username : userData.username,
              fullname : userData.fullname,
              email : userData.email,
              level : userData.level,
              id : userData.userid,
            })
          })
          .catch(err => console.log(err))
      }
    render(){
    return (
    <div>
        <img className="dashboard" src={this.state.image}/><hr/>
        <h3 style={{textAlign:'center'}}>Hello ..</h3>
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
              {/* <BookModal title="Add Book" content={<AddBookForm />}/> */}
              </Row>
              :''
          }
        <Row className="justify-content-md-left">
            <Button style={{width:'100%'}} variant="light" onClick={this.handleLogout} >Logout</Button>
        </Row>
        </Container>
    </div>)
    }
}

export default sideBar
