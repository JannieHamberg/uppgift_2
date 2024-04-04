const express = require('express');

const usersRouter = require('./resources/users/users.router');
const authRouter = require('./resources/auth/auth.router');

const app = express();

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(3001, () => console.log('Server is running on port 3001'));