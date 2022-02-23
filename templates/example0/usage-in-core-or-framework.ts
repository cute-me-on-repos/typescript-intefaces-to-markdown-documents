/* eslint-disable prettier/prettier */
import {JSAPIRequestOption} from "./src/jsapi/my-alert";

export default class NetworkBridgePlugin {
  jsApiNames = ['alert'];

  bridgeCallAsync(api: string, params: any, context: Record<string, any>): void {
    switch (api) {
      case 'alert':
        return this.alert(params as JSAPIRequestOption, context);
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

  alert(params: JSAPIRequestOption, context: any): void {
  // do stuff
  }

 
}
