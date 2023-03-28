import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
// import React, { Component } from 'react'
import { currentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import WheelComponent from 'react-wheel-of-prizes'



const RenderWinnerLink = (winner, list) => {
  return (
    <>
      <a target="blank" href={list[winner]}><h1>{winner}</h1></a>
    </>
  )
}

export const SpinnerPage = ({ spinnerConfig }) => {
  const selectedHouse =  useSelector(currentHouse);
  console.log(selectedHouse);
  const { speedOfSpinner, spinnerEntries, linklist } = spinnerConfig || {};
  var arrContainer = {};
  
  selectedHouse?.links?.split(',').forEach((entry) => {
    const segmentForSpinner = entry.split(/-(.*)/g);
    arrContainer = {...arrContainer,[segmentForSpinner[0]] : segmentForSpinner[1]}
  });
  const spinnerTitle = currentHouse.name;
  const [showWinnerLink, setShowWinnerLink] = useState(false)
  const [winnerTitle, setWinnerTitle] = useState()
  const segments = [
    'better luck next time',
    'won 70',
    'won 10',
    'better luck next time',
    'won 2',
    'won uber pass',
    'better luck next time',
    'won a voucher'
  ]
  const segColors = [
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000',
    '#EE4040',
    '#F0CF50',
    '#815CD1',
    '#3DA5E0',
    '#34A24F',
    '#F9AA1F',
    '#EC3F3F',
    '#FF9000'
  ]
  const onFinished = (winner) => {
    setShowWinnerLink(true);
    setWinnerTitle(winner)
  }
  return (
    <Container>
    {selectedHouse?.name ? selectedHouse.name:'no house selected yet'}
      <Row>
        <Col xs={6}>
          <Fragment>
            <WheelComponent
              segments={ Object.keys(arrContainer).length !== 0 ? Object.keys(arrContainer) : segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor='white'
              contrastColor='black'
              buttonText='Spin'
              isOnlyOnce={false}
              size={290}
              upDuration={25}
              downDuration={250}
              fontFamily='Arial'
              mobile={true}
            />
          </Fragment>
        </Col>
        <Col>
          {showWinnerLink && arrContainer ? RenderWinnerLink(winnerTitle, arrContainer) : ''}
        </Col>
      </Row>
    </Container>
  )
}