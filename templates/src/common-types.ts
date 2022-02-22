export interface JSApi<OptionData, SuccessData, ErrorData> {
  (
    options?: OptionData & {
      /**
       * @description Callback function khi gọi JSApi thành công
       */
      success?: (response?: SuccessData) => void;
      /**
       * @description Callback function khi gọi JSApi thất bại
       */
      fail?: (error?: ErrorData) => void;
    }
  ): void;
}
