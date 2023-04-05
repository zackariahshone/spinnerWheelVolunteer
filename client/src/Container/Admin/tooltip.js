import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ToolTip(props) {
  console.log(props);
  const handleClose = () => props.setShowToolTip(false);
  return (
    <>
      <Modal
        show={props.handleShow}
        onHide={handleClose}
        size='xl'
      >
        <Modal.Header closeButton>
          <Modal.Title>How to add a new house with links</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className='modalBody scroll'
        >
          <h5>Step 1.</h5>
          <p>navigate to the video you would like to add</p>
          <h5>Step 2.</h5>
          <p>When you find the video on your drive that you would like to add, click the three dots and select <b>Imbeded item...</b></p>
          <h5>Step 3.</h5>
          <p>You should see something similar to the snippet below. copy the link in <b>src</b> tag</p>
          <pre>
            <code>
              <p>
                {'<iframe src="https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview" width="640" height="480" allow="autoplay"></iframe>'}
              </p>
            </code>
          </pre>
          <h5>Step 4.</h5>
          <p> Add this link along with a title to a text file or notepad</p>
          <pre> video title - https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview</pre>
          <h5> Step 5.</h5>
          <br />
          <span> Once you have the collection of video you would like and matches the format in a csv pattern</span>
          <b />
          <p>Then these values can then be pasted into the <i><b>Add entries for spinner</b></i> input field with a title for the house and press <b>submit</b>.</p>
          <p> Then you have successfully added your new house!</p>
          <br />
          <span><b>example input:</b></span>
          <text>
            <br />video title #1 - https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview,
            <br />video title #2 - https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview,
            <br />video title #3- https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview,
            <br />video title #4- https://drive.google.com/file/d/13FRXw2Tsc-zbbkwtUfllY1Jc2jShg09P/preview
          </text>

        </Modal.Body>
      </Modal>
    </>
  );
}

<ToolTip />;