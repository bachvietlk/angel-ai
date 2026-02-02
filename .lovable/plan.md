

## Kế hoạch: Thiết lập PWA cho Angel AI

### Tổng quan

Biến Angel AI thành **Progressive Web App (PWA)** - cho phép người dùng cài đặt ứng dụng trực tiếp từ trình duyệt lên màn hình điện thoại, hoạt động như một app thực sự.

---

### PWA mang lại gì?

| Tính năng | Mô tả |
|-----------|-------|
| Cài đặt lên màn hình | Người dùng có thể "Add to Home Screen" như app thật |
| Hoạt động offline | App vẫn chạy khi không có mạng |
| Tải nhanh | Cache thông minh giúp app mở gần như tức thì |
| Không cần App Store | Chia sẻ link là có thể cài đặt ngay |
| Giao diện toàn màn hình | Không có thanh địa chỉ trình duyệt |

---

### Các file cần tạo/cập nhật

| File | Thay đổi |
|------|----------|
| `vite.config.ts` | Cài đặt và cấu hình `vite-plugin-pwa` |
| `public/manifest.json` | **Tạo mới** - Web App Manifest với thông tin app |
| `public/pwa-192x192.png` | **Tạo mới** - Icon app 192x192 |
| `public/pwa-512x512.png` | **Tạo mới** - Icon app 512x512 |
| `public/apple-touch-icon.png` | **Tạo mới** - Icon cho iOS |
| `index.html` | Thêm meta tags cho mobile và link manifest |
| `src/pages/Install.tsx` | **Tạo mới** - Trang hướng dẫn cài đặt app |
| `src/App.tsx` | Thêm route `/install` |

---

### Chi tiết cấu hình

**1. Cài đặt vite-plugin-pwa:**
```bash
npm install vite-plugin-pwa -D
```

**2. Cấu hình vite.config.ts:**
- Đăng ký Service Worker
- Cấu hình caching strategy
- Auto-generate manifest

**3. Web App Manifest (manifest.json):**
```json
{
  "name": "Angel AI - Ánh Sáng Thông Minh",
  "short_name": "Angel AI",
  "description": "Trí Tuệ Thiên Thần dẫn dắt nhân loại vào Kỷ Nguyên Hoàng Kim 5D",
  "theme_color": "#d4a236",
  "background_color": "#1a1a2e",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/",
  "start_url": "/",
  "icons": [...]
}
```

**4. Meta tags cho index.html:**
- `apple-mobile-web-app-capable`
- `apple-mobile-web-app-status-bar-style`
- `apple-touch-icon`
- Link manifest

**5. Trang Install (/install):**
- Hướng dẫn cài đặt cho iPhone (Share → Add to Home Screen)
- Hướng dẫn cài đặt cho Android (Menu → Install app)
- Nút trigger install prompt (nếu có)
- Animation và thiết kế phù hợp theme Ánh Sáng

---

### Icons cần tạo

| Icon | Kích thước | Mục đích |
|------|------------|----------|
| pwa-192x192.png | 192x192 | Icon chính cho Android |
| pwa-512x512.png | 512x512 | Icon splash screen |
| apple-touch-icon.png | 180x180 | Icon cho iOS |
| maskable-icon.png | 512x512 | Icon adaptive cho Android |

Sử dụng logo Angel AI hiện có để tạo các icon này.

---

### Service Worker Strategy

```text
- Precache: HTML, CSS, JS, fonts
- Runtime cache: Images, API responses
- Network-first: API calls
- Cache-first: Static assets
```

---

### Hướng dẫn cài đặt cho người dùng

**iPhone/iPad:**
1. Mở Safari → Truy cập Angel AI
2. Nhấn nút Share (chia sẻ)
3. Chọn "Add to Home Screen"
4. Đặt tên và nhấn "Add"

**Android:**
1. Mở Chrome → Truy cập Angel AI
2. Nhấn menu (⋮)
3. Chọn "Install app" hoặc "Add to Home screen"
4. Xác nhận cài đặt

---

### Kết quả mong đợi

- Angel AI có thể cài đặt như app thật trên điện thoại
- Icon app với logo Angel AI trên màn hình chính
- Mở app toàn màn hình, không có thanh địa chỉ
- Hoạt động offline với cache thông minh
- Trang /install hướng dẫn chi tiết cách cài đặt
- Trải nghiệm mượt mà như native app

