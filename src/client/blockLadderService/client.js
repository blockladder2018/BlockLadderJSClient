import ApiPath from './config/apiPath';

import ServiceConfig from './config/serviceConfig';

import ServiceClient from '../../common/serviceClient';
import HttpMethod from '../../common/util/httpMethod';

class Client extends ServiceClient {

  constructor() {
    super(ServiceConfig);
  }

  proxys() {
    return this._callService(HttpMethod.GET, ApiPath.BlockLadderService.proxys, null, 10000);
  }
}

export default Client;
