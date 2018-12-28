const {GoogleToken} = require('gtoken');
const request = require('request-promise');
const creds = require('./../../config/credentials-route.json');


const BASE_URL = 'https://healthcare.googleapis.com/v1alpha';

function getToken(serviceAccountJson){
  console.log('getToken function called');
	return new Promise((resolve, reject) => {
		const gtoken = new GoogleToken({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS || `./../../config/clinic-spline-managment-system.json`,
		    scope: ['https://www.googleapis.com/auth/cloud-platform'], // or space-delimited string of scopes
		  });

		gtoken.getToken((err, token) => {
			if(err){
				//console.log('ERROR: ', err);
				reject('Type is not matching');	
			}
			else {
        //console.log(token);
				resolve(token);
			}
		})
	})
}

function createResource(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType
) {

  console.log('createResource function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}`;

  const postData = {
    resourceType: resourceType
  };
  const options = {
    url: resourcePath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    body: postData,
    json: true,
    method: 'POST',
  };
 // console.log(options);
  return request(options)
    .then(resource => {
     // console.log(`Created resource ${resourceType} with ID ${resource.id}.`);
      //return resource.id;
      return resource;

    })
    .catch(err => {
     return err;
    });
}


function getResource(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType,
  resourceId
) {

  console.log('getResource function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}/${resourceId}`;

  const options = {
    url: resourcePath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    json: true,
  };

  return request(options)
    .then(results => {
     /* console.log(
        `Got ${resourceType} resource:\n${JSON.stringify(results, null, 2)}`
      );*/
      return results;
    })
    .catch(err => {
     // console.error(err);
      return err;
    });
}


function searchResourcesGet(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType
) {
  console.log('searchResourcesGet function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcesPath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}`;

  const options = {
    url: resourcesPath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    json: true,
  };

  return request(options)
    .then(results => {
    //  console.log(JSON.stringify(results, null, 2));
    return results;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

function searchResourcesPost(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType
) {
  console.log('searchResourcesPost function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcesPath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}/_search`;

  const options = {
    url: resourcesPath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    json: true,
    method: 'POST',
  };

  return request(options)
    .then(results => {
     // console.log(JSON.stringify(results, null, 2));
     return results;
    })
    .catch(err => {
      console.error(err);
      return err;
    });
}

function getPatientEverything(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceId
) {
  console.log('getPatientEverything function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const fhirStorePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/Patient/${resourceId}/$everything`;

  const options = {
    url: fhirStorePath,
    headers: {
      authorization: `Bearer ${token}`,
    },
    json: true,
  };

  return request(options)
    .then(results => {
     // console.log(`Got all resources in patient ${resourceId} compartment:`);
     // console.log(results);
     return results;
    })
    .catch(err => {
     // console.error(err);
     return err;
    });
}

function deleteResource(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType,
  resourceId
) {
  console.log('deleteResource function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}/${resourceId}`;

  const options = {
    url: resourcePath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    json: true,
    method: 'DELETE',
  };

  return request(options)
    .then(() => {
      //console.log(`Deleted ${resourceType} with ID ${resourceId}.`);
      return resourceId;
    })
    .catch(err => {
      //console.error(err);
      return err;
    });
}

function patchResource(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType,
  resourceId
) {
    console.log('patchResource function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}/${resourceId}`;

  const patchOperations = [{op: 'replace', path: '/active', value: false}];

  const options = {
    url: resourcePath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json-patch+json',
    },
    body: patchOperations,
    json: true,
    method: 'PATCH',
  };

  return request(options)
    .then(() => {
     // console.log(`Patched ${resourceType} with ID ${resourceId}`);
     return resourceId;
    })
    .catch(err => {
     // console.log('ERROR:', err.message);
     return err.message;
    });
}

function updateResource(
  token,
  projectId,
  cloudRegion,
  datasetId,
  fhirStoreId,
  resourceType,
  resourceId
) {
  console.log('updateResource function called');
  const parentName = `${BASE_URL}/projects/${projectId}/locations/${cloudRegion}`;

  const resourcePath = `${parentName}/datasets/${datasetId}/fhirStores/${fhirStoreId}/resources/${resourceType}/${resourceId}`;

  const patientData = {
    resourceType: resourceType,
    id: resourceId,
    active: true,
  };

  const options = {
    url: resourcePath,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/fhir+json; charset=utf-8',
    },
    body: patientData,
    json: true,
    method: 'PUT',
  };

  return request(options)
    .then(() => {
      //console.log(`Updated ${resourceType} with ID ${resourceId}`);
      return resourceId;
    })
    .catch(err => {
      //console.error(err);
      return err;
    });
}

module.exports = {
  getToken,
  createResource,
  getResource,
  searchResourcesGet,
  searchResourcesPost,
  getPatientEverything,
  deleteResource,
  patchResource,
  updateResource
};