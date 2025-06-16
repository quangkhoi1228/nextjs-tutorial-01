---
noteId: "259728304ab311f0b1283397834ababa"
tags: []

---

# useEffect

## Chức năng

useEffect dùng để thực hiện các chức năng bên lề (side effect) như: call api, setInterval, ...

## Nguyên nhân sâu xa

Bởi vì tính chất useEffect biết được các thời điểm quan trọng của component như:
> Ví dụ component và cuộc tình của crush và bạn trai. useEffect là 1 loser crush nhỏ đó

- Khởi tạo component, new  (crush vừa có bạn trai mới)
- component re-render, update (crush và ny nó chia tay, quay lại, đi chơi)
- Component bị xoá, delete (crush và ny vừa chia tay thật)

--> Nên là chúng ta có thể dùng useEffect để thực hiện các hành động tại các thời điểm như trên

```sh
  useEffect(hàm_chứa_logic_code_thực_thi,  các_biến_ràng_buộc_quy_định_khi_nào_logic_code_được_thực_thi);
```
