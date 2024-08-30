import React, { useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { getData } from "../../utils/requests"
import { setAdminDashBoard, adminDataSet, deleteUser, deleteHouse } from '../../store/Reducers/AdminReducer';
import { setCurrentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AdminDashBoard } from "./dashboard";
import ToolTip from "./tooltip";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./style.css";
import HouseDetailModal from "./houseDetailModal.js";
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
    const [showToolTip, setShowToolTip] = useState();
    const [showHouseDetails, setShowHouseDetails] = useState();
    const [showHouseTitle, setShowHouseTitle] = useState();
    const [houseSelector, setHouseSelector] = useState();
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
        <div id={'adminPage'}>
            <p>ADMIN DASHBOARD</p>

            <Container>
                <Row>
                    <Col>
                        <h4>Add House</h4>
                        <p>Add Aditional Houses to list to select from</p>
                    </Col>

                    <ToolTip setShowToolTip={setShowToolTip} handleShow={showToolTip} />

                    <Col> <h4>List of Houses</h4></Col>
                    <Col>  <h4>Employee Insight</h4>
                        <p>Who has selected which videos</p>
                    </Col>

                </Row>
                <Row
                    className="listSection"
                >
                    <Col
                        className="adminGroup"
                        xs={4}
                    >
                        {/**
                     *ADD HOUSE SECITION
                     */}
                        <p>Adding a New House?</p>
                        <Form.Check
                            inline
                            label="yes"
                            name="group1"
                            type="radio"
                            id={`inline-1`}
                            onChange={() => {
                                setShowHouseTitle(true)
                            }}
                        />
                        <Form.Check
                            inline
                            label="no"
                            name="group1"
                            type="radio"
                            id={`inline-1`}
                            onChange={() => {
                                setShowHouseTitle(false)
                            }}
                        />
                        <InputGroup size="sm" className="mb-3">

                            {
                                showHouseTitle ?
                                    <>
                                        <InputGroup.Text id="inputGroup-sizing-sm">Collection name</InputGroup.Text>
                                        <Form.Control
                                            aria-label="Small"
                                            aria-describedby="inputGroup-sizing-sm"
                                            onChange={(e) => {
                                                setNewHouse({ ...newHouse, HouseName: e.target.value })
                                            }}
                                        />
                                    </>
                                    :
                                    <>
                                        <DropdownButton id="dropdown-basic-button" variant={'secondary'} title={houseSelector ? houseSelector : "Select a Collection to add to"}>
                                        <Dropdown.Item href="#/action-1">...Select One</Dropdown.Item>
                                            {Object.values(houseSet).map((house) => {
                                               return <Dropdown.Item onClick={()=>{setHouseSelector(Object.keys(house)[0])}} href="#/action-1">{Object.keys(house)[0]}</Dropdown.Item>
                                            })}
                                        </DropdownButton>
                                    </>
                            }
                            <br/>
                            <InputGroup.Text id="inputGroup-sizing-sm">Spinner Name</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={(e) => {
                                    setNewHouse({ ...newHouse, spinnerName: e.target.value })
                                }}
                            />
                            <InputGroup.Text id="inputGroup-sizing-sm">Spinner Type/topic</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={(e) => {
                                    setNewHouse({ ...newHouse, type: e.target.value })
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
                            className="addhouseButtons"
                            onClick={() => {
                                HouseData('/addhouse', newHouse, 'POST');
                                window.location.reload(true)

                            }}
                        >submit house</Button>
                        <br />
                        <span> how to add a house</span>
                        <br /><span>click here</span>
                        <p
                            className='infoArrow'
                        >&dArr;</p>
                        <Button
                            className="addhouseButtons"
                            onClick={() => {
                                setShowToolTip(true)
                            }}
                        >info</Button>
                    </Col>
                    <Col
                        className="adminGroup"
                        xs={4}
                    >

                        <div
                            className="scroll scrolllist"
                        >
                            {/**
                            *
                            *LIST OF HOUSES
                            */}
                            <HouseDetailModal title={''} setShowToolTip={setShowHouseDetails} handleShow={showHouseDetails} />
                            {houseSet.map((house) => {
                                const houseKeys = Object.keys(house);
                                return (
                                    <p
                                        className="listItem"
                                    >

                                        <Button
                                            className="listbutton"
                                            onClick={() => {
                                                dispatch(setCurrentHouse(
                                                    {
                                                        links: house[houseKeys[0]],
                                                        name: houseKeys[0]
                                                    }
                                                ))
                                                // navigate('/');
                                                setShowHouseDetails(true)
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

                        <div
                            className="scrolllist scroll"
                        >
                            {/**
                            *
                            * EMPLOYEE LIST SECTION 
                            */}
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
                                                onClick={() => {
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
                        {employeeToView ? <h2>Employee Data</h2> : ''}
                    </Col>
                </Row>
                <Row>
                    {employeeToView ? <AdminDashBoard employeeKey={employeeToView} dataset={FullAdminDataSet} /> : ''}
                </Row>
            </Container>
        </div>
    )
}


