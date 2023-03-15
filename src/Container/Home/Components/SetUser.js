import React, { Fragment, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from "../../../store/Reducers/UserReducers";
export const SetUser = (props)=>{
    const { setPage } = props;
    const dispatch = useDispatch();
    const [empName, setEmpName ] = useState();
    console.log(empName);
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
                    <Button
                        variant="success"
                        style={{marginTop:'10%'}}
                        onClick= {()=>{
                            dispatch(setUserData({empName}))
                            setPage('spinner');
                        }}
                    > Set it </Button>
            </Container>
        </Fragment>
    )
}