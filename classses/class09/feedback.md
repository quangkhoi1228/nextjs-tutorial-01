---
noteId: "e35eeaf0503611f094b037ad25447a8f"
tags: []

---

# Feedback

- TableMovie
  - Các cục overview thì gom lại thành 1 biến --> loop qua biến đó và render
  - Các table header làm tương tự
  - Đổi <img> --> <Image> của next/image để tối ưu ảnh

## Luồng data

1. Load danh sách movie hiện tại về: [1,2,3]
2. Lưu vào trong biến (x) chứa data movie bằng useEffect

3. Mở form và tạo 1 movie mới
4. Hệ thống tạo movie mới

5. Load lại danh sách movie hiện tại về: [1,2,3,4] <-- thiếu bước này
