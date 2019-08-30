import React from 'react'
import {connect} from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import {getGenres} from '../publics/actions/genres'

class DropDownGenre extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      genreList: [],
      history: props.history
    }
  }

  goToGenrePath = (genreName) =>{
    this.state.history.push(`/home/genre/${genreName}/`)
  }

  componentDidMount = async () => {
    await this.props.dispatch(getGenres())
    this.setState ({genreList: this.props.genre.genreList})
  };
  render() {
    const {genreList} = this.state
    return(
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          All Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {genreList.length > 0 ? 
            genreList.map((genre) => {
              return <Dropdown.Item key={genre.name} onClick={()=>{this.goToGenrePath(genre.name)}}>{genre.name}</Dropdown.Item>
            }):
            <Dropdown.Item href="#">Loading...</Dropdown.Item>}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const mapStateToProps = state => {
  return{
    genres: state.genres
  }
}

export default connect(mapStateToProps)(DropDownGenre)