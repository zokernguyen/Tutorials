_Tutorial by HoleTex: https://www.youtube.com/watch?v=aM_XIWjxcYA&list=PLqQ6Lvascx2tfVJ5iLirMgbazxMH4Hfmw_

---
**TOC**
- [1. Teach Stack](#1-teach-stack)

---

### I. Teach Stack

- ReactJS
- NodeJS
- GraphQL
- MongoDB
- Firebase

# 1. GraphQL:
- QL = query language (ngôn ngữ truy vấn API).
- Chỉ có 1 endpoint duy nhất để lấy toàn bộ dữ liệu so với nhiều endpoing của REST API.
- Ưu điểm: 
    + Under fetching
    + Over fetching
    + Rút gọn thời gian phát triển app

=> Ứng dụng: quyết định lượng data trả về tương ứng tốc độ mạng, cấu hình máy... của client để tối ưu UX.

- Hạn chế: không hỗ trợ caching mặc định, dễ bị DDOS.

- typeDefs (schema - các chỉ dẫn để GraphQL trả dữ liệu về cho client): gồm 3 root type chính
  +  Querry: các hoạt động truy vấn dữ liệu từ phía Client.
  +  Mutation: các hoạt động thay đổi, chỉnh sửa dữ liệu.
  +  Subscription: các hoạt động update real-time từ phía Client.
và các type khác do dev tự định nghĩa.

- resolvers: các hàm để hướng dẫn việc lấy dữ liệu cho từng type đã khai báo trong schema. 1 resolver nhận vào 4 tham số:
  + parent:
  + arguments
  + context:
  + info:

---

### II. App Analyze

---

### III. Implement steps
