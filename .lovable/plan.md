

## Kế hoạch: Tạo Modal thông báo xác nhận Luật Ánh Sáng

### Tổng quan
Tạo một Modal/Dialog popup đẹp, theo phong cách 5D ánh sáng của Angel AI, hiển thị khi user đăng nhập/đăng ký mà chưa xác nhận Luật Ánh Sáng. Modal sẽ hiển thị tóm tắt Luật Ánh Sáng và buộc user phải xác nhận trước khi sử dụng ứng dụng.

---

### Thiết kế Modal

**Giao diện:**
- Nền gradient vàng kim - ánh sáng thần thánh
- Icon thiên thần/ánh sáng ở trên cùng với animation tỏa sáng
- Tiêu đề: "Luật Ánh Sáng" với hiệu ứng glow
- Tóm tắt 5 điểm chính của Luật Ánh Sáng
- 2 nút: "Xem chi tiết" (link đến /law-of-light) và "Con đồng ý"
- Không có nút đóng (X) - bắt buộc phải xác nhận

**Animation:**
- Fade in + scale animation khi hiển thị
- Particles/sparkles effect quanh icon
- Glow effect cho tiêu đề và nút

---

### Luồng hoạt động

```text
User đăng nhập/đăng ký
        │
        ▼
Kiểm tra law_of_light_accepted_at
        │
   ┌────┴────┐
   │         │
   ▼         ▼
 NULL     Đã có
(chưa)   timestamp
   │         │
   ▼         ▼
Hiện Modal   Vào app
thông báo   bình thường
   │
   ▼
User click "Con đồng ý"
   │
   ▼
Cập nhật DB + Đóng modal
```

---

### Các file cần tạo/sửa

| File | Thay đổi |
|------|----------|
| `src/components/LawOfLightModal.tsx` | **TẠO MỚI** - Component modal thông báo |
| `src/pages/Chat.tsx` | Thêm modal hiển thị khi chưa xác nhận |
| `src/pages/Journal.tsx` | Thêm modal hiển thị khi chưa xác nhận |
| `src/pages/Gallery.tsx` | Thêm modal hiển thị khi chưa xác nhận (tùy chọn) |

---

### Chi tiết Component LawOfLightModal

```text
┌────────────────────────────────────────────┐
│                                            │
│         ✨ [Icon ánh sáng] ✨              │
│                                            │
│           LUẬT ÁNH SÁNG                    │
│                                            │
│  FUN Ecosystem chỉ dành cho những         │
│  linh hồn có ánh sáng, hoặc đang          │
│  hướng về ánh sáng.                        │
│                                            │
│  ┌────────────────────────────────┐       │
│  │ ☀ Ánh sáng thu hút ánh sáng    │       │
│  │ 🛡 Tần số thấp tự thanh lọc     │       │
│  │ 💛 Tình yêu là quy luật         │       │
│  │ ⚖ Phục vụ điều cao hơn         │       │
│  │ ✨ Mỗi tương tác là chữa lành   │       │
│  └────────────────────────────────┘       │
│                                            │
│  [Xem chi tiết]     [Con đồng ý ✨]        │
│                                            │
└────────────────────────────────────────────┘
```

---

### Props của Modal

```typescript
interface LawOfLightModalProps {
  isOpen: boolean;
  onAccept: () => Promise<void>;
  onViewDetails: () => void;
}
```

---

### Logic tích hợp

**Trong Chat.tsx và Journal.tsx:**

```typescript
// Thay vì redirect, hiện modal
const { isAccepted, loading, acceptLawOfLight } = useLawOfLightStatus(user?.id);
const [showLawModal, setShowLawModal] = useState(false);

useEffect(() => {
  if (!loading && isAccepted === false) {
    setShowLawModal(true);
  }
}, [loading, isAccepted]);

// Trong render:
<LawOfLightModal
  isOpen={showLawModal}
  onAccept={async () => {
    await acceptLawOfLight();
    setShowLawModal(false);
  }}
  onViewDetails={() => navigate("/law-of-light")}
/>
```

---

### Điểm nổi bật thiết kế

1. **Không cho đóng modal** - User bắt buộc phải xác nhận hoặc xem chi tiết
2. **Animation thiêng liêng** - Sparkles, glow, pulse để tạo cảm giác tôn nghiêm
3. **Tóm tắt ngắn gọn** - 5 điểm cốt lõi, không quá dài
4. **Nút xem chi tiết** - Cho user muốn đọc đầy đủ trước khi xác nhận
5. **Đa ngôn ngữ** - Hỗ trợ cả tiếng Việt và tiếng Anh

---

### Kết quả mong đợi

- User mới đăng ký: Thấy modal đẹp mắt yêu cầu xác nhận Luật Ánh Sáng
- User chưa xác nhận: Khi vào Chat/Journal sẽ thấy modal, không thể sử dụng cho đến khi xác nhận
- User đã xác nhận: Sử dụng bình thường, không thấy modal nữa

