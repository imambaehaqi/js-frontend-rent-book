import React from 'react'
import {connect} from 'react-redux'
import { Alert, Button } from 'react-bootstrap'

import BookCard from './bookCard'
import {getBooks} from '../publics/actions/books'

class BooksList extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      dataSource: props.dataSource||"http://localhost:1150/books",
      history: props.history,
      data: null,
      page: 1
    }
  }
  componentDidMount(){
    this.getDataBooks(1)
  }

  page = (page) => {
    this.getDataBooks(this.state.page + page)
  }

  getDataBooks = async (page) => {
    await this.props.dispatch(getBooks(this.state.dataSource, page, this.props.sortby, this.props.search))
    this.setState({
      data: this.props.books,
      page: page
    })
  }
  
  render(){
    const {data} = this.state
    return(
        <div style={{marginTop:"3vh", padding:"3vw", textAlign:"left"}}>
          <div style={{display: 'flex', flexWrap:"wrap", flexDirection: 'row'}} className="justify-content-between">
            {
               data !== null && data.booksList ? 
               data.booksList.map((books, index) => {
                console.log(books.bookid)
                return(
                    <BookCard  
                      onClick={() => this.getDetails(index)}
                      key={books.bookid}
                      image={books.image} 
                      available={books.available}
                      genre={books.genreid}
                      bookid={books.bookid}
                      title={books.title}
                      description={books.description.substr(0,75)+'...'} />
                  )
                })
                :
                <Alert variant='danger'>Book Not Found</Alert>
            }
          </div>
          <Button className="btn btn-warning" 
            disabled={this.state.page === 1}
            onClick={()=>{this.page(-1)}}
            >{'<'}</Button>
          <Button variant="warning">{this.state.page}</Button>
          <Button className="btn btn-warning" onClick={()=>{this.page(1)}}>{'>'}</Button>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    books: state.books
  }
}

export default connect(mapStateToProps)(BooksList)