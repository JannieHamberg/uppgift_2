const express = require('express');
const cookieSession = require('cookie-session');

const usersRouter = require('./resources/users/users.router');
const authRouter = require('./resources/auth/auth.router');

const app = express();

app.use(express.json());
app.use(cookieSession({
    secret: 's3cr3tk3y',
    maxAge: 1000 * 60 * 60 * 24,
}));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);

app.listen(3001, () => console.log('Server is running on port 3001'));