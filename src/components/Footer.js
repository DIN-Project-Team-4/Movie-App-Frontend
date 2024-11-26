import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
    return (
        <Container fluid className="footer">
            <Row>
                <Col className='text-center py-3'>
                    CopyRight &copy; CineScope
                </Col>
            </Row>
        </Container>
    )
}

export default Footer