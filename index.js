const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const dummyRoute = require('./routes/dummy') 
const TestRoute = require('./routes/test.route')

const app = express();
app.use(express.json());
app.use(cors());

//mongo connection
const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;
// console.log(CONNECTION_URL,PORT)
mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
})
.then(() => app.listen(PORT, () => console.log(`Connection is established and running on port: ${PORT}`)))
.catch((err) => console.log(err.message));
// mongoose.set('useFindAndModify', false);

//main route 
app.use('/test',TestRoute)

//test route 
app.use('/',dummyRoute)

// app.use(errorHandler);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
  });