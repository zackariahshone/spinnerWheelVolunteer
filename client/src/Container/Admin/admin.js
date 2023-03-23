import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { getData } from "../../utils/requests"
import { setAdminDashBoard, adminDataSet } from '../../store/Reducers/AdminReducer';
import { setCurrentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import "./style.css";


// getAdminData()
getData('/admindata', 'GET', {}, setAdminDashBoard, {})
const HouseData = async (route, data, method) => {
    await fetch(route, {
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: method
    })
}
const houses = ['house1', 'house2', 'house3', 'house4']


export const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newHouse, setNewHouse] = useState();
    const FullAdminDataSet = useSelector(adminDataSet)
    let houseSet = {};
    const empName = [];
    Object.values(FullAdminDataSet.AllEmployee).forEach(emp => {
        if (emp.EmployeeName) {
            empName.push(emp.EmployeeName)
        }
    })
    Object.values(FullAdminDataSet.HouseData).forEach(house => {
        if (house.HouseName && typeof house.Videos === 'string') {
            houseSet = { [house.HouseName]: house.Videos, ...houseSet };
        }
    })
    console.log(houseSet)
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
                                onChange={(e) => {
                                    console.log(newHouse)
                                    setNewHouse({ ...newHouse, HouseName: e.target.value })
                                }}
                            />
                        </InputGroup>
                        <br />
                        <InputGroup
                        >
                            <InputGroup.Text>Add entries for spinner</InputGroup.Text>
                            <Form.Control
                                className='inputField'
                                size='lg'
                                onChange={(e) => {
                                    console.log(newHouse)
                                    setNewHouse({ ...newHouse, Videos: e.target.value, })
                                }}
                                as="textarea" aria-label="With textarea" />
                        </InputGroup>
                        <Button
                            onClick={() => {
                                HouseData('/addhouse', newHouse, 'POST');
                                window.location.reload(true)

                            }}
                        >submit house</Button>
                    </Col>
                    <Col
                        className="adminGroup"
                        xs={4}
                    >
                        <h4>List of Houses</h4>
                        <ul>
                            {Object.keys(houseSet).map((house) => (
                                <li>
                                    <Button
                                        onClick={(e) => {
                                            dispatch(setCurrentHouse(
                                                {
                                                    links: (houseSet[house]),
                                                    name: house
                                                }
                                            ))
                                            navigate('/');
                                        }}
                                    >{house}</Button>
                                </li>
                            ))}
                        </ul>
                    </Col>
                    <Col>
                        <h4>Employee Insight</h4>
                        <p>Who has selected which videos</p>
                        <ul>
                            {
                                empName.map((name) => (
                                    <li>{name}</li>
                                ))
                            }
                        </ul>
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
