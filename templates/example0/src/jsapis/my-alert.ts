/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ICommonParams } from '../common-types'
/**
 * API xịn
 */

export interface JSAPIAlertMain {
  /**
   *
   * `my.alert` là API dùng để thực show popup alert
 */
  (
    paramsObject: JSAPIAlertOption<Data>
  ): JSAPIAlertReturn;
}

/**
 * Để cấu hình việc gọi network, bạn cần truyền một params object:
 */
export type JSAPIAlertOption<Data extends Object = {}> = ICommonParams<Data> & {
  /**
   * Đường dẫn muốn gọi tới.
   */
  url: string;
  /**
   * [method='GET'] - Phương thức gọi network. Mặc định sẽ là GET.
   */
  method?: Alert["method"];
  /**
   * Data kèm theo trong request body.
   */
  data?: any;
  /**
   * [timeout=30000] - Alert sẽ bị cancel sau khoảng thời gian timeout. Đơn vị là mili giây (ms); mặc định là 30,000 (30s)
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

export interface JSAPIAlertSuccessPayload<Data extends Object = {}> {
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
  statusText: "OK" | "Continue" | "Not Found";
}
 
export type JSAPIAlertReturn = undefined
 