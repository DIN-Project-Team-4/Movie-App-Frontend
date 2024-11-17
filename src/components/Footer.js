import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './Footer.css'

const Footer = () => {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center py-3'>
                    CopyRight &copy; cineScope
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer