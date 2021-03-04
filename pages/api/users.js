import nextConnect from 'next-connect';
import middleware from '../../middleware/mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('users').find(
        {}
    ).project({
        _id:0,
        first_name: 1,
        last_name: 1,
        company_name: 1,
        address: 1,
        city: 1,
        state: 1,
        post: 1,
        phone1: 1,
    }).limit(10).toArray();
    res.json(doc);
});

export default handler;