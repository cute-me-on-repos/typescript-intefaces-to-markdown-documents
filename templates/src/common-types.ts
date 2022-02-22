export interface JSApi<OptionData, SuccessData, ErrorData> {
  (
    options?: OptionData & {
      /**
       * @description This is a request options property
       */
      success?: (response?: SuccessData) => void;
      /**
       * @description This is a request options property
       */
      fail?: (error?: ErrorData) => void;
    }
  ): void;
}
