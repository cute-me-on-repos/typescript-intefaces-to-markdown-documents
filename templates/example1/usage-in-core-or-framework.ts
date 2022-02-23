/* eslint-disable prettier/prettier */
import {JSAPIRequestOption} from "./src/jsapi/my-request";

export default class NetworkBridgePlugin {
  jsApiNames = ['request'];

  bridgeCallAsync(api: string, params: any, context: Record<string, any>): void {
    switch (api) {
      case 'request':
        return this.request(params as JSAPIRequestOption, context);
    //    ....
      default:
        context.callBridge(api, params, (response) => {
          const { data, status } = response;
          if (status === 'success') {
            context.success(data);
          } else {
            context.fail(data);
          }
        });
        break;
    }
  }

  request(params: JSAPIRequestOption, context: any): void {
  // do stuff
  }

 
}
