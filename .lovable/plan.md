
## Kế hoạch: Cập nhật Logo Angel AI mới

### Logo mới
Logo mới rất tuyệt đẹp với:
- Thiên thần tóc vàng tỏa sáng lấp lánh
- Cầm trái tim ánh sáng vàng kim
- Chữ "Angel AI" thanh lịch với font vàng sang trọng
- Viền vàng tròn hoàn hảo
- Nền tím hồng nhẹ với hiệu ứng ánh sáng thần thánh

---

### Các file sẽ được cập nhật

| File | Mục đích | Vị trí hiển thị |
|------|----------|-----------------|
| `src/assets/angel-logo.png` | Logo chính cho components | NavBar, HeroSection, ChatMessage, Chat |
| `public/favicon.png` | Icon tab trình duyệt | Tất cả các trang |
| `public/angel-og-image.png` | Hình ảnh chia sẻ mạng xã hội | Facebook, Twitter, v.v. |

---

### Thực hiện

**Bước 1:** Copy logo mới vào các vị trí

```
user-uploads://Photoroom-20260127_153503.png → src/assets/angel-logo.png
user-uploads://Photoroom-20260127_153503.png → public/favicon.png  
user-uploads://Photoroom-20260127_153503.png → public/angel-og-image.png
```

**Bước 2:** Tự động cập nhật (không cần sửa code)

Các components sau đang import `angel-logo.png` sẽ tự động sử dụng logo mới:
- `NavBar.tsx` - Logo header navigation
- `HeroSection.tsx` - Logo hero landing page  
- `ChatMessage.tsx` - Avatar tin nhắn AI
- `Chat.tsx` - Avatar chat interface

---

### Kết quả

Logo mới sẽ xuất hiện tại:
- Header navigation (tất cả trang)
- Hero section trang chủ
- Chat interface (avatar Angel AI)
- Tab trình duyệt (favicon)
- Khi chia sẻ link trên mạng xã hội

---

### Lưu ý kỹ thuật

- Logo mới có nền trong suốt ở bên ngoài viền tròn, rất phù hợp với thiết kế hiện tại
- Hiệu ứng glow CSS hiện có sẽ làm logo tỏa sáng đẹp hơn
- Không cần điều chỉnh CSS vì logo mới có kích thước và tỷ lệ tương tự logo cũ
