const express = require('express');
const app = express();

const port = 4000;

app.use(express.json());

app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

//GetEvents
apiRouter.get('/events', (req, res) => {
    res.send(events);
});

//GetEvent
apiRouter.get('/events/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const event = events.find((event) => event.id === id);
    res.send(event);
});

//CreateEvent
apiRouter.post('/events', (req, res) => {
    events = updateEvents(req.body, events);
    res.send(events);
});

//UpdateEvent
apiRouter.put('/events/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    events = updateEvents(req.body, events, id);
    res.send(events);
});

app.use((req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


//TRIED TO ADD CODE BELOW TO GET AUTHENTICATION TO WORK BUT IT DIDN'T WORK SO I COMMENTED IT OUT AND LEFT IT HERE FOR REFERENCE
//THE CODE BROKE THE APP AND I COULDN'T FIGURE OUT WHY SO I COMMENTED IT OUT AND LEFT IT HERE FOR REFERENCE

//const cookieParser = require('cookie-parser');
// const bcrypt = require('bcrypt');
// const express = require('express');
// const app = express();
// const DB = require('./database.js');
// const { peerProxy } = require('./peer-proxy.js');

// const authCookieName = 'token';

// const port = process.argv.length > 2 ? process.argv[2] : 4000;

// app.use(express.json());

// app.use(cookieParser());

// app.use(express.static('public'));

// const apiRouter = express.Router();
// app.use('/api', apiRouter);

// // CreateAuth token for a new user
// apiRouter.post('/auth/create', async (req, res) => {
//     if (await DB.getUser(req.body.email)) {
//       res.status(409).send({ msg: 'Existing user' });
//     } else {
//       const user = await DB.createUser(req.body.email, req.body.password);
  
//       // Set the cookie
//       setAuthCookie(res, user.token);
  
//       res.send({
//         id: user._id,
//       });
//     }
//   });

//   apiRouter.delete('/auth/logout', (_req, res) => {
//     res.clearCookie(authCookieName);
//     res.status(204).end();
//   });
  
//   // GetUser returns information about a user
//   apiRouter.get('/user/:email', async (req, res) => {
//     const user = await DB.getUser(req.params.email);
//     if (user) {
//       const token = req?.cookies.token;
//       res.send({ email: user.email, authenticated: token === user.token });
//       return;
//     }
//     res.status(404).send({ msg: 'Unknown' });
//   });
  
//   // secureApiRouter verifies credentials for endpoints
//   const secureApiRouter = express.Router();
//   apiRouter.use(secureApiRouter);
  
//   secureApiRouter.use(async (req, res, next) => {
//     const authToken = req.cookies[authCookieName];
//     const user = await DB.getUserByToken(authToken);
//     if (user) {
//       next();
//     } else {
//       res.status(401).send({ msg: 'Unauthorized' });
//     }
//   });

// //GetEvents
// apiRouter.get('/events', (req, res) => {
//     res.send(events);
// });

// //GetEvent
// apiRouter.get('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event = events.find((event) => event.id === id);
//     res.send(event);
// });

// //CreateEvent
// apiRouter.post('/events', (req, res) => {
//     events = updateEvents(req.body, events);
//     res.send(events);
// });

// //UpdateEvent
// apiRouter.put('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id); 
//     events = updateEvents(req.body, events, id);
//     res.send(events);
// });

// // Default error handler
// app.use(function (err, req, res, next) {
//     res.status(500).send({ type: err.name, message: err.message });
//   });
  
//   // Return the application's default page if the path is unknown
//   app.use((_req, res) => {
//     res.sendFile('index.html', { root: 'public' });
//   });
  
//   // setAuthCookie in the HTTP response
//   function setAuthCookie(res, authToken) {
//     res.cookie(authCookieName, authToken, {
//       secure: true,
//       httpOnly: true,
//       sameSite: 'strict',
//     });
//   }
  
//   const httpService = app.listen(port, () => {
//     console.log(`Listening on port ${port}`);
//   });
  
//   peerProxy(httpService);





//LOOK AT CODE BELOW IN CASE USEFUL



// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
// });

// app.use(express.json());

// var apiRouter = express.Router();
// app.use('/api', apiRouter);

// apiRouter.get('/users', (req, res) => {
//     res.send(users);
// });

// apiRouter.get('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((user) => user.id === id);
//     res.send(user);
// });

// apiRouter.post('/users', (req, res) => {
//     users = updateUsers(req.body, users);
//     res.send(users);
// });

// app.use((req, res, next) => {
//     res.status(404).send('Not Found');
//     res.sendFile('index.html', { root: 'public' });
// });

// let users = [
//     { id: 1, name: 'alice' },
//     { id: 2, name: 'bek' },
//     { id: 3, name: 'chris' },
// ];

// function updateUsers(body, users) {
//     const { name } = body;
//     const id = users.length + 1;
//     const user = { id, name };
//     users.push(user);
//     return users;
// }



// apiRouter.put('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((user) => user.id === id);
//     user.name = req.body.name;
//     res.send(user);
// });

// apiRouter.delete('/users/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((user) => user.id === id);
//     const index = users.indexOf(user);
//     users.splice(index, 1);
//     res.send(user);
// });

// apiRouter.get('/users/:id/events', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     res.send(events);
// });

// apiRouter.post('/users/:id/events', (req, res) => {
//     const id = parseInt(req.params.id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const { name, start_date, end_date, image_url } = req.body;
//     const event = { name, start_date, end_date, image_url };
//     events.push(event);
//     res.send(events);
// });

// apiRouter.get('/users/:id/events/:event_id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event_id = parseInt(req.params.event_id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const event = events.find((event) => event.id === event_id);
//     res.send(event);
// });

// apiRouter.put('/users/:id/events/:event_id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event_id = parseInt(req.params.event_id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const event = events.find((event) => event.id === event_id);
//     event.name = req.body.name;
//     event.start_date = req.body.start_date;
//     event.end_date = req.body.end_date;
//     event.image_url = req.body.image_url;
//     res.send(event);
// });

// apiRouter.delete('/users/:id/events/:event_id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event_id = parseInt(req.params.event_id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const event = events.find((event) => event.id === event_id);
//     const index = events.indexOf(event);
//     events.splice(index, 1);
//     res.send(event);
// });

// apiRouter.get('/users/:id/events/:event_id/comments', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event_id = parseInt(req.params.event_id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const event = events.find((event) => event.id === event_id);
//     const comments = event.comments;
//     res.send(comments);
// });

// apiRouter.post('/users/:id/events/:event_id/comments', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event_id = parseInt(req.params.event_id);
//     const user = users.find((user) => user.id === id);
//     const events = user.events;
//     const event = events.find((event) => event.id === event_id);
//     const comments = event.comments;
//     const { content } = req.body;
//     const comment = { content };
//     comments.push(comment);
//     res.send(comments);
// });

// //just get events
// apiRouter.get('/events', (req, res) => {
//     res.send(events);
// });

// //get event by id
// apiRouter.get('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event = events.find((event) => event.id === id);
//     res.send(event);
// });

// //create event
// apiRouter.post('/events', (req, res) => {
//     events = updateEvents(req.body, events);
//     res.send(events);
// });

// //update event
// apiRouter.put('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event = events.find((event) => event.id === id);
//     event.name = req.body.name;
//     event.start_date = req.body.start_date;
//     event.end_date = req.body.end_date;
//     event.image_url = req.body.image_url;
//     res.send(event);
// });

// //delete event
// apiRouter.delete('/events/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const event = events.find((event) => event.id === id);
//     const index = events.indexOf(event);
//     events.splice(index, 1);
//     res.send(event);
// });

