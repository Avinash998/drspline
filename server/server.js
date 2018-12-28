const express = require('express');
const app = express();

const bodyParser = require('body-parser');
/*const config = require('./config/database');*/
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const {google} = require('googleapis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

/*mongoose.connect(config.database, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log(`Connected to Database : ${config.database}`);
  });
mongoose.connection.on('error', (err) => {
    console.log(`Database error : ${err}`);
});*/

// @route GET /hello
// @desc Example route to test if node.js server is running
app.get('/hello', (req, res) => {
    res.send('Hello World!')
});

const datasetsRoutes = require('./routes/datasets_route.js');
app.use('/datasets', datasetsRoutes);

// Used for the API requests made to interact with the patient database
const patientRoutes = require('./routes/api');
app.use('/api', patientRoutes);

// Used for the API requests made to interact with the Google Storage Bucket (for files)
const imageRoutes = require('./routes/image');
app.use('/image', imageRoutes);

// Used for the API requests made for the DialogFlow API, used in Actions on Google/Google Assistent
const dialogFlowRoutes = require('./routes/dialogflow');
app.use('/dialogflow', dialogFlowRoutes);

/*app.use(express.static(__dirname + '/angular-src/dist/angular-src'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/angular-src/dist/angular-src/index.html')));*/

// accessing static html pages
/*app.use(express.static(__dirname+'/public'));*/

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});