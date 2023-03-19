import React, { Fragment, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from "../../../store/Reducers/UserReducers";

const checkEmployee = async (empInfo)=>{
     await fetch('/checkemployee',{
        headers: {
            "Content-Type": "application/json",
          },
        method:"POST",
        body: JSON.stringify(empInfo)
    });
}

export const SetUser = (props)=>{
    const { setPage } = props;
    const dispatch = useDispatch();
    const [empName, setEmpName ] = useState();
    const [employeeNumber, setEmployeeNumber] = useState();
    return(
        <Fragment>
            <>Whoes Spinning today</>
            <Container>
                <Row>
                    <Col
                        style={{paddingTop:'10%'}}
                    >
                        <label
                            style={{marginRight:'10%'}}
                        >Employee Name: </label>
                        <input
                            onChange={(e)=>{
                                setEmpName(e.target.value)
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        style={{paddingTop:'10%'}}
                    >
                        <label
                            style={{marginRight:'10%'}}
                        >Employee Number: </label>
                        <input
                            onChange={(e)=>{
                                setEmployeeNumber(e.target.value)
                            }}
                        />
                    </Col>
                </Row>
                    <Button
                        variant="success"
                        style={{marginTop:'10%'}}
                        onClick= {()=>{
                            const employeeData = {
                                name:empName,
                                number:employeeNumber
                            }
                            if(empName){
                            checkEmployee(employeeData)
                            dispatch(setUserData({employeeData}))
                            setPage('spinner');
                            }
                        }}
                    > Set it </Button>
            </Container>
        </Fragment>
    )
}