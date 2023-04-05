import React, { useEffect } from "react";
import { Form, Button, Container, InputGroup } from "react-bootstrap";
import './style.css'
export const Customizations = ({ setConfig, config, setPage }) => {
    useEffect(()=>{},[config]);
    console.log(config) 
    return (
        <div className="custom">
            <Container>
                <div>
                    <h1>Customize the spinner! </h1>

                    <Form>
                   
                        <Form.Group onChange={(e) => {
                            setConfig({ ...config, spinnerTitle: e.target.value })
                        }} className="mb-3" controlId="formBasicEmail">
                            <Form.Label>SpinnerTitle</Form.Label>
                            <Form.Control type="text" placeholder="What is the title of your spinner" />
                        </Form.Group>

                        <InputGroup
                        >
                            <InputGroup.Text>Add entries for spinner</InputGroup.Text>
                            <Form.Control
                                className='inputField'
                                size='lg'
                                onChange={(e) => {
                                    setConfig({ ...config, spinnerEntries: e.target.value })
                                }}
                                as="textarea" aria-label="With textarea" />
                        </InputGroup>
                        <Button
                            style = {{marginTop:'10%'}}
                            onClick={(e) => {
                                setPage('submit')
                            }}
                            variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Container>
        </div>
    )
}