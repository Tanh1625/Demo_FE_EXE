# TroViet - Nền Tảng Quản Lý Trọ

Nền tảng tổng hợp tìm kiếm và quản lý trọ với UX/UI rõ ràng cho cả người thuê và chủ trọ.

## 🚀 Công Nghệ Sử Dụng

- **Frontend Framework**: React 19.1.1 với TypeScript
- **UI Library**: React-Bootstrap 2.x
- **Routing**: React Router DOM v6
- **State Management**: React Context API
- **Icons**: React Icons
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom CSS

## 📁 Cấu Trúc Dự Án

```
src/
├── types/              # TypeScript type definitions
│   ├── User.ts         # User interface và auth types
│   ├── Room.ts         # Room interface và search types
│   ├── Service.ts      # Service interface và request types
│   ├── Billing.ts      # Billing interface và dashboard stats
│   └── index.ts        # Export tất cả types
├── context/            # React Context providers
│   └── AuthContext.tsx # Authentication context
├── components/         # Reusable components
│   └── common/
│       ├── ProtectedRoute.tsx # Route protection wrapper
│       └── RoomCard.tsx       # Room display card component
├── layouts/            # Layout components
│   ├── PublicLayout.tsx     # Layout cho trang công cộng
│   └── DashboardLayout.tsx  # Layout cho dashboard chủ trọ
├── pages/              # Page components
│   ├── public/         # Trang công cộng
│   │   ├── HomePage.tsx     # Landing page với carousel
│   │   ├── SearchPage.tsx   # Trang tìm kiếm phòng
│   │   ├── ServicePage.tsx  # Trang dịch vụ trọ
│   │   └── LoginPage.tsx    # Trang đăng nhập
│   └── landlord/       # Trang quản lý chủ trọ
│       ├── DashboardPage.tsx     # Tổng quan thống kê
│       ├── ManageRoomsPage.tsx   # Quản lý phòng trọ
│       └── BillingPage.tsx       # Quản lý thu chi
├── App.tsx             # Main app với routing setup
├── main.tsx            # Entry point
└── App.css             # Custom styles
```

## 🎯 Tính Năng Chính

### 👥 Người Thuê Trọ (Seekers)

- **Trang chủ**: Landing page với carousel và form tìm kiếm nhanh
- **Tìm kiếm phòng**: Bộ lọc chi tiết (giá, vị trí, loại phòng, tiện nghi)
- **Dịch vụ trọ**: Danh sách các dịch vụ hỗ trợ (dọn dẹp, sửa chữa, bảo trì)
- **Hiển thị phòng**: Card component với thông tin đầy đủ
- **Trọ của tôi**: Xem thông tin trọ đã thuê
  - Chi tiết hợp đồng thuê
  - Lịch sử thanh toán tiền thuê
  - Chỉ số điện nước hàng tháng
  - Tạo yêu cầu sửa chữa/bảo trì
  - Theo dõi trạng thái yêu cầu

### 🏠 Chủ Trọ (Landlords)

- **Dashboard tổng quan**: Thống kê phòng, doanh thu, hóa đơn
- **Quản lý phòng**: CRUD operations với modal form chi tiết
- **Thu chi**: Ghi số điện nước, tạo hóa đơn tự động, theo dõi thanh toán

### 🔐 Authentication

- **Context-based**: Sử dụng React Context API
- **Role-based routing**: Protected routes theo vai trò người dùng
- **Demo accounts**:
  - Chủ trọ: `landlord@demo.com` / `password`
  - Người thuê: `seeker@demo.com` / `password`

## 🛠 Cài Đặt và Chạy

### Prerequisites

- Node.js >= 16
- npm hoặc yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd DemoFE-EXE-V2

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

### Available Scripts

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 📱 Responsive Design

- **Mobile-first**: Responsive design cho tất cả devices
- **Bootstrap Grid**: Sử dụng Bootstrap responsive grid system
- **Touch-friendly**: UI elements tối ưu cho mobile

## 🎨 UI/UX Features

### Design System

- **Consistent Colors**: Primary (Blue), Success (Green), Warning (Yellow), Danger (Red)
- **Typography**: Clear hierarchy với Bootstrap typography
- **Spacing**: Consistent spacing sử dụng Bootstrap spacing utilities
- **Components**: Sử dụng React-Bootstrap components với custom styling

