
3. Modal Management: Global Modal with Context + Portal

Nội dung:

* Tạo hệ thống quản lý modal tái sử dụng 
* Context để bật/tắt modal ở bất kỳ đâu
--> tạo 1 hook useModal cho phép thay đổi giá trị trong "createContext(Modal)"
* Portal để hiển thị modal tách khỏi DOM tree
--> Khái niệm portal, cách sử dụng portal, tại sao lại dùng portal
--> portal cho phép tạo ra các component nằm riêng biệt so với id root, sẽ nằm ở trong 1 component được chỉ định

4. Toast Notification System with Context API

Nội dung:

* Recipe tạo hệ thống toast toàn app --> Done

* Dùng Context + useReducer để quản lý "queue" <-- mảng --> Có thể có nhiều toast 
--> Chỉnh lại hỗ trợ nhiều toast cùng hiện như sonner, khi xoá (timeout) thì phải xoá lần lượt FIFO  vào trước ra trước
* Animation đơn giản bằng CSS / Framer Motion 
--> CSS thêm



5. Custom Hook for Debounced Input

Nội dung:

* Tạo useDebounce hook
* Ứng dụng vào ô search (tránh gọi API liên tục)
* So sánh debounce với throttle
--> throuttle là gì, debouce là gì? so sánh


6. Theme Switching (Light/Dark) with LocalStorage

Nội dung:

* Tạo toggle theme có lưu trạng thái người dùng
* Dùng Context + useEffect + localStorage
* Bonus: animation khi đổi theme



7. Global State with Context + useReducer

Nội dung:

* Khi nào dùng Context thay Redux?
--> Redux dùng cho các global state phức tạp (logic data, ...), Context dùng cho global context đơn giản (theme)
* Tạo AppProvider gói gọn toàn bộ state --> có thể dùng ThemeProvider
* Pattern quản lý state bằng reducer riêng



8. Infinite Scroll Recipe with IntersectionObserver

Nội dung:

* Tải thêm dữ liệu khi user scroll đến cuối trang
--> IntersectionObserver là gì? 
* Dùng IntersectionObserver hook

* Kết hợp tốt với pagination API



9. Protected Route with Role-Based Access

Nội dung:

* Tạo HOC hoặc wrapper component cho private routes
--> Higher order component (HOC) là gì --> Là 1 cái hàm bọc cái component lại cho phép thực logic trước khi component render
* Kiểm tra token/role trước khi render
--> Logic code

* Redirect nếu không đủ quyền
--> Logic code



10. Error Boundary and Fallback UI

Nội dung:

* Recipe tạo ErrorBoundary component
--> ErrorBoundary component mặc định là gì? 
* Tách lỗi logic khỏi UI render
--> Cách tra cứu lỗi khi có error UI
* Hiển thị fallback UI đẹp mắt
--> Vẽ component Error --> Khi error thì load component này 
