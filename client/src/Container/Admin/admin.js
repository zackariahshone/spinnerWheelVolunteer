import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { getData } from "../../utils/requests"
import { setAdminDashBoard, adminDataSet,deleteUser, deleteHouse } from '../../store/Reducers/AdminReducer';
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
export const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newHouse, setNewHouse] = useState();
    const FullAdminDataSet = useSelector(adminDataSet)
    let houseSet = [];
    const empName = [];
    console.log(FullAdminDataSet);
    if(FullAdminDataSet !== null){
    Object?.values(FullAdminDataSet?.AllEmployee)?.forEach(emp => {
        if (emp.EmployeeName) {
            const newHouse = {
                [emp.EmployeeName]: emp.VideosViewed,
                id: emp._id
            };
            empName.push(newHouse);
        }
    })
}

    Object.values(FullAdminDataSet.HouseData).forEach(house => {
        if (house.HouseName && typeof house.Videos === 'string') {
            const newHouse = {
                [house.HouseName]: house.Videos,
                id: house._id
            };
            houseSet.push(newHouse);
        }
    })

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
                            {houseSet.map((house) => {
                                const houseKeys = Object.keys(house);
                                return (
                                    <li>
                                        <Button
                                            onClick={(e) => {
                                                dispatch(setCurrentHouse(
                                                    {
                                                        links: house[houseKeys[0]],
                                                        name: houseKeys[0]
                                                    }
                                                ))
                                                navigate('/');
                                            }}
                                        >{houseKeys[0]}</Button>
                                        <span
                                            onClick={() => {
                                                getData('/deletehouse','POST',{id:house[houseKeys[1]]},deleteUser,{},'res')
                                            }}
                                    >x</span>
                                </li>
                        )
                            })}
                    </ul>
                </Col>
                <Col>
                    <h4>Employee Insight</h4>
                    <p>Who has selected which videos</p>
                    <ul>
                        
                            {empName.map((emp) => {
                                const houseKeys = Object.keys(emp);
                                return (
                                    <li>
                                        <Button
                                            onClick={(e) => {
                                                dispatch(setCurrentHouse(
                                                    {
                                                        links: emp[houseKeys[0]],
                                                        name: houseKeys[0]
                                                    }
                                                ))
                                                navigate('/');
                                            }}
                                        >{houseKeys[0]}</Button>
                                        <span
                                            onClick={() => {
                                                getData('/deleteemployee','POST',{id:emp[houseKeys[1]]},deleteHouse,{},'res')
                                            }}
                                    >x</span>
                                </li>
                        )
                            })}
                        
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
