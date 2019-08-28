import React, { Component } from 'react'
import Axios from 'axios'
import {Dropdown} from 'react-bootstrap'

export class dropDownCat extends Component {
    constructor(props){
        super(props)
        this.state = {
            catList: [],
        }
    }

    componentDidMount = () => {
        Axios.get('http://localhost:1150/genres')
        .then (res => {
            this.setState ({catList: res.data.data})
        })
        .catch (err => console.log ('error = ', err))
    }

    render() {
        const {catList} = this.state
        return (
            <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Sort By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

export default dropDownCat
