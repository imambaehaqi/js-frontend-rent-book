import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'

export class BookCard extends Component {
    render() {
        return (
            <Card className='card shadow-lg'>
                <Card.Img variant="top" src={require('../libpict.svg')} />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="warning">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }
}

export default BookCard
