import React, { Component } from 'react'
import {Pagination} from 'react-bootstrap'

export class pagiNation extends Component {
    render() {
        return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active variant='warning'>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
        )
    }
}

export default pagiNation
