# 1. Authentication (login)

# 2. Authorization (phân quyền)
# 3. Storing tokens
- Lưu refresh token trong local storage có thể dễ dàng bị tấn công (XSS).
- Lưu token ở cookies lại dễ bị tấn công theo phương thức CSRF.
- Lưu token bằng Redux store từ Redux toolkits kết hợp với HTTPONLY COOKIES
- BFF - Backend for Frontend - tạo server giả để bảo mật.

# 4. Account for testing

|  username   |       email       | password |    role    |
| :---------: | :---------------: | :------: | :--------: |
| admin_zoker |  zoker@gmail.com  | zoker666 |   admin    |
|   user001   | user001@gmail.com | user001  | basic user |
|   user002   | user002@gmail.com | user002  | basic user |
|   user003   | user003@gmail.com | user003  | basic user |