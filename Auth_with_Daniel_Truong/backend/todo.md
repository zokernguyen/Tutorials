# 1. Authentication (login)

# 2. Authorization (phân quyền)
# 3. Storing tokens
- Lưu refresh token trong local storage có thể dễ dàng bị tấn công (XSS).
- Lưu token ở cookies lại dễ bị tấn công theo phương thức CSRF.
- Lưu token bằng Redux store từ Redux toolkits kết hợp với HTTPONLY COOKIES
- BFF - Backend for Frontend - tạo server giả để bảo mật.
