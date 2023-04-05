const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.use(express.json());

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.get('/users', (req, res) => {
    res.send(users);
});

apiRouter.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    res.send(user);
});

apiRouter.post('/users', (req, res) => {
    users = updateUsers(req.body, users);
    res.send(users);
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
    res.sendFile('index.html', { root: 'public' });
});

let users = [
    { id: 1, name: 'alice' },
    { id: 2, name: 'bek' },
    { id: 3, name: 'chris' },
];

function updateUsers(body, users) {
    const { name } = body;
    const id = users.length + 1;
    const user = { id, name };
    users.push(user);
    return users;
}



apiRouter.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    user.name = req.body.name;
    res.send(user);
});

apiRouter.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.send(user);
});
