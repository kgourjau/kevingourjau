import nextConnect from 'next-connect';
import middleware from '../middleware/mongodb.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let doc = await req.db.collection('users').findOne()
    res.json(doc);
});

handler.post(async (req, res) => {
    let data = req.body;
    let doc = await req.db.collection('users').updateOne({email: data.email}, {$set:data}, {upsert: true})

    res.json({message: 'ok'});
})

export default handler;