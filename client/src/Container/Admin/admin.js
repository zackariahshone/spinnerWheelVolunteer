import React, { useState } from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { getData } from "../../utils/requests"
import { setAdminDashBoard, adminDataSet, deleteUser, deleteHouse } from '../../store/Reducers/AdminReducer';
import { setCurrentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { AdminDashBoard } from "./dashboard";
// import { SAMPLE, FORMAT } from "./sampleLinks";
import ToolTip from "./tooltip";
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
    const [showToolTip, setShowToolTip] = useState();
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
                    {showToolTip === true ?
                        <ToolTip setShowToolTip={setShowToolTip} handleShow={showToolTip} /> : ''
                    }
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


