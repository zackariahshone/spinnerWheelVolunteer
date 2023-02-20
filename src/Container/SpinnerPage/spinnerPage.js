import React, { Fragment, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
// import React, { Component } from 'react'

import WheelComponent from 'react-wheel-of-prizes'



const RenderWinnerLink = (winner, list) => {
  return (
    <>
      <a target="blank" href={list[winner]}><h1>{winner}</h1></a>
    </>
  )
}

export const SpinnerPage = ({ spinnerConfig }) => {
  const { spinnerTitle, speedOfSpinner, spinnerEntries, linklist } = spinnerConfig || {};
  //  console.log(spinnerConfig);
  var arrContainer = {};
  spinnerEntries?.split(',').forEach((entry) => {
    console.log(typeof entry);
    console.log('==============================');
    const segmentForSpinner = entry.split(/-(.*)/g);
    // arrContainer.push(segmentForSpinner)
    arrContainer = {...arrContainer,[segmentForSpinner[0]] : segmentForSpinner[1]}
    console.log(segmentForSpinner);
  });
  console.log(arrContainer);
  // console.log(arrContainer);
  // arrContainer.forEach((seg)=>{
  //   console.log(seg);
  // })
  const [showWinnerLink, setShowWinnerLink] = useState(false)
  const [winnerTitle, setWinnerTitle] = useState()
  // console.log(linklist)
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
    '#FF9000'
  ]
  const onFinished = (winner) => {
    setShowWinnerLink(true);
    setWinnerTitle(winner)
    console.log(winner)
  }
  return (
    <Container>
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