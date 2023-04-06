const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw error ('Database not configured');
}

async function test() {

    const url = `mongodb+srv://${userName}:${password}@${hostname}`;

    const client = new MongoClient(url);
    const userCollection = client.db('TheWaal').collection('users');
    const eventCollection = client.db('TheWaal').collection('events');
    const houseCollection = client.db('TheWaal').collection('houses');

    const house = {
        name: 'The Waal',
        address: '1234 Main St',
        city: 'Salt Lake City',
        state: 'UT',
        zip: '84101',
    };
    await houseCollection.insertOne(house);

    const query = {state: 'UT'};
    const options = {
        sort: { name: 1 },
        limit: 10,
    };


    const cursor = collection.find(query, options);
    const result = await cursor.toArray();
    console.log(result);

    }
test().catch(console.error);




async function test() {
    await client.connect();
    const result = await userCollection.insertOne(me);
    console.log(result);
}

test();

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4()
    };
    await userCollection.insertOne(user);

    return user;
}

function addEvent(event) {
    return eventCollection.insertOne(event);
}

function getEvents() {
    const query = {};
    const options = {
        sort: { startDate: 1 },
        limit: 10,
    };
    const cursor = eventCollection.find(query, options);
    return cursor.toArray();
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addEvent,
    getEvents,
};