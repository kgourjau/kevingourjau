import { withSession } from 'next-session';
import nextConnect from 'next-connect';

const options = {cookie:{maxAge:3600*24}}

const handler = nextConnect();

handler.get(async (req, res) => {
    if(!req.session.products) req.session.products = {}
    res.status(200).json(req.session.products)
})
export default withSession(handler, options);