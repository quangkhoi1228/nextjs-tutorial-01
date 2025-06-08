---
noteId: "56529510443a11f0b772fd88b23226f1"
tags: []

---

# Deployment

## Deployment là gì?

Khi em lập trình thì em đang chạy code (database, source backend, source frontend) trên máy tính của em (local)

## Vấn đề khi chạy local

1. Máy tính của em nó không chạy dc 24/24 h
2. Các ứng dụng chạy trên local không thể cho người dùng trên internet truy cập được

## Cách giải quyết

Cần triển khai trên 1 server có thể chạy 24/24 và người dùng internet có thể truy cập được.

## Cách triển khai

Triển khai 1:1, ở dưới local em chạy bao nhiêu phần mềm thì trên server cũng phải chạy bấy nhiêu phần mềm:

- Local:

  1. Database: MySQL
  2. BackEnd: NestJS
  3. FrontEnd: NextJS

==> Server:

  1. Database: MySQL
  2. BackEnd: NestJS
  3. FrontEnd: NextJS

Các bước thực hiện:

1. Chuẩn bị server: mua/thuê có phí hoặc miễn phí (ví dụ: FE dùng vercel)
2. Triển khai các ứng dụng cần thiết lên server
3. (optional) Gắn server IP và domain để người dùng dễ truy cập

> Note:
> Vercel không phải là server, nó chỉ là 1 dịch vụ cho phép em triển khai frontend

## Thực hành

1. Mua server, VPS:

- 1 số nhà cung cấp: Mắt bão, Vietnix, Pa Việt Nam

2. Cài đặt ứng dụng (pull source code) trên server
3. Start ứng dụng lên

