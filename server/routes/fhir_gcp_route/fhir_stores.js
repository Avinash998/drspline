'use strict';

const {google} = require('googleapis');
const creds = require('./../../config/credentials-route.json');

function listFhirStores(client, projectId, cloudRegion, datasetId) {
  //console.log('listFhirStores function is called');
  const parentName = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}`;

  const request = {parent: parentName};

  return client.projects.locations.datasets.fhirStores
    .list(request)
    .then(results => {
   // console.log(results['data']['fhirStores']);
    return results['data']['fhirStores'];
    })
    .catch(err => {
      console.log('Error');
     return err;
    });
}

function createFhirStore(
  client,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId
) {
 // console.log('createFhirStore function is called');
  const parentName = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}`;

  const request = {parent: parentName, fhirStoreId: fhirStoreId};

  return client.projects.locations.datasets.fhirStores
    .create(request)
    .then(() => {
      return fhirStoreId;
    })
    .catch(err => {
      return err;
    });
}

function deleteFhirStore(
  client,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId
) {
 // console.log('deleteFhirStore function is called');
  const fhirStoreName = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  const request = {name: fhirStoreName};

 return  client.projects.locations.datasets.fhirStores
    .delete(request)
    .then(() => {
      return fhirStoreId;
    })
    .catch(err => {
      return err;
    });
}

function getFhirStore(client, projectId, cloudRegion, datasetId, fhirStoreId) {
 // console.log('getFhirStore function is called');
  const fhirStoreName = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  const request = {name: fhirStoreName};

  return client.projects.locations.datasets.fhirStores
    .get(request)
    .then(results => {
      return results['data'];
    })
    .catch(err => {
      return err;
    });
}

function getMetadata(client, projectId, cloudRegion, datasetId, fhirStoreId) {
 // console.log('getMetadata function is called');
  const fhirStoreName = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/fhirStores/${fhirStoreId}`;

  const request = {name: fhirStoreName};

  return client.projects.locations.datasets.fhirStores
    .getMetadata(request)
    .then(results => {
      console.log(`Capabilities statement for FHIR store ${fhirStoreId}:`);
      console.log(results);
      return results;
    })
    .catch(err => {
      return err;
    });
}


function getClient(apiKey, serviceAccountJson) {
 // console.log('getClient function called');
  const API_VERSION = 'v1alpha';
  const DISCOVERY_API = 'https://healthcare.googleapis.com/$discovery/rest';
  return google.auth
    .getClient({scopes: ['https://www.googleapis.com/auth/cloud-platform']})
    .then(authClient => {
      const discoveryUrl = `${DISCOVERY_API}?labels=CHC_ALPHA&version=${API_VERSION}&key=${apiKey}`;

      google.options({auth: authClient});

      return google
        .discoverAPI(discoveryUrl)
        .then(client => {
          //console.log(Client);
          //cb(client);
          return client;
        })
        .catch(err => {
          return err;
        // console.log('Errror Message');
        });
    });

}


module.exports = {
  getClient,
  listFhirStores,
  createFhirStore,
  deleteFhirStore,
  getFhirStore,
  getMetadata
};
