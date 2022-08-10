import React, { useState, useEffect } from 'react';



import { Jumbotron,CardColumns, Card } from 'react-bootstrap';

import {Container} from '../components/styles/Container'
import { StyledHeader } from '../components/styles/Header';
import { Button } from '../components/styles/Button';

import Auth from '../utils/auth';
//Import the `useMutation()` hook from Apollo Client
import { useMutation,useQuery } from '@apollo/client';

import { GET_ME } from '../utils/queries';
import{REMOVE_PROGRESS} from '../utils/mutations';



function AchievementModal() {
    const { loading, data} = useQuery(GET_ME);
    const [removeProgress,{error}] = useMutation(REMOVE_PROGRESS);
    const userData = data?.user || {};



    const handleDeleteText = async (textId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    alert(textId);
        if (!token) {
          return false;
        }
    
        try {
         // const response = await deleteBook(bookId, token);
    
         const {data} = await removeProgress({
          variables: {textId:textId},
        });
    
    
        } catch (err) {
          console.error(err);
        }
      };


  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }



  return (
    <>
     
        <Container>
          <StyledHeader>Track your progress!</StyledHeader>
        </Container>
    
      <Container>
        <h2>
          {userData.previousWork?.length
            ? `Entries found: ${userData.previousWork.length} ` : 'Select a text to practice typing'}
        </h2>
        <CardColumns>
          
          {userData.previousWork?.map((work) => {
            return (
              <Card key={work.textId} border='dark'>
                <Card.Body>
                  <Card.Title>{work.passageTitle}</Card.Title>
                  <p className='small'>Date: {work.attemptedOn}</p>
                  <p className='small'>Gross WPM: {work.grossWPM}</p>
                  <p className='small'>Net WPM: {work.netWPM}</p>
                  <p className='small'>Accuracy: {work.accuracy}</p>
                 
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteText(work._id)}>
                    Delete
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

export default AchievementModal