/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICommonParams } from '../../common-types'

/**
 * ---
 * title: my.request
 * description: JSAPI for Network
 * ---
 */

/**
 *
 * <!-- comment example for developer -->
 */
export interface JSAPIRequestMain {
  /**
    *
    * `my.request` là API dùng để thực hiện các network request. Hiện chỉ hỗ trợ những request qua giao thức **https**.
    * Ứng dụng của bạn sẽ được chạy trong môi trường cô lập thuần javascript nên sẽ không có các hàm gọi network thông thường như `fetch` hay `XMLHttpRequest`. Để thực hiện gọi network bạn phải dùng đến `my.request`.
    *
    * ***Quan trọng***: Bạn cần phải thêm tên miền trong phần **Cài đặt chung** của ứng dụng trên [Tini Console](https://developer.tiki.vn/apps) trước khi sử dụng các Networking API và Webview. Xem phần hướng dẫn [tại đây](/docs/development/tini-console/whitelist-domains).
    *
    *
    * ## Sample Code
    * ### File javascript
    * ```js
    * my.request({
    *   url: 'https://example.api/user',
    *   data: {
    *     x: '',
    *     y: ''
    *   },
    *   headers: {
    *     'content-type': 'application/json'
    *   },
    *   success (res) {
    *     console.log(res.data)
    *   }
    * })
    * ```
    * ### File txml
    * ```xml
    * <view class="page">
    *   <view class="page__section">
    *     <view class="page__section__content">
    *       <text>my.request</text>
    *       <text>{{JSON.stringify(response)}}</text>
    *       <view class="page__section__buttons">
    *         <button
    *           onTap="makeRequest"
    *         >{{loading ? "Loading..." : "Query"}}</button>
    *         <button onTap="clear">Clear</button>
    *       </view>
    *     </view>
    *   </view>
    * </view>
    * ```
    */
  <Data extends Object>(
    paramsObject: JSAPIRequestOption<Data>
  ): JSAPIRequestReturn;
}

/**
 * Để cấu hình việc gọi network, bạn cần truyền một params object:
 */
export interface JSAPIRequestOption<Data extends Object = {}> extends ICommonParams<JSAPIRequestSuccessPayload<Data>> {
  /**
   * Đường dẫn muốn gọi tới.
   */
  url: string;
  /**
   * [method='GET'] Phương thức gọi network. Mặc định sẽ là GET.
   */
  method?: Request['method'];
  /**
   * Data kèm theo trong request body.
   */
  data?: any;
  /**
   * [timeout=30000] Request sẽ bị cancel sau khoảng thời gian timeout. Đơn vị là mili giây (ms); mặc định là 30,000 (30s)
   */
  timeout?: number;
  /**
   * [dataType='JSON'] Quy định định dạng dữ liệu (data format) trả về sau request. Hỗ trợ JSON, text, base64 và arraybuffer; mặc định là JSON.
   */
  dataType?: 'JSON' | 'TEXT' | 'BASE64' | 'arraybuffer';
  /**
   * [includeHeader=false] Quy định dữ liệu trả về trường hợp thành công có bao gồm headers hay không.
   */
  includeHeader?: boolean;

}

export interface JSAPIRequestSuccessPayload<Data extends Object = {}> {
  /**
   * Dữ liệu trả về. Định dạng của nó phụ thuộc vào tuộc tính dataType.
   */

  data: Data;
  /**
   * Response Header trả về trường hợp includeHeader=true.
   */
  headers?: Object;
  /**
   * [status=200] Mã trả về (Response code). Mặc định là 200.
   */
  status: number;
  /**
   * [statusText='OK'] Thông điệp trả về tương ứng với mã trả về. Mặc định sẽ là OK.
   */
  statusText: 'OK' | 'Continue' | 'Not Found';
}

/**
 * `my.request()` là một void function
 */
export interface JSAPIRequestReturn { }
