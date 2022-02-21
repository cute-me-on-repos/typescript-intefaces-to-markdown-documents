
API xịn<br/>
`my.request` là API dùng để thực hiện các network request. Hiện chỉ hỗ trợ những request qua giao thức **https**.
Ứng dụng của bạn sẽ được chạy trong môi trường cô lập thuần javascript nên sẽ không có các hàm gọi network thông thường như `fetch` hay `XMLHttpRequest`. Để thực hiện gọi network bạn phải dùng đến `my.request`.

***Quan trọng***: Bạn cần phải thêm tên miền trong phần **Cài đặt chung** của ứng dụng trên [Tini Console](https://developer.tiki.vn/apps) trước khi sử dụng các Networking API và Webview. Xem phần hướng dẫn [tại đây](/docs/development/tini-console/whitelist-domains).

## API Params

Để cấu hình việc gọi network, bạn cần truyền một params object:

| Thuộc tính | Kiểu dữ liệu | Bắt buộc | Default | Mô tả |
| ---------- | ------------ | :------: | ----- | ----- |
| url | string |   ✓    |  |Đường dẫn muốn gọi tới. |
| headers | Object |  |  |   Cấu hình headers khi thực hiện gọi network. |
| method | string |  | 'GET' |- Phương thức gọi network. Mặc định sẽ là GET. |
| data | Data |  |  |Data kèm theo trong request. |
| timeout | number |  | 30000 |- Request sẽ bị cancel sau khoảng thời gian timeout. Đơn vị là mili giây (ms); mặc định là 30,000 (30s) |
| dataType | "JSON" \| "TEXT" \| "BASE64" \| "arraybuffer" |  | 'JSON' |- Quy định định dạng dữ liệu (data format) trả về sau request. Hỗ trợ JSON, text, base64 và arraybuffer; mặc định là JSON. |
| includeHeader | boolean |  | false |- Quy định dữ liệu trả về trường hợp thành công có bao gồm headers hay không. |
| success | Function |  |  |Callback function khi việc gọi network thành công. |
| fail | Function |  |  |Callback function khi việc gọi network thất bại. |
| complete | Function |  |  |Callback function khi việc gọi network kết thúc cho dù thành công hay thất bại. |

### Callback success function payload



| Thuộc tính | Kiểu dữ liệu | Default | Mô tả |
| ---------- | ------------ | ----- | ----- |
| data | Data |  | Dữ liệu trả về. Định dạng của nó phụ thuộc vào tuộc tính dataType. |
| headers | Object |  | Response Header trả về trường hợp includeHeader=true. |
| status | number | 200 | Mã trả về (Response code). Mặc định là 200. |
| statusText | "OK" \| "Continue" \| "Not Found" | 'OK' | Thông điệp trả về tương ứng với mã trả về. Mặc định sẽ là OK. |

## Returns

task API trả về network request task. Bạn có thể thực hiện huỷ việc gọi network thông qua network request task.