### User Experience

- **Loading States**: Spinner cho async operations
- **Error Handling**: User-friendly error messages
- **Form Validation**: Client-side validation với feedback
- **Navigation**: Intuitive navigation với breadcrumbs
- **Hover Effects**: Subtle hover animations

## 🔧 TypeScript Integration

### Type Safety

- **Strict Types**: Tất cả components và functions có type definitions
- **Interface Definitions**: Comprehensive interfaces cho data models
- **Props Typing**: Typed props cho tất cả React components
- **Context Typing**: Typed context providers và consumers

### Code Organization

- **Modular Types**: Types được tổ chức trong thư mục riêng
- **Export/Import**: Centralized type exports từ index.ts
- **Reusable Interfaces**: Shared interfaces cho common data structures

## 🚀 Deployment

### Build

```bash
npm run build
```

### Static Hosting

- Có thể deploy trên Vercel, Netlify, GitHub Pages
- Build output trong thư mục `dist/`
- SPA routing cần configuration cho static hosts

## 📝 Development Notes

### Code Style

- **ESLint**: Configured với React và TypeScript rules
- **Prettier**: Code formatting (có thể thêm)
- **Naming**: PascalCase cho components, camelCase cho functions/variables

### Best Practices

- **Component Composition**: Reusable components với clear props
- **Context Usage**: Context chỉ cho global state (auth)
- **Error Boundaries**: Có thể thêm error boundaries cho production
- **Performance**: React.memo cho expensive components

## 🔮 Future Enhancements

### Suggested Features

- **Backend Integration**: Connect với real API
- **Image Upload**: Room images upload functionality
- **Real-time Chat**: Chat giữa chủ trọ và người thuê
- **Payment Integration**: Online payment cho hóa đơn
- **Maps Integration**: Google Maps cho location
- **Push Notifications**: Real-time notifications
- **Advanced Search**: Elasticsearch integration
- **Multi-language**: i18n support

### Technical Improvements

- **State Management**: Redux Toolkit cho complex state
- **Data Fetching**: React Query cho server state
- **Testing**: Unit tests với Jest + Testing Library
- **PWA**: Progressive Web App features
- **Performance**: Code splitting và lazy loading

## 📞 Support

Dự án demo được tạo theo yêu cầu tạo Base Frontend Structure chất lượng cao cho nền tảng quản lý trọ với React/TypeScript và React-Bootstrap.

## 🌐 Live Demo

Ứng dụng hiện đang chạy tại: http://localhost:5173/

### Demo Users:

1. **Chủ trọ**:

   - Email: `landlord@demo.com`
   - Password: `password`
   - Truy cập: Dashboard quản lý

2. **Người thuê**:
   - Email: `seeker@demo.com`
   - Password: `password`
   - Truy cập: Trang công cộng

## ✅ Hoàn Thành

Đã hoàn thành tất cả yêu cầu trong specification:

✅ **Công nghệ bắt buộc**:

- React với TypeScript
- React-Bootstrap cho UI components
- React Router DOM cho routing
- React Context API cho state management
- React Icons cho icons

✅ **Cấu trúc thư mục**:

- `src/types/` - TypeScript interfaces
- `src/context/` - AuthContext
- `src/components/common` - Reusable components
- `src/layouts/` - Layout components
- `src/pages/public/` - Public pages
- `src/pages/landlord/` - Landlord dashboard pages

✅ **Layouts & Context**:

- AuthContext với role-based authentication
- PublicLayout với header/footer
- DashboardLayout với sidebar cho chủ trọ
- ProtectedRoute component

✅ **Trang công cộng**:

- HomePage với Carousel và search form
- SearchPage với bộ lọc Accordion và RoomCard
- ServicePage với danh sách dịch vụ dạng Card

✅ **Trang chủ trọ**:

- DashboardPage với thống kê Card
- ManageRoomsPage với Table và Modal form
- BillingPage với form ghi số và bảng hóa đơn

Tất cả các component đã được implement với TypeScript types đầy đủ và sử dụng React-Bootstrap components như yêu cầu.
