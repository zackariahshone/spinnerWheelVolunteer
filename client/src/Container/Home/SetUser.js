import React, { Fragment, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from "../../store/Reducers/UserReducers";


export const SetUser = (props)=>{
    const { setPage } = props;
    const dispatch = useDispatch();
    const [empName, setEmpName ] = useState();
    const [employeeNumber, setEmployeeNumber] = useState();
    const [error, setError ]= useState();
    const checkEmployee = async (employeeData, setPage, setRedux)=>{
         await fetch('/checkemployee',{
            headers: {
                "Content-Type": "application/json",
              },
            method:"POST",
            body: JSON.stringify(employeeData)
        }).then(res=>res.json()).then((response)=>{
            if(response._doc){

                const {EmployeeName,EmployeeNumber} = response._doc;   
                if((response.status === 200 ||
                response.status === '200') && 
              (  employeeData.name === EmployeeName && employeeData.number == EmployeeNumber)
                ){
                setRedux(setUserData({employeeData}))
                setPage('spinner');
            }else{
                if(employeeData.name !== EmployeeName || employeeData.number !== EmployeeNumber){
                    setError('incorrect credentials please try again or contact your admin')
                }
            }
        }else{
            setError('User Does Not Exist \n Check Credentials')
        }
        })
    }
    return(
        <div
            className = "setUser"
        >
            <>Who is Spinning today</>
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
                                setEmpName(e.target.value.trim().toLowerCase())
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col
                        style={{paddingTop:'5%'}}
                    >
                        <label
                            style={{marginRight:'10%'}}
                        >Employee Number: </label>
                        <input
                            onChange={(e)=>{
                                setEmployeeNumber(e.target.value.trim())
                            }}
                        />
                    </Col>
                </Row>
                    {error?<p
                        className="errorState"
                    >{error}</p>:''}
                    <Button
                        variant="success"
                        style={{marginTop:'10%'}}
                        onClick= {()=>{
                            if(typeof employeeNumber !== 'number'){
                                setError('numeric characters only for employee number')
                            }
                            const employeeData = {
                                name:empName,
                                number:employeeNumber
                            }
                            if(empName && employeeNumber){
                            checkEmployee(employeeData,setPage,dispatch)
                            }
                        }}
                    > Set it </Button>
            </Container>
        </div>
    )
}