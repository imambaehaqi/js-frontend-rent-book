import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Dropdown} from 'react-bootstrap'

import {getBookPublish} from '../publics/actions/books'

class dropDownPublish extends Component {
    constructor(props){
        super(props)
        this.state = {
            publishList: [],
            history: props.history
        }
    }

    goToPublishPath = (publish) => {
        this.state.history.push(`/home/publish/${publish}/`)
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBookPublish())
        this.setState ({publishList: this.props.books.publishList})
    }

    render() {
        const {publishList} = this.state
        return (
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    All Times
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {publishList.length > 0 ?
                        publishList.map((publish, index) => {
                        return <Dropdown.Item key = {publish.publish}
                                onClick={() => {this.goToPublishPath(publish.publish)}}>
                                {publish.publish}
                                </Dropdown.Item>}):
                                <Dropdown.Item key="0" href = "#">Loading ...</Dropdown.Item>}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

const mapStateProps = state => {
    return{
        books: state.books
    }
}

export default connect(mapStateProps)(dropDownPublish)
