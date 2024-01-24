const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config({path: './database/.env'});

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors());
app.use(express.json({ limit: '200mb' }));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// app.use(express.urlencoded({ extended: false }));

// Import routes
const routes = require('./routes/route');


// Use routes
app.use('/', routes);
const port = process.env.PORT;

app.listen(process.env.PORT, () => console.log(`Server is running on port ${port}`));
