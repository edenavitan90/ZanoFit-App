const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const cors = require('cors');

// Imports Routes:
const authRouter = require('./routes/auth');
const coachUsersRouter = require('./routes/user/coach/users');
const postRouter = require('./routes/posts');
//const usersRouter = require('./routes/user/users');

dotenv.config();
const port = process.env.port || 5000;

// Connect to MongoDB:
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log('connected to mongoDB!')
);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Middlewares
app.use(cors());
app.use(express.json());

// Route Middlewares
app.use('/user', authRouter);
app.use('/user/coach', coachUsersRouter);
//app.use('/user/coach', coachRouter);
app.use('/posts', postRouter);
//app.use('/coach', usersRouter);

app.listen(port, () => console.log(`The server is running on port: ${port}`));