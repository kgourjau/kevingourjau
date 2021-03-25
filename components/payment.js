import React, {useEffect, useState} from 'react';
import {
    Elements,
    CardElement,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    PaymentRequestButtonElement,useStripe, useElements
} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import styles from './payment.module.css'

const css_AppWrapper = styles.AppWrapper

const css_Form = styles.Form
const css_FormGroup = styles.FormGroup
const css_FormRow = styles.FormRow
const css_FormRowLabel = styles.FormRowLabel
const css_FormRowInput = styles.FormRowInput

const css_SubmitButton = styles.SubmitButton
const css_SubmitButton__error = styles.SubmitButton__error

const css_Result = styles.Result
const css_ResultTitle = styles.ResultTitle
const css_ResultMessage = styles.ResultMessage
const css_ResetButton = styles.ResetButton

const css_ErrorMessage = styles.ErrorMessage
const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
        base: {
            iconColor: '#c4f0ff',
            color: '#fff',
            fontWeight: 500,
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            fontSize: '16px',
            fontSmoothing: 'antialiased',
            ':-webkit-autofill': {
                color: '#fce883',
            },
            '::placeholder': {
                color: '#87bbfd',
            },
        },
        invalid: {
            iconColor: '#ffc7ee',
            color: '#ffc7ee',
        },
    },
};

const CardField = ({onChange}) => (
    <div className={css_FormRow}>
        <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
);

const Field = ({
                   label,
                   id,
                   type,
                   placeholder,
                   required,
                   autoComplete,
                   value,
                   onChange,
               }) => (
    <div className={css_FormRow}>
        <label htmlFor={id} className={css_FormRowLabel}>
            {label}
        </label>
        <input
            className={css_FormRowInput}
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
        />
    </div>
);

const SubmitButton = ({processing, error, children, disabled}) => (
    <button
        className={`${css_SubmitButton} ${error ? css_SubmitButton__error : ''}`}
        type="submit"
        disabled={processing || disabled}
    >
        {processing ? 'Processing...' : children}
    </button>
);

const ErrorMessage = ({children}) => (
    <div className={css_ErrorMessage} role="alert">
        <svg width="16" height="16" viewBox="0 0 17 17">
            <path
                fill="#FFF"
                d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
            />
            <path
                fill="#6772e5"
                d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
            />
        </svg>
        {children}
    </div>
);

const ResetButton = ({onClick}) => (
    <button type="button" className={css_ResetButton} onClick={onClick}>
        <svg width="32px" height="32px" viewBox="0 0 32 32">
            <path
                fill="#FFF"
                d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
            />
        </svg>
    </button>
);

const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentIntent, setPaymentIntent] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: '',
        phone: '',
        name: '',
    });

    const [clientSecret, setClientSecret] = useState("");

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        setClientSecret(null)
        let response = await fetch('/api/s')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json()
        await setClientSecret(data["client_secret"])


        setProcessing(true);

        console.log("clientSecret: " + clientSecret)

        const result = await stripe.confirmCardPayment(data["client_secret"],
            {
            payment_method: {
                type: "card",
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Jenny Rosen',
                },
            }
        }
        );

        setProcessing(false);

        if(result.paymentIntent){
            setPaymentIntent(result.paymentIntent.status)
        }
        console.log(result.error)
        console.log(result.paymentIntent)
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            setError(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "success") {
                setError("success");
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };
    const genCard = () => {
        if(elements){
            console.log(elements.getElement(CardElement))
        }
    }
    const reset = () => {
        setError(null);
        setProcessing(false);
        setPaymentMethod(null);
        setBillingDetails({
            email: '',
            phone: '',
            name: '',
        });
    };
    const handleSecret = async () => {
        const response = await fetch('/api/s')
        const client_secret = await response.json()
        console.log(client_secret)
        return client_secret
    }

    async function fetchClientSecret () {
        setClientSecret(null)
        let response = await fetch('/api/s')

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json()
        setClientSecret(data["client_secret"])

        return true
        // await fetch('/api/s')
        //     .then(res => res.json())
        //     .then(data => setClientSecret(data["client_secret"]));
    }
    useEffect(() => {
        // console.log(paymentMethod)
        // fetch('/api/s')
        //     .then(res => res.json())
        //     .then(data => setClientSecret(data["client_secret"]));
    }, []);

    return (
        <>
            {error ?
                <div className={css_Result}>
                    <div className={css_ResultTitle} role="alert">
                        {error}
                    </div>
                    <div className={css_ResultMessage}>
                        Thanks for trying Stripe Elements. No money was charged, but we
                        generated a PaymentMethod: {paymentMethod ? paymentMethod.id : ""}
                    </div>
                    <div className={css_ResultMessage}>
                        {paymentIntent ? paymentIntent : ""}
                    </div>
                    <ResetButton onClick={reset}/>
                </div>
                :""}

                {
                    <><form className={css_Form} onSubmit={handleSubmit}>
                    <p>{clientSecret}</p>
                    <fieldset className={css_FormGroup}>
                        <Field
                            label="Name"
                            id="name"
                            type="text"
                            placeholder="Jane Doe"
                            required
                            autoComplete="name"
                            value={billingDetails.name}
                            onChange={(e) => {
                                setBillingDetails({...billingDetails, name: e.target.value});
                            }}
                        />
                        <Field
                            label="Email"
                            id="email"
                            type="email"
                            placeholder="janedoe@gmail.com"
                            required
                            autoComplete="email"
                            value={billingDetails.email}
                            onChange={(e) => {
                                setBillingDetails({...billingDetails, email: e.target.value});
                            }}
                        />
                        <Field
                            label="Phone"
                            id="phone"
                            type="tel"
                            placeholder="(941) 555-0123"
                            required
                            autoComplete="tel"
                            value={billingDetails.phone}
                            onChange={(e) => {
                                setBillingDetails({...billingDetails, phone: e.target.value});
                            }}
                        />
                    </fieldset>
                    <fieldset className={css_FormGroup}>
                        <CardField
                            onChange={(e) => {
                                setError(e.error);
                                setCardComplete(e.complete);
                            }}
                        />
                    </fieldset>
                    {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    <SubmitButton processing={processing} error={error} disabled={!stripe}>
                        Pay $25
                    </SubmitButton>
                </form>

            <div className="row">
                <p>{paymentMethod ? paymentMethod : ""}</p>
            </div>
            <div className="Row">
                <button type={"button"} onClick={genCard}>Generate Card</button>
            </div></>}
        </>)
}

const ELEMENTS_OPTIONS = {
    fonts: [
        {
            cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
        },
    ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51ITSrWL9S0DFFoIRO7l17GHdV6dMAY5JwlBM9FMrsRCfBZL6jQpA1XpHI3bGMNAo2TL5J7u83Fn1q150nuXYPx2300ZRu9D32O');

const App = () => {

    return (
        <div className={"py-3 " + css_AppWrapper}>
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default App;