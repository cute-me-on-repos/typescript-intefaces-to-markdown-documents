export interface ICommonParams<P> {
  /**
 * Callback function khi việc gọi jsapi thành công.
 */
  success?: (
    /**
     * Callback success function payload
     * @param {Object} payload
     */
    payload: P,
  ) => void | Promise<void>;
  /**
   * Callback function khi việc gọi jsapi thất bại.
   */
  fail?: (
    /**
     * Callback fail function details
     * @param {Object} errorDetails
     */
    errorDetails: {
      /**
       * Error name
       */
      error: string;
      /**
       * Error message
       */
      errorMessage: string;
    },
  ) => void | Promise<void>;
  /**
   * Callback function khi việc gọi jsapi kết thúc cho dù thành công hay thất bại.
   */
  complete?: Function;
}