// Variable, Function, Function nếu không có params type thì để rỗng
// @apiName, @description, @defaultValue

import { JSApi } from "../common-types";

/**
 * @apiName my.request
 * @description This is a my.request type
 */
declare const MyRequest: JSApi<OptionData, SuccessData, ErrorData>;

// Data
type OptionData = {
  /**
   * @description This is a url property
   */
  url: string;
  /**
   * @description This is a method property
   * @defaultValue "GET"
   */
  method?: string;
  /**
   * @description This is a property property
   */
  progress?: (progress: number) => void;
};

type SuccessData = {
  /**
   * @description This is a status property
   */
  status?: string;
  /**
   * @description This is a data property
   */
  data?: any;
};

type ErrorData = null;
