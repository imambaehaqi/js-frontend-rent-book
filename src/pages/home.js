import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import Navbar from '../components/navBar'
import CarouselBooks from '../components/carouselBooks'
import BookCard from '../components/bookCard'
import Pagination from '../components/pagiNation'

export class home extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <div className='container'>
          <CarouselBooks /><hr />
          <h1>List Book's</h1><hr />
          <BookCard /><hr />
          <Pagination />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
  }
}
export default connect(mapStateToProps)(home)