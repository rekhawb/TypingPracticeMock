import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import the `useMutation()` hook from Apollo Client
import { useMutation,useQuery } from '@apollo/client';
import { Jumbotron,Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { saveParaInput,saveParaUser } from '../utils/localStorage';
import { Container } from '../components/styles/Container';
import { StyledHeader } from '../components/styles/Header';
import { Flex } from'../components/styles/Flex';
import { StyledCard } from '../components/styles/Card';
import Auth from '../utils/auth';

import {GET_PARAGRAPH,GET_ME,GET_ATEXT } from '../utils/queries';


const SelectParagraphs = () =>{
    const { loading, data} = useQuery(GET_PARAGRAPH);
    const paragraphData = data?.paragraph || {};


    if (loading) {
        return <h2>LOADING...</h2>;
      }

      const handleSelectText = () => {
     

      }
    //<Link to={{ pathname: `/search/${text._id}` }}>
    //<Link to={{ pathname: `/search/${text.paragraphDesc}`} }>
    //<Link to={{ pathname: `/search/${text.paragraphDesc}`} }>
      return (
        <>
             <Container>
              <StyledHeader>Select one of the following texts to start typing!</StyledHeader>
            </Container>
          
          <Container>
         
           
              
              {paragraphData?.map((text) => {
                return (
                  <Flex>
                  <StyledCard key = {text._id}>
                 
                    {text.paragraphDesc}
                    <Card.Body>
                    <Link 
                    to={ `/starttyping`}
                    state= {{paraInput:text.paragraphDesc,idInput:text._id,titleInput:text.paragraphTitle}}
                   >
                    <Button className='btn-block btn-warning' >
                      {text.paragraphTitle}
                      </Button>
        </Link>
                    </Card.Body>
                
                  </StyledCard>
                  </Flex>
                );
              })}
        
            
          </Container>
        </>
      );



}


export default SelectParagraphs;