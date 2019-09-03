import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getNewestBooks} from '../publics/actions/books'

import { Carousel, Image } from 'react-bootstrap'

class carouselBooks extends Component {
  constructor(props){
    super(props)
    this.state = {
      popularBooksList: null
    }
    this.getDetails = this.getDetails.bind(this)
  }

  getDetails = (id) => {
    this.props.history.push(`/book/${id}`)
  }

  componentDidMount = async () => {
    await this.props.dispatch(getNewestBooks())
    this.setState ({popularBooksList: this.props.book.popularBooksList})
  }

  render () {
    const {popularBooksList} = this.state
    return (
      <Carousel style={{ marginTop: '30px' }}>
        {popularBooksList !== null ? popularBooksList.map((book, index) => {
          return (
            <Carousel.Item className='shadow-lg' key={index} onClick={()=>this.getDetails(book.id)}>
              <Image
                style={{height:'70vh', width:'90vh'}}
                className='align-item-center shadow-lg mb-5'
                src={book.image}
              />
            <Carousel.Caption className="shadow-lg" style={{backgroundColor:'black'}}>
              <h4>{book.title}</h4>
            </Carousel.Caption>
          </Carousel.Item>
          )
        }):<div></div>}
      </Carousel>
    )
  }
}

const mapStateToProps = state => {
  return{
    book: state.book
  }
}

export default connect(mapStateToProps)(carouselBooks)