# vn_summary
## Tóm tắt văn bản tiếng Việt sử dụng K-means 

### UI sử dụng 
Một Single-page-app được viết bằng reactJS 
### UX 
Mô hình sử dụng là một mô hình Kmeans đơn giản:
    +)Một văn bản tiếng việt sẽ được tách thành từng câu và vector hóa bằng các phương pháp khác nhau.
    +)Các vector sẽ được phân loại bằng thuật toán Kmeans thành các cụm với số cụm tùy ý (ở đây số cụm = số lượng câu/3)
    +)Ở mỗi cụm sẽ chọn ra 1 câu và tổng hợp lại thành 1 đoạn văn bản chính là đầu ra của mô hình

Sử dụng thư viện flask để tạo 1 Restful Api cho mô hình

###chạy chương trình

Sau khi cài đặt môi trường và các thư viện cần thiết thiết cho JS và python
Download pretrain embedding tại đường dẫn phía dưới và đặt tại thư mục UX
```
https://drive.google.com/drive/folders/1GUiX7Zi3TKwpLu3FmaeExE5xQELaMIIE?usp=sharing
```

Chạy các lệnh

``` 
cd UI
npm init
npm start
```
mở một cửa sổ mới
```
cd UX
python summary_api.py
```
giao diện web sẽ được chạy tại 
http://localhost:3000/
