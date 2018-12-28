const creds = require('./../config/credentials-route.json');

const express = require('express');
const router = express.Router();

router.get('/test',(req, res) => {
	res.status(200).send("/datasets/test route successfully working");
});

const fhirstoreRoutes = require('./fhirstores_route.js');
router.use('/:datasetId/fhirstores', fhirstoreRoutes);

router.get('/',(req, res) => {
	res.status(200).send('Get the lists of datasets');
});

router.get(`/${creds.datasetId}`,(req,res) => {
 res.status(200).send(`Get the details of dataset ${creds.datasetId}.`);
});


module.exports = router;