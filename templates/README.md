# Cách viết type cho một JSApi

### Bước 1. Tạo một file .ts đại diện cho một JSApi trong thư mục `src/jsapi`

Ví dụ: `src/jsapi/my-request.ts`

### Bước 2. Một type cho một JSApi sẽ được kế thừa từ interface `JSApi` trong `common-types`

```js
import { JSApi } from "../common-types";
```

### Bước 3. Để chương trình hiểu nội dung của type, cần bắt buộc khai báo các keywords sau trong comment block của JSApi

- `@apiName`: Là tên của JSApi (Bắt buộc). Sẽ được hiển thị là title của document.
- `@description`: Là mô tả của JSApi (Bắt buộc). Sẽ được hiển thị là description của document.

Ví dụ:

```js
import { JSApi } from "../common-types";

/**
 * @apiName my.request
 * @description This is a my.request type
 */
declare const MyRequest: JSApi<OptionData, SuccessData, ErrorData>;
```

JSApi interface yêu cầu truyền các types sau

- `OptionData`: Là type của các options truyền vào khi gọi JSApi
- `SuccessData`: Là type của các dữ liệu trả về khi gọi JSApi thành công
- `ErrorData`: Là type của các dữ liệu trả về khi gọi JSApi thất bại

Mỗi một thuộc tính của type cần khai báo các keywords sau trong comment block

- `@description`: Mô tả chi tiết về thuộc tính (Bắt buộc). Sẽ được hiển thị là description của một thuộc tính.
- `@defaultValue`: Giá trị mặc định của thuộc tính (Không bắt buộc). Sẽ được hiển thị là giá trị mặc định của thuộc tính.

Ví dụ:

```js
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
```

### Lưu ý

1. Keywords dành cho JSApi: `@apiName`, `@description`
2. Keywords dành cho thuộc tính: `@description`, `@defaultValue`
3. Nếu thuộc tính là một function sẽ tự tạo bảng params

### Cấu trúc file document cho một JSApi

1. Tên JSApi
2. Mô tả JSApi
3. Bảng options: Tên thuộc tính, kiểu dữ liệu, bắt buộc, giá trị mặc định, mô tả thuộc tính
4. Bảng params cho function trong bảng options (Nếu có):  Tên thuộc tính, kiểu dữ liệu, bắt buộc, giá trị mặc định, mô tả thuộc tính
5. Bảng dữ liệu trả về khi gọi JSApi thành công (Nếu có): Tên thuộc tính, kiểu dữ liệu, mô tả thuộc tính
6. Bảng dữ liệu trả về khi gọi JSApi thất bại (Nếu có): Tên thuộc tính, kiểu dữ liệu, mô tả thuộc tính
