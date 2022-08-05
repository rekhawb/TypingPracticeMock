import React, { useState, useEffect } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation,useQuery } from '@apollo/client';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { saveParaInput,saveParaUser } from '../utils/localStorage';

import Auth from '../utils/auth';

import {GET_PARAGRAPH,GET_ME } from '../utils/queries';


const SelectParagraphs = () =>{
    const { loading, data} = useQuery(GET_PARAGRAPH);
    const paragraphData = data?.paragraph || {};


    if (loading) {
        return <h2>LOADING...</h2>;
      }

      const handleSelectText = () => {

        
      }
    
      return (
        <>
          <Jumbotron fluid className='text-light bg-dark'>
            <Container>
              <h1>Select one of the following texts to start typing!</h1>
            </Container>
          </Jumbotron>
          <Container>
            <h2>
              {paragraphData?.length
                ? `Select  any one of the ${paragraphData.length} available ${paragraphData.length === 1 ? 'text' : 'texts'}:`
                : 'There are no text selections!'}
            </h2>
            <CardColumns>
              
              {paragraphData?.map((text) => {
                return (
                    
                  <Card key={text._id} border='dark'>
                    <Card.Title>{text.paragraphTitle}</Card.Title>
                    {text.paragraphDesc}
                    <Card.Body>
                     
                      <Button className='btn-block btn-warning' onClick={() => handleSelectText(text._id)} >
                      {text.paragraphTitle}
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardColumns>
          </Container>
        </>
      );



}


export default SelectParagraphs;