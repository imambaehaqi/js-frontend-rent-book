import React, { Component } from 'react'
import { Card, Badge } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class BookCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      image : props.image,
      bookid: props.bookid,
      title : props.title,
      description : props.description,
      available : props.available,
      genreid : props.genreid,
      redirectToDetails:false,
    }
    this.redirectToDetails = this.redirectToDetails.bind(this)
  }

  redirectToDetails = () =>{
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
            {this.state.availability === 1 ? 
            <Badge variant="warning" className="availability-badge">Available</Badge>
            : 
            <Badge variant="danger" className="availability-badge">Unavailable</Badge>}
        </figure>
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Badge variant="warning">{this.state.genre}</Badge>
          <Card.Text>
            {description.length > 30 ?  description.substr(0,75)+'...': description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default BookCard
