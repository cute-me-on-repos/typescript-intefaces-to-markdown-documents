/// <reference no-default-lib="true" />

declare namespace my {
 interface JSAPIRequestMain {
    /**
     *
     * `my.request` là API dùng để thực hiện các network request. Hiện chỉ hỗ trợ những request qua giao thức **https**.
     * Ứng dụng của bạn sẽ được chạy trong môi trường cô lập thuần javascript nên sẽ không có các hàm gọi network thông thường như `fetch` hay `XMLHttpRequest`. Để thực hiện gọi network bạn phải dùng đến `my.request`.
     *
     * ***Quan trọng***: Bạn cần phải thêm tên miền trong phần **Cài đặt chung** của ứng dụng trên [Tini Console](https://developer.tiki.vn/apps) trước khi sử dụng các Networking API và Webview. Xem phần hướng dẫn [tại đây](/docs/development/tini-console/whitelist-domains).
     */
    <Data extends Object>(
      paramsObject: JSAPIRequestOption<JSAPIRequestSuccessPayload<Data>>
    ): JSAPIRequestReturn;
  }
  
  /**
   * Để cấu hình việc gọi network, bạn cần truyền một params object:M<br./>
   * 
   * 
   * 
   */
   type JSAPIRequestOption<Data extends Object = {}> = ICommonParams<Data> & {
    /**
     * Đường dẫn muốn gọi tới.
     */
    url: string;
    /**
     Cấu hình headers khi thực hiện gọi network.
     */
    headers?: Object;
    /**
     * [method='GET'] - Phương thức gọi network. Mặc định sẽ là GET.
     */
    method?: Request["method"];
    /**
     * Data kèm theo trong request.
     */
    data?: Data;
    /**
     * [timeout=30000] - Request sẽ bị cancel sau khoảng thời gian timeout. Đơn vị là mili giây (ms); mặc định là 30,000 (30s)
     */
    timeout?: number;
    /**
     * [dataType='JSON'] - Quy định định dạng dữ liệu (data format) trả về sau request. Hỗ trợ JSON, text, base64 và arraybuffer; mặc định là JSON.
     */
    dataType?: "JSON" | "TEXT" | "BASE64" | "arraybuffer";
    /**
     * [includeHeader=false] - Quy định dữ liệu trả về trường hợp thành công có bao gồm headers hay không.
     */
    includeHeader?: boolean;
    
  }
  
   interface JSAPIRequestSuccessPayload<Data extends Object = {}> {
    /**
     * Dữ liệu trả về. Định dạng của nó phụ thuộc vào tuộc tính dataType.
     */
    data: Data;
    /**
     * [status=200] Mã trả về (Response code)
     */
    status: number;
  }
  
  /**
   * task API trả về network request task. Bạn có thể thực hiện huỷ việc gọi network thông qua network request task.
   */
   type JSAPIRequestReturn = void
  /// khi dung ben tinitype
  
  declare const request: JSAPIRequestMain;
}

