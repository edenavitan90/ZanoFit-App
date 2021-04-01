const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const cors = require('cors');

// Imports Routes:
const authRouter = require('./routes/auth');
const coachUsersRouter = require('./routes/users')
const coachRouter = require('./routes/coach')
const postRouter = require('./routes/posts');

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
app.use('/ZanoFitApp/user', authRouter);
app.use('/ZanoFitApp/coach/users', coachUsersRouter);
app.use('/ZanoFitApp/coach', coachRouter);
app.use('/ZanoFitApp/posts', postRouter);

app.listen(port, () => console.log(`The server is running on port: ${port}`));