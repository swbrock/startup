const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = "thewaal.yj9rypo.mongodb.net";

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('TheWaal').collection('users');
const scoreCollection = client.db('TheWaal').collection('scores');
const movieCollection = client.db('TheWaal').collection('movies');
const ratingCollection = client.db('TheWaal').collection('ratings');


//rating includes movie id, user id, rating
async function addRating(rating) {
  await ratingCollection.insertOne(rating);
}

//get all ratings by movie id
async function getRatingsByMovieId(id) {
  const query = { movieId: id };
  const options = {
    sort: { rating: 1 },
  };
  const cursor = ratingCollection.find(query, options);
  return cursor.toArray();
}

//get all ratings by user id
async function getRatingsByUserId(id) {
  const query = { userId: id };
  const options = {
    sort: { rating: 1 },
  };
  const cursor = ratingCollection.find(query, options);
  return cursor.toArray();
}
main().catch(console.error);

// add movie to database
async function addMovie(movie) {
  await movieCollection.insertOne(movie);
}

// get all movies from database
async function getMovies() {
  const query = {};
  const options = {
    sort: { title: 1 },
  };
  const cursor = movieCollection.find(query, options);
  return cursor.toArray();
}

// get movie by id
async function getMovieById(id) {
  const query = { _id: id };
  const options = {
    sort: { title: 1 },
  };
  const cursor = movieCollection.find(query, options);
  return cursor.toArray();
}

// get movie by title
async function getMovieByTitle(title) {
  const query = { title: title };
  const options = {
    sort: { title: 1 },
  };
  const cursor = movieCollection.find(query, options);
  return cursor.toArray();
}


function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {};
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}


module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  addMovie,
  getMovies,
  getMovieById,
  getMovieByTitle,
  addRating,
  getRatingsByMovieId,
  getRatingsByUserId,
};
