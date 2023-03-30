import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { getData } from "../../utils/requests"
import { setAdminDashBoard, adminDataSet, deleteUser, deleteHouse } from '../../store/Reducers/AdminReducer';
import { setCurrentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AdminDashBoard } from "./dashboard";
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
    const [employeeToView, setEmployeeToView] = useState();
    const FullAdminDataSet = useSelector(adminDataSet)
    let houseSet = [];
    const empName = [];
    console.log(FullAdminDataSet);
    if (FullAdminDataSet !== null) {
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
        <div id = {'adminPage'}>
            <p>ADMIN PAGE</p>

            <Container>
                <Row
                    className = "listSection"
                >
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
                        <div
                            className="scroll scrollist"
                        >

                        {houseSet.map((house) => {
                            const houseKeys = Object.keys(house);
                            return (
                                <p
                                    className="listItem"
                                >

                                    <Button
                                        className="listbutton"
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
                                        className="delete"
                                        onClick={() => {
                                            getData('/deletehouse', 'POST', { id: house[houseKeys[1]] }, deleteUser, {}, 'res')
                                        }}
                                    ><b>x</b></span>
                                </p>
                            )
                        })}
                        </div>
                    </Col>
                    <Col>
                        <h4>Employee Insight</h4>
                        <p>Who has selected which videos</p>
                        <div
                            className="scrolllist scroll"
                        >

                        {empName.map((emp) => {
                            const houseKeys = Object.keys(emp);
                            return (
                        <div id="box">
                            <div id="borderLeft" className="bottom"></div>
                                <p
                                    className="listItem"
                                >
                                    <Button
                                        className="listbutton"
                                        onClick={(e) => {
                                            setEmployeeToView(houseKeys[0])
                                        }}
                                    >{houseKeys[0]}</Button>
                                    <span
                                        className="delete"
                                        onClick={() => {
                                            getData('/deleteemployee', 'POST', { id: emp[houseKeys[1]] }, deleteHouse, {}, 'res')
                                        }}
                                    > <b>x</b></span>
                                </p>
                        </div>
                            )
                        })}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Dashbord</h2>
                    </Col>
                </Row>
                <Row>
                    {employeeToView ? <AdminDashBoard employeeKey={employeeToView} dataset={FullAdminDataSet} /> : ''}
                </Row>
            </Container>
        </div>
    )
}
