import React, { Fragment, useState } from "react";
import { Col, Row, Container, Button } from "react-bootstrap";
// import React, { Component, Button } from 'react'
import { currentEmployee } from "../../store/Reducers/UserReducers";
import { currentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector, useDispatch } from 'react-redux';
import WheelComponent from 'react-wheel-of-prizes'
import './style.css'

const setEmployeeVideoData = (emp, house, video) => {
  console.log(emp, house, video);
  fetch('/addwatchedvideo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ emp, house, video })
  })
}


export const SpinnerPage = ({ spinnerConfig }) => {
  const selectedHouse = useSelector(currentHouse);
  const currentSpinner = useSelector(currentEmployee);
  const RenderWinnerLink = (winner, list,showHint) => {
    return (
      <>
        <Button
          onClick={() => {
            setEmployeeVideoData(currentSpinner, selectedHouse, winner)
            setShowVideo(true);
          }}
        >
          <h1>{winner}</h1>
        </Button>
       {!showHint ? <p>Press the button to display the video</p>:''}
      </>
    )
  }
  const { speedOfSpinner, spinnerEntries, linklist } = spinnerConfig || {};
  var arrContainer = {};

  selectedHouse?.links?.split(',').forEach((entry) => {
    const segmentForSpinner = entry.split(/-(.*)/g);
    arrContainer = { ...arrContainer, [segmentForSpinner[0]]: segmentForSpinner[1] }
  });
  const spinnerTitle = currentHouse.name;
  const [showWinnerLink, setShowWinnerLink] = useState(false)
  const [winnerTitle, setWinnerTitle] = useState()
  const [showVideo, setShowVideo] = useState(false);
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
    setShowVideo(false)
    setShowWinnerLink(true);
    setWinnerTitle(winner)
  }
  return (
    <Container>
      {selectedHouse?.name ? selectedHouse.name : 'no house selected yet'}
      <Row>
        <Col xs={3}>
          <Fragment>
            <WheelComponent
              segments={Object.keys(arrContainer).length !== 0 ? Object.keys(arrContainer) : segments}
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
          <div id="rel1" class="relative">
            <p> {showWinnerLink && arrContainer ? RenderWinnerLink(winnerTitle, arrContainer,showVideo) : ''}</p>
            {console.log(showVideo)}
            {showVideo ?
              <div>
                <iframe
                  src={arrContainer[winnerTitle]}
                  width="500"
                  height="350"
                  allow="autoplay"></iframe>
               <p> <a className="winnertext" target="blank" href={arrContainer[winnerTitle]}> click here if video does not display</a></p>
              </div>

              : ''}
            {/* when we have embeded links we can add an iframe into the website and keep everything in app */}
          </div>
        </Col>
      </Row>
    </Container>
  )
}