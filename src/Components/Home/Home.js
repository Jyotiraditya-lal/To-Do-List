import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import imageOne from '../../Images/Image-1.jpg'
import imageTwo from '../../Images/Image-2.jpg'
import {Row, Col} from 'react-bootstrap'
import { useSelector } from 'react-redux';

const Home = () => {

  const isLoggedin=useSelector((state)=>state.Auth.isLoggedin)

  return (
    <div className="about-us-container">
      
      <h1>Welcome to Your To-Do List</h1>
      
      <p>Stay organized and accomplish more with our intuitive to-do list app.
         Manage your tasks, set priorities, and track progress with ease.
         Create customized task categories and tailor your to-do list to your needs.
      </p>
      <img className='img-2' src={imageTwo} alt='' />
      <Row>
        <Col>
        <h2>Our Mission</h2>
        <p>At to do list, we're on a mission to simplify your life and boost your productivity. We understand the challenges of managing tasks and staying organized in today's fast-paced world. 
        That's why we've created a user-friendly and intuitive to-do list application that helps you take control of your tasks and accomplish more.
        Our journey started with a simple idea: to provide a tool that empowers individuals and teams to stay on top of their tasks, set priorities, and track progress effortlessly. With to-do-list, you can create, organize, and manage your tasks with ease, 
        whether it's for work, personal projects, or anything in between.What sets us apart is our commitment to a seamless user experience. We've designed t0-do-list to be both functional and aesthetically pleasing, so you can focus on what matters most without any distractions. 
        From customizable task categories to deadline reminders, we've thoughtfully crafted every feature to enhance your productivity.
        </p>
        </Col>
        <Col>
        <div className="mission-img-container">
        < img className="img-1" src={imageOne} alt="headerImg" />
        </div>
        </Col>
      </Row>
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out to us at lal.vaibhav0211@gmail.com .</p>
      
      {!isLoggedin && <p>Ready to get started?</p>}
       {!isLoggedin && <Link to="/Login" className="cta-button">Login or Sign Up</Link>}
    </div>
  );
};

export default Home;
