import React,{useState} from "react";
import { Container,Card } from "react-bootstrap";
import './TaskDetails.css'
import Modal from "../UI/Modal";


const TaskDetails=(props)=>{
    const [showModal, setShowModal] = useState(false);
    

    const openModal = () => {
      setShowModal(true);
    };
    
    const closeModal = () => {
      setShowModal(false);
    };
    
    const Clickedhandler=(event)=>{
      event.stopPropagation();
      props.onCompleted()
    }

    const DeleteHandler=(event)=>{
      event.stopPropagation()
      props.onDelete()
    }
    
    return(
    <React.Fragment>
        <li key={props.id} onClick={openModal}>
            <Container className="task-item-container">
               <Card className="task-card">
                   <Card.Body>{props.task}</Card.Body>
                </Card>
                {props.completedTask && <button className="completed-button" onClick={Clickedhandler}>Completed</button>}
                {props.AddedTask && <button className="completed-button" onClick={DeleteHandler}>Delete</button>}
            </Container>
        </li>
        {showModal && (
        <Modal
          showModal={showModal}
          onClose={closeModal}
          task={props.task}
          startDate={props.startDate}
          endDate={props.endDate}
          description={props.description}
        />)}
    </React.Fragment>
    )
}

export default TaskDetails
