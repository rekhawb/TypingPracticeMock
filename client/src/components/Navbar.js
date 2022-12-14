import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import Auth from '../utils/auth';
import { Container } from './styles/Container';
import { useMutation,useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const { loading, data} = useQuery(GET_ME);

  
  const userData = data?.user || {};
//alert(userData.username)
  return (
    <>
    <Container>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
        
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
            
              {/* if user is logged in show paragraph to select*/}
              {Auth.loggedIn() ? (
                <>
                <Nav.Link as={Link} to='/'>
                   Home
                  </Nav.Link>
                  <Nav.Link as={Link} to='/search'>
               Select texts
              </Nav.Link>
              <Nav.Link as={Link} to='/achievement'>
              Achievement Board
              </Nav.Link>
              <Nav.Link as={Link} to='/donate'>
              Donate
              </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  <Nav.Link as={Link} to='/'> {userData.username == 'undefined' ? '':"Current User: "+userData.username}</Nav.Link>
             
               </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </Container>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
