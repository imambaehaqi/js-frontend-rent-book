import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import {getBookPublish} from '../publics/actions/books';

class DropDownPublish extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      publishList: [],
      history: props.history
    }
  }
  
  goToYearPath = (year) =>{
    this.state.history.push(`/home/year/${year}`)
  }

  componentDidMount = async () => {
    await this.props.dispatch(getBookPublish())
    this.setState ({publishList: this.props.books.publishList})
  }

  render() {
    const {publishList} = this.state
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Time
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {publishList.length > 0 ? 
            publishList.map((year, index) => {
              return <Dropdown.Item key={year.year} onClick={()=>{this.goToYearPath(year.year)}}>{year.year}</Dropdown.Item>
            }):
            <Dropdown.Item key="0" href="#">Loading...</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => {
  return{
    books: state.books
  }
}
export default connect(mapStateToProps)(DropDownPublish)