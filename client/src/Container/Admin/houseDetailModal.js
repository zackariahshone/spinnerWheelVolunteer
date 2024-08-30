import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { currentHouse } from "../../store/Reducers/HouseReducers";

// import Dropdown, Modal from 'react-bootstrap/Dropdown';

const listOspinners = ["spin", "spin2", "spin3"]
function HouseDetailModal(props) {
    const selectedHouse = useSelector(currentHouse)
    const handleClose = () => props.setShowToolTip(false);
    const sudoHouseData =
    {
        'name': selectedHouse?.name,
        'videos': [
            {
                type: 'saftey',
                name: 'Practice makes perfect',
                'collection': [
                    { 'video1': 'a;sldjf;las' },
                    { 'video2': 'alkdsjf;l' },
                    { 'video2': ';alsdjkf' }
                ]
            },
            {
                type: 'chores',
                name: 'who does what',
                'collection': [
                    { 'video1': 'a;sldjf;las' },
                    { 'video2': 'alkdsjf;l' },
                    { 'video2': ';alsdjkf' }
                ]
            },
            {
                type: 'misc',
                name: 'anything goes',
                'collection': [
                    { 'video1': 'a;sldjf;las' },
                    { 'video2': 'alkdsjf;l' },
                    { 'video2': ';alsdjkf' }
                ]
            },
        ]
    }

    return (
        <>
            <Modal
                show={props.handleShow}
                onHide={handleClose}
                size='xl'
            >
                <Modal.Header closeButton>
                    <Modal.Title>{`${sudoHouseData.name}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className='modalBody scroll'
                >
                    {sudoHouseData.videos.map((videoData) => (
                        <>

                            <p>{videoData.name} {videoData.type}</p>
                            <ul>
                                {videoData.collection.map((video) => {
                                    
                                 return <li>video</li>
                                
                                })}
                            </ul>
                        </>
                    ))}

                </Modal.Body>
            </Modal>
        </>
    );
}

export default HouseDetailModal;