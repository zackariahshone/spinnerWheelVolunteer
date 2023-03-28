import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";


const findEmployeeData = (data, dataSet) => {
    let emp;
    dataSet.forEach((employee) => {
        console.log(employee.EmployeeName)
        console.log(data);
        if (employee.EmployeeName === data) {
            console.log('=====check=====');
            console.log(employee);
            emp = employee;
        }
    })
    return emp;
}


export const AdminDashBoard = (props) => {
    const [empData, setEmpData] = useState();
    props.dataset.AllEmployee.forEach((emp) => {
        if (emp.name === props.employeeKey) {
            // setEmpData(emp);
        }
    })

    const thisEmpl = findEmployeeData(props.employeeKey, props.dataset.AllEmployee)
    console.log(thisEmpl);
    return (

        <Container>
            <Row>
                <Col>
                    EmployeeNumber: {thisEmpl.EmployeeNumber}
                </Col>
                <Col>
                    EmployeeNumber: {thisEmpl.EmployeeName}
                </Col>
            </Row>
            <Row>
                <Col>
                    Number Of Videos Viewed: {thisEmpl.VideosViewed.length}
                </Col>
                <Col>
                    Number Of Videos Viewed: {thisEmpl.VideosViewed.length === 0 ? "No videos have been viewd":''}
                </Col>
            </Row>
        </Container>
    )
}