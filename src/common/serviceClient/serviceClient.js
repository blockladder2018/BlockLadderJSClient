import ServiceCallGenerator from "../serviceCallGenerator";

class ServiceClient {
  constructor(serviceConfig) {
    this._createCall = ServiceCallGenerator.generateServiceCall(serviceConfig.endpointUrl);
    this._timeout = serviceConfig.timeout;
  }

  _callService(httpMethod, apiPath, request, timeout = this._timeout) {
    return this._createCall(
      httpMethod,
      apiPath,
      timeout,
      request);
  }

  _createCall(httpMethod, apiPath, timeout, request) {
    return this._createCall(httpMethod, apiPath, timeout)(request);
  }
};

export default ServiceClient;
