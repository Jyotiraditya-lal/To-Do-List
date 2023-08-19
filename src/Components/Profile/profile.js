import React from "react";
import { Row, Card, Col, Container } from "react-bootstrap";
import ProfileIcon from "../../Images/Profile.jpg";
import { useDispatch, useSelector } from "react-redux";
import "./Profile.css"; 
import { useNavigate } from "react-router";
import { AuthActions } from "../../Store/Auth-Redux";
import ProfileBody from "./ProfileBody";

const Profile = () => {
  const name = useSelector((state) => state.Auth.Name);
  const email = useSelector((state) => state.Auth.email);
  const idToken=useSelector((state)=>state.Auth.idToken)
  const userId=useSelector((state)=>state.Auth.UID)
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const RemoveName= async ()=>{
    try{
      const response= await fetch(`https://to-do-list-3e614-default-rtdb.asia-southeast1.firebasedatabase.app/name/${userId}.json`,{
        method: 'DELETE'
      })
      if(!response.ok){
        throw new Error('something went wrong')
      }
    }catch(err){
      alert(err.message)
    }
  }

  const DeleteAccountHandler= async ()=>{
    try{
      const response= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyC8i78_O5qsfV3V7uORT73BLH5Fni3jYFA',{
        method: 'POST',
        body: JSON.stringify({idToken: idToken})
      })
      if(!response.ok){
        throw new Error('Could not delete your account')
      }else{
        RemoveName()
        dispatch(AuthActions.logout())
        navigate('/Home')
      }
    }catch(err){
      alert(err.message)
    }
  }

  return (
  <React.Fragment>
    <Container>
      <Card className="profile-card">
        <Card.Body>
          <Row className="profile-row">
            <Col className="profile-info">
              <div className="profile-name">{name}</div>
              <div className="profile-email">{email}</div>
              <button className="delete-acc" onClick={DeleteAccountHandler}>Delete account</button>
            </Col>
            <Col className="profile-img-col">
              <img className="profile-img" src={ProfileIcon} alt="Profile" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    <ProfileBody />
    </React.Fragment>
  );
};

export default Profile;
