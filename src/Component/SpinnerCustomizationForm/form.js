import React from "react";
import { Form, Button, Container,InputGroup } from "react-bootstrap";



export const Customizations = () => {
    return (
        <Container>
            <div>
                <h1>Customize the spinner! </h1>

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group>
                    <InputGroup>
                        <InputGroup.Text>Add </InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </Container>
    )
}