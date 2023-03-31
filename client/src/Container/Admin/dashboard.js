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
const getVideoData = (videoArr)=>{
let videoObjArr = []
const videoSet = [... new Set(videoArr)];
videoSet.forEach(videoKey=>{
    let watched = 0;
videoArr.forEach((video,x)=>{
        if(videoKey === video){
            watched +=1
            videoObjArr[videoKey] = watched;
        }
    })
})
return videoObjArr;
}

export const AdminDashBoard = (props) => {

    const [empData, setEmpData] = useState();
    props.dataset.AllEmployee.forEach((emp) => {
        if (emp.name === props.employeeKey) {
            // setEmpData(emp);
        }
    })

    const thisEmpl = findEmployeeData(props.employeeKey, props.dataset.AllEmployee)
    const videoObject = getVideoData(thisEmpl.VideosViewed)
    console.log(videoObject);

    return (

        <Container>
            <Row>
                <Col>
                   <b> EmployeeName: </b> {thisEmpl?.EmployeeName}
                </Col>
                <Col>
                   <b> EmployeeNumber: </b> {thisEmpl?.EmployeeNumber}
                </Col>
                <Col>
                   <b> Number Of Videos Viewed:</b> {thisEmpl?.VideosViewed?.length}
                </Col>
                <Col>
                   <b> Videos Viewed:</b> {!thisEmpl?.VideosViewed ? "No videos have been viewd":
                    <div
                        className="videoList scroll"
                    >
                        { Object.entries(videoObject).map((videoData,x)=>{
                      return <p>{videoData[0]} <br/><b>viewd : </b> { videoData[1] } times</p>
                    })}
                    </div>
                    }
                </Col>
            </Row>
        </Container>
    )
}