import { withSession } from 'next-session';
import nextConnect from 'next-connect';

const options = {cookie:{maxAge:3600*24}}

const handler = nextConnect();

handler.post(async (req, res) => {
    const { pid } = req.query

    let data = req.body;
console.log(data)
    const obj = data
    console.log(obj)

    req.session.views = req.session.views ? req.session.views + 1 : 1;

    if(!req.session.products) req.session.products = {}
    if(!req.session.products[pid]) req.session.products[pid] = {qty:0}
    if(!req.session.products[pid].qty) req.session.products[pid].qty = 0

    switch (data.action) {
        case 'add':
            req.session.products[pid].qty = req.session.products[pid].qty + 1
            break
// "\"1\"].qty + req.session.products[\"1\""
        case 'substract':
            req.session.products[pid].qty = req.session.products[pid].qty - 1
            if(req.session.products[pid].qty <= 0) delete req.session.products[pid]
            break

        case 'modify':
            if(data.qty){
                req.session.products[pid].qty = data.qty

            }
            if(req.session.products[pid].qty <= 0) delete req.session.products[pid]
            break

        case 'delete':
            delete req.session.products[pid]
            console.log(req.session.products)
            break

        default:

    }

    res.status(200).json(req.session.products)
})

export default withSession(handler, options);

export const config = {
    api: {
        externalResolver: true,
    },
}