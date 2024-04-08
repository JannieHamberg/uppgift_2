const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');


const usersRouter = require('./resources/users/users.router');
const authRouter = require('./resources/auth/auth.router');
const productsRouter = require('./resources/products/products.router'); 

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieSession({
    secret: 's3cr3tk3y',
    maxAge: 1000 * 60 * 60 * 24,
}));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.listen(3001, () => console.log('Server is running on port 3001'));