const express = require('express');
const router = express.Router({mergeParams: true});

const creds = require('./../config/credentials-route.json');
const {getClient, listFhirStores, getFhirStore, createFhirStore, deleteFhirStore} = require('./fhir_gcp_route/fhir_stores.js');

router.get('/test', (req, res) => {
	res.status(201).send('fhir store route is working');
});

const resourceRoute = require('./resources_route.js');
router.use(`/:fhirStoreId/resources`,resourceRoute);

router.get('/',(req, res) => {

	getClient(creds.apiKey, creds.serviceAccountJson).then((client) => {
	 return  listFhirStores(client, creds.projectId, creds.cloudRegion, req.params.datasetId);
	}).then((list) => {
	 // console.log(list);
	  res.status(200).send(list);
	}).catch((e) => {
		res.status(500).send('Unable to fullfill that request');
	});
	
});

router.get(`/:fhirStoreId`,(req, res) => {

	getClient(creds.apiKey, creds.serviceAccountJson).then((client) => {
	 return  getFhirStore(client, creds.projectId, creds.cloudRegion, req.params.datasetId, req.params.fhirStoreId);
	}).then((fhirStoreId) => {
	  res.status(200).send(fhirStoreId);
	}).catch((e) => {
		res.status(500).send('Unable to fullfill that request getFhirStore');
	});
});

router.post('/', (req, res) => {

	getClient(creds.apiKey, creds.serviceAccountJson).then((client) => {
	 return  createFhirStore(client, creds.projectId, creds.cloudRegion, req.params.datasetId, req.body.fhirStoreId);
	}).then((fhirStoreId) => {
	  	res.status(200).send(fhirStoreId);
	}).catch((e) => {
		res.status(500).send('Unable to fullfill that request');
	});
});

router.delete('/', (req, res) => {
	getClient(creds.apiKey, creds.serviceAccountJson).then((client) => {
	 return  deleteFhirStore(client, creds.projectId, creds.cloudRegion, req.params.datasetId, req.body.fhirStoreId);
	}).then((fhirStoreId) => {
	  res.status(200).send(fhirStoreId);
	}).catch((e) => {
		res.status(500).send('Unable to fullfill that request');
	});
});

module.exports = router;

