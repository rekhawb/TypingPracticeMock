import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "../components/styles/Container";
import { StyledCard } from "../components/styles/Card";
import { Flex } from "../components/styles/Flex";
import { Button, Button1 } from "../components/styles/Button";
import { StyledHeader } from "../components/styles/Header";
import {
  StyledText1,
  StyledText2,
  StyledText3,
  animatPosition,
} from "../components/styles/pTag";
import { UList } from "../components/styles/List";
import Auth from "../utils/auth";
import { HeaderImage } from "../components/styles/HeaderImage";
import Card from "./Card";

import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";


const stripePromise = loadStripe(process.env.REACT_APP_PK_KEY);

const Donation = () => {
  //const stripe = useStripe();
  //const elements = useElements();

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const [getCardInfo, getCard] = useState("");

  //console.log(getCardInfo);
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    let donationIds = [];

    donationIds = [process.env.REACT_APP_DONATION_KEY]

    //alert(donationIds)

    getCheckout({
      variables: { donations: donationIds },
    });
  }

  return (
    <>
      <Container>
        <Flex>
          <StyledCard>
            <StyledText1>
              Currently supporting below listed donation campaigns
            </StyledText1>
            <StyledHeader>Home for Homeless</StyledHeader>
            <UList>
              <li>What is it?</li>
              <li>Helping communities meet housing needs.</li>
              <li>Strive for safe and affordable housing for everyone</li>
            </UList>

            <StyledCard>
              <Elements stripe={stripePromise}>
                <form id="payment-form">
                  <CardElement id="card-element" onChange={getCard} />
                  <br></br>

                  {Auth.loggedIn() ? (
                    <Button
                      id="btnCheckout"
                      onClick={submitCheckout}
                      disabled={!getCardInfo.complete}
                    >
                      Donate
                    </Button>
                  ) : (
                    <StyledText2>(You are not logged in!)</StyledText2>
                  )}
                </form>
              </Elements>
            </StyledCard>

            <Button1>
              More than 326,000 people experienced sheltered homelessness in the
              United States on a single night in 2021.
            </Button1>
            <Button1>
              The number of sheltered individuals with chronic patterns of
              homelessness increased by 20 percent between 2020 and 2021.
            </Button1>
            <Button1>
              Veterans experiencing sheltered homelessness accounted for 11 out
              of every 10,000 veterans in the country.
            </Button1>
            <br></br>
            <br></br>
          </StyledCard>
        </Flex>
      </Container>
    </>
  );
};

export default Donation;
