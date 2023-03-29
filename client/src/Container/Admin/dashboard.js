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
                   <b> EmployeeName: </b> {thisEmpl?.EmployeeName}
                </Col>
                <Col>
                   <b> EmployeeNumber: </b> {thisEmpl?.EmployeeNumber}
                </Col>
            {/* </Row>
            <Row> */}
                <Col>
                   <b> Number Of Videos Viewed:</b> {thisEmpl?.VideosViewed.length}
                </Col>
                <Col>
                   <b> Videos Viewed:</b> {thisEmpl?.VideosViewed.length === 0 ? "No videos have been viewd":
                    <div>
                        {thisEmpl?.VideosViewed.map((video)=>(
                            <p>{video}</p>
                        ))}
                    </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}