import Layout from '../components/layout.js'
import StripePayment from "../components/payment";

const Page = () => {
    return (
        <Layout>
            <h1>Payment</h1>
            <StripePayment/>
        </Layout>
    )
}

export default Page