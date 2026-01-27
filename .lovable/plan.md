

## Kế hoạch: Xác nhận Luật Ánh Sáng khi Đăng ký/Đăng nhập

### Tổng quan
Thêm tính năng bắt buộc người dùng phải xác nhận "Luật Ánh Sáng" trước khi sử dụng Angel AI. Trạng thái xác nhận sẽ được lưu trong database và kiểm tra mỗi khi truy cập các tính năng chính.

---

### Luồng hoạt động mới

```text
┌─────────────────────┐
│   Đăng ký/Đăng nhập │
│      (Auth.tsx)     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────────────┐
│  Kiểm tra law_of_light_     │
│  accepted_at trong profiles │
└──────────┬──────────────────┘
           │
    ┌──────┴──────┐
    │             │
    ▼             ▼
┌────────┐  ┌──────────────────┐
│ NULL   │  │ Đã có timestamp  │
│(chưa)  │  │   (đã xác nhận)  │
└───┬────┘  └────────┬─────────┘
    │                │
    ▼                ▼
┌───────────────┐  ┌─────────────┐
│ Chuyển hướng  │  │ Vào Chat    │
│ /law-of-light │  │ bình thường │
└───────────────┘  └─────────────┘
```

---

### Phần 1: Database Migration

**Thêm cột mới vào bảng `profiles`:**

```sql
ALTER TABLE profiles 
ADD COLUMN law_of_light_accepted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
```

- `NULL` = chưa xác nhận
- Có timestamp = đã xác nhận (lưu thời điểm xác nhận)

---

### Phần 2: Tạo Hook kiểm tra trạng thái

**File mới: `src/hooks/useLawOfLightStatus.ts`**

Hook này sẽ:
- Kiểm tra trạng thái xác nhận từ database
- Cung cấp hàm `acceptLawOfLight()` để cập nhật
- Return loading state và trạng thái accepted

---

### Phần 3: Cập nhật trang LawOfLight.tsx

**Thay đổi:**
- Khi user click "CON ĐỒNG Ý & BƯỚC VÀO ÁNH SÁNG":
  1. Gọi API cập nhật `law_of_light_accepted_at = NOW()`
  2. Hiển thị toast thành công
  3. Chuyển hướng đến `/chat`

---

### Phần 4: Cập nhật Auth.tsx

**Thay đổi luồng đăng nhập/đăng ký:**

```text
Sau khi đăng nhập thành công:
├── Kiểm tra profiles.law_of_light_accepted_at
├── Nếu NULL → navigate("/law-of-light")
└── Nếu có → navigate("/chat")
```

---

### Phần 5: Bảo vệ trang Chat.tsx

**Thêm kiểm tra bảo vệ:**
- Nếu user chưa xác nhận Luật Ánh Sáng → redirect về `/law-of-light`
- Hiển thị loading state trong khi kiểm tra

---

### Phần 6: Bảo vệ các trang khác (tùy chọn)

Các trang cần xác nhận trước khi sử dụng:
- `/chat` - Chat với Angel AI
- `/journal` - Nhật ký
- `/gallery` - Gallery (nếu tạo ảnh/video)

Các trang không cần xác nhận:
- `/` - Trang chủ
- `/auth` - Đăng nhập/Đăng ký
- `/law-of-light` - Trang Luật Ánh Sáng
- `/profile` - Hồ sơ cá nhân

---

### Các file sẽ thay đổi

| File | Thay đổi |
|------|----------|
| Database | Thêm cột `law_of_light_accepted_at` vào `profiles` |
| `src/hooks/useLawOfLightStatus.ts` | **TẠO MỚI** - Hook kiểm tra/cập nhật trạng thái |
| `src/pages/LawOfLight.tsx` | Cập nhật button để lưu trạng thái vào DB |
| `src/pages/Auth.tsx` | Thêm logic kiểm tra sau đăng nhập |
| `src/pages/Chat.tsx` | Thêm guard kiểm tra trước khi hiển thị |

---

### Chi tiết kỹ thuật

**Hook useLawOfLightStatus:**
```typescript
export const useLawOfLightStatus = (userId: string | undefined) => {
  const [isAccepted, setIsAccepted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch status từ profiles
  // Cung cấp hàm acceptLawOfLight() để update
  
  return { isAccepted, loading, acceptLawOfLight };
};
```

**Logic kiểm tra trong Chat.tsx:**
```typescript
const { isAccepted, loading: lawLoading } = useLawOfLightStatus(user?.id);

useEffect(() => {
  if (!lawLoading && isAccepted === false) {
    navigate("/law-of-light");
  }
}, [lawLoading, isAccepted]);
```

---

### Kết quả mong đợi

1. **User mới đăng ký:** Sau xác nhận email → Vào trang → Phải xác nhận Luật Ánh Sáng → Mới được dùng Chat
2. **User đăng nhập lại:** Kiểm tra đã xác nhận chưa → Nếu chưa thì yêu cầu xác nhận
3. **User đã xác nhận:** Vào Chat bình thường, không phải xác nhận lại
4. **Trải nghiệm mượt mà:** Loading state đẹp, toast thông báo rõ ràng

