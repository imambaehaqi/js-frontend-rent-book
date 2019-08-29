import React, { Component } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

import {connect} from 'react-redux'

class BookCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      image : props.image,
      bookid: props.bookid,
      title : props.title,
      description : props.description,
      available : props.available,
      genre : props.genre,
      redirectToDetails:false
    }
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails = () => {
    this.setState({redirectToDetails:true})
  }

  render () {
    if (this.state.redirectToDetails)
      return <Redirect to={`/book/${this.state.bookid}`}/>
    const {description} = this.state
    return (
      <Card className='card shadow-lg'
        onClick={() => this.redirectToDetails()}
        >
        <figure>
          <Card.Img variant='top' src={this.state.image} />
            {this.state.available === 1 ? 
            <Badge variant="warning" className="availability-badge">Available</Badge>
            : 
            <Badge variant="danger" className="availability-badge">Unavailable</Badge>}
        </figure>
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Badge variant="warning">{this.state.genreid}</Badge>
          <Card.Text>
            {description.length > 30 ?  description.substr(0,75)+'...': description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}
export default connect(mapStateToProps)(BookCard)
