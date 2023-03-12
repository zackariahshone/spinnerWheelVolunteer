import React from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import "./style.css";


const houses = ['house1','house2','house3','house4']
export const Admin = () => {
    return (
        <>
            <p>ADMIN PAGE</p>
            
            <Container>
                <Row>
                    <Col
                        className="adminGroup"
                        xs={4}
                    >
                    <h4>add house</h4>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">House Name</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                        </InputGroup>
                        <br />
                        <InputGroup size = "sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                house values
                            </InputGroup.Text>
                            <Form.Control
                                aria-label="Default"
                                aria-describedby="inputGroup-sizing-default"
                            />
                        </InputGroup>
                        <br />
                        <InputGroup size="sm">
                            <InputGroup.Text id="inputGroup-sizing-lg">house links</InputGroup.Text>
                            <Form.Control
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                            />
                        </InputGroup>
                        <Button>submit house</Button>
                    </Col>
                    <Col
                        className="adminGroup"
                        xs={4}
                    >
                        <h4>List of Houses</h4>
                            <ul>
                                {houses.map((house)=>(
                                    <li>{house}</li>
                                ))}
                            </ul>
                    </Col>
                    <Col>
                         <h4>Employee Insight</h4>
                        <p>Who has selected which videos</p>
                    </Col>
                </Row>
                <Row>
                <Col>
                    <h2>Dashbord</h2>
                </Col>
                </Row>
            </Container>
        </>
    )
}
