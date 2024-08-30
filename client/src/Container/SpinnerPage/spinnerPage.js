import React, { Fragment, useEffect, useState } from "react";
import useSound from 'use-sound';
import { Col, Row, Container, Button } from "react-bootstrap";
import { currentEmployee } from "../../store/Reducers/UserReducers";
import { currentHouse } from "../../store/Reducers/HouseReducers";
import { useSelector } from 'react-redux';
import WheelComponent from 'react-wheel-of-prizes'
import './style.css'
import spinnerEffect from './spinwheel.mp3';

const setEmployeeVideoData = (emp, house, video) => {
  fetch('/addwatchedvideo', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ emp, house, video })
  })
}


export const SpinnerPage = () => {
  const selectedHouse = useSelector(currentHouse);
  const currentSpinner = useSelector(currentEmployee);
  const spinnerSound = new Audio(spinnerEffect);
  const [play, { stop }] = useSound(spinnerSound);
  const [showWinnerLink, setShowWinnerLink] = useState(false)
  const [winnerTitle, setWinnerTitle] = useState()
  const [showVideo, setShowVideo] = useState(false);
  const [playSound, setPlaySound] = useState(0);
  
  const RenderWinnerLink = (winner, showHint) => {
    return (
      <>
        <Button
          onClick={() => {
            setEmployeeVideoData(currentSpinner, selectedHouse, winner)
            setShowVideo(true);
          }}
        >
          <h6>{winner}</h6>
        </Button>
        {!showHint ? <p>Press the button to display the video</p> : ''}
      </>
    )
  }
  var arrContainer = {};

  selectedHouse?.links?.split(',').forEach((entry) => {
    const segmentForSpinner = entry.split(/-(.*)/g);
    arrContainer = { ...arrContainer, [segmentForSpinner[0]]: segmentForSpinner[1] }
  });
  useEffect(()=>{
    console.log(playSound);
    if(playSound === true){
      play()
    }else if(playSound === false){
      console.log('play sound in false');
      stop();
    }
  })
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
    setPlaySound(false);
    setShowVideo(false)
    setShowWinnerLink(true);
    setWinnerTitle(winner)
  }
  return (
    <Container>
      {selectedHouse?.name ? selectedHouse.name : 'no house selected yet'}
      <Row>
        <Col xs={3}>
          <div 
            onClick={()=>{
              setPlaySound(true);
            }}
          >
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
          </div>
        </Col>
        <Col>
          <div id="rel1" class="relative">
            <p> {showWinnerLink && arrContainer ? RenderWinnerLink(winnerTitle, showVideo) : ''}</p>
            {showVideo ?
              <div>
                <iframe 
                  title={winnerTitle}
                  src={arrContainer[winnerTitle]}
                  width="500"
                  height="350"
                  allow="autoplay"></iframe>
                <p> <a className="winnertext" target="blank" href={arrContainer[winnerTitle]}> click here if video does not display</a></p>
              </div>
              : ''}
          </div>
        </Col>
      </Row>
    </Container>
  )
}