import React, { useState,useEffect } from 'react';

import {Container} from '../components/styles/Container';
import { StyledCard } from '../components/styles/Card';
import { Flex } from'../components/styles/Flex';
import {Button,Button1}  from'../components/styles/Button'
import { StyledHeader } from '../components/styles/Header';
import { StyledText1,StyledText2,StyledText3,animatPosition } from '../components/styles/pTag';
import { UList} from '../components/styles/List';
import Auth from '../utils/auth';
import {HeaderImage} from '../components/styles/HeaderImage';

import { loadStripe } from '@stripe/stripe-js';

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';

const stripePromise = loadStripe('pk_test_51LUT8iF2iC57NwAvWF7WbFtO6t5KiR3UD6Cud6xtgrhgtV9aK9s0BGAin1pmH1xr4sWqsoFSrBWturU6Cn4ec5Ix00DQ5gTbE6');

const Donation = () =>{

    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
          stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
      }, [data]);


      function submitCheckout() {
        let donationIds = [];
     
        donationIds = ['62f5942bc5382f2d99730d9e'];

        alert(donationIds)
    
        getCheckout({
          variables: { donations: donationIds },
        });
      }

return (
             <>
         
              <Container>
                <Flex>
                    <StyledCard>
                       
                         <StyledText1>Currently supporting below listed donation campaigns</StyledText1>
                        <StyledHeader>Home for Homeless</StyledHeader>
                       <UList>
                        <li>

                            What is it?
                        </li>
                        <li>Helping communities meet housing needs. 
                            </li>
                            <li>
                            Strive for safe and affordable housing for everyone
                            </li></UList>
                            <Button1>More than 326,000 people experienced sheltered homelessness in the United States on a single night in 2021.</Button1>
                            <Button1>
                            The number of sheltered individuals with chronic patterns of homelessness increased by 20 percent between 2020 and 2021.
                            </Button1>
                            <Button1>
                            Veterans experiencing sheltered homelessness accounted for 11 out of every 10,000 veterans in the country.

                            </Button1><br></br><br></br>
                {Auth.loggedIn() ? (
                   
                  <Button onClick={submitCheckout}>Donate</Button>
                ) : (
                  <StyledText2>(You are not logged in!)</StyledText2>
                )}
              </StyledCard>
              </Flex>
        </Container>
        </>
      );

};


export default Donation;