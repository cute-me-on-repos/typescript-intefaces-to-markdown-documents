# my.request

This is a my.request type

## Thuộc tính

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Mặc định | Mô tả                                      |
| ---------- | ------------ | -------- | -------- | ------------------------------------------ |
| url        | string       | ✓        |          | This is a url property                     |
| method     | string       |          | GET      | This is a method property                  |
| progress   | Function     |          |          | This is a progress property                |
| success    | Function     |          |          | Callback function khi gọi JSApi thành công |
| fail       | Function     |          |          | Callback function khi gọi JSApi thất bại   |

## Thuộc tính cho progress function
| Thuộc tính | Kiểu dữ liệu | Mô tả |
| ---------- | ------------ | ----- |
| progress   | number       |       |

## Giá trị trả về khi gọi JSApi thành công
| Thuộc tính | Kiểu dữ liệu        | Mô tả                     |
| ---------- | ------------------- | ------------------------- |
| status     | string \| undefined | This is a status property |
| data       | any                 | This is a data property   |