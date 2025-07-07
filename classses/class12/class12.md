FE: trí.com  -- call API  qua browser --> BE: khoi.com ==> BE chặn FE vì lỗi CORS

==> cách Sửa

1. Sửa BE để allow FE (cách chuẩn nhất)

FE: trí.com  -- call API  qua browser --> BE: khoi.com ==> BE chặn FE vì lỗi CORS
-->

FE: trí.com --> call API qua browser --> BE: backend.trí.com (proxy) --> call API qua --> BE: khoi.com (không chặn)

