import axios from "axios";

const makeHttpRequest = (
  endpointUrl,
  httpMethod,
  requestHeaders,
  requestData,
  timeout) => new Promise((resolve, reject) => {
    axios({
      url: endpointUrl,
      method: httpMethod,
      headers: requestHeaders,
      data: requestData,
      timeout,
    }).then((response) => {
      if (typeof response.data === "string") {
        resolve(response.data);
      } else {
        resolve(Object.assign({
          headers: response.headers,
        }, response.data));
      }
    }).catch((error) => {
      if (!error.response) {
        reject(error);
        return;
      }

      reject({
        status: error.response.status,
        data: error.response.data,
        error,
      });
    });
  });

/**
 * @return function chain that finally builds a service call function.
 */
const generateServiceCall =
  (url, commonHeaders = undefined) =>
  (httpMethod, apiPath, customHeaders = undefined, timeout = 10000) =>
  (requestData = undefined) =>
  makeHttpRequest(
    url + apiPath,
    httpMethod,
    Object.assign({}, commonHeaders, customHeaders),
    requestData,
    timeout
  );

export default {
  generateServiceCall,
};
