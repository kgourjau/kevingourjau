import nextConnect from 'next-connect';
import auth0 from "../../lib/auth0.js";
import middleware from '../../middleware/mongodb.js';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    const session = await auth0.getSession(req)

    console.log(session)
    if (!session || !session.user) {
        res.json({})
        return
    }

    let collection = req.db.collection("users2")

    let user = session.user

    let query = {}

    query["subs." + user.sub] = {$exists: true}

    let doc = await collection.findOne(query)

    if (doc === null) {
        let doc2 = await collection.findOne({myapp_email: user.email})
        if (doc2 === null) {
            let subs = {}
            subs[user.sub] = user
            let data = {
                myapp_email: user.email,
                given_name: user.given_name,
                family_name: user.family_name,
                name: user.name,
                email_verified: user.email_verified,
                subs: subs,
            }
            collection.insertOne(data);
        } else {
            // If email already exists, attach identity provider to it
            const query = {myapp_email: user.email}
            const update = {"$set": {}}
            update["$set"]["subs." + user.sub] = user
            const options = {upsert: true};
            collection.updateOne(query, update, options)
        }
        doc = await collection.findOne(query)
    }

    res.json(doc);
});

handler.post(async (req, res) => {
    const session = await auth0.getSession(req)

    if (!session || !session.user) {
        res.json({})
        return
    }

    let data = req.body;

    let field = data.field
    let old_value = data.old_value
    let new_value = data.new_value

    let collection = req.db.collection("users2")

    let user = session.user

    let query = {}

    query["subs." + user.sub] = {$exists: true}

    let doc = await collection.findOne(query)

    if (doc !== null) {
        // If email already exists, attach identity provider to it
        const query = {myapp_email: user.email}
        const update = {"$set": {}}
        update["$set"][field] = new_value
        const options = {upsert: true};
        collection.updateOne(query, update, options)

        doc = await collection.findOne(query)

        res.json({"message":"update successful"})
    }
    else{
        res.json({"message":"no such user"})
    }
});

export default handler;