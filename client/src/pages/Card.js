import {withRouter} from 'react-router-dom';
import {CardElement} from '@stripe/react-stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51LUT8iF2iC57NwAvWF7WbFtO6t5KiR3UD6Cud6xtgrhgtV9aK9s0BGAin1pmH1xr4sWqsoFSrBWturU6Cn4ec5Ix00DQ5gTbE6');

const Card = () =>{

    return (

        <>
        <Elements stripe = {stripePromise}>

        <h1> Card</h1>

<form id = "payment-form">

    <CardElement />
</form>
        </Elements>

       

        </>
    )
}


export default Card;