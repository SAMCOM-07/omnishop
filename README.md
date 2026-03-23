# Omnishop - Modern E-Commerce Platform

A full-featured e-commerce application built with Next.js, React, and Firebase. Omnishop provides a seamless shopping experience with product management, user authentication, and order processing.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square)
![Firebase](https://img.shields.io/badge/Firebase-12.4-orange?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-06B6D4?style=flat-square)

## 🎯 Project Overview

Omnishop is a modern, scalable e-commerce platform designed for seamless shopping experiences. It features a responsive user interface, robust backend infrastructure, and comprehensive product management system.

## ✨ Features

### Customer Features
- 🛍️ **Product Browsing** - Browse products by category with advanced filtering and sorting
- 🔍 **Product Search** - Full-text search functionality with real-time results
- 🛒 **Shopping Cart** - Persistent cart with quantity management and price calculation
- ❤️ **Wishlist** - Save favorite products for later
- 👤 **User Authentication** - Email/password and Google Sign-in
- 📋 **Order Management** - View order history and track order status
- 💳 **Checkout** - Secure checkout process with address management
- ⭐ **Product Reviews** - Rate and review products
- 🎯 **Responsive Design** - Mobile-optimized interface

### Admin Features
- 📊 **Admin Dashboard** - Comprehensive product and order management
- ➕ **Add Products** - Create new products with images and details
- 📸 **Image Upload** - Upload product images to Cloudinary
- 🔐 **Admin Access Control** - Role-based authentication and authorization

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React with SSR and SSG
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS
- **Components**: [Framer Motion](https://www.framer.com/motion/) - Animation library
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast notifications
- **Utilities**: [clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)

### Backend & Services
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) - Real-time NoSQL database
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth) - User management
- **Image Storage**: [Cloudinary](https://cloudinary.com/) - Image hosting and optimization
- **Admin SDK**: [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup) - Server-side operations

### Development Tools
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient
- **Linting**: [ESLint 9](https://eslint.org/) - Code quality
- **Validation**: [Zod](https://zod.dev/) - TypeScript-first schema validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** v18 or higher
- **pnpm** package manager
- **Git** for version control

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/omnishop.git
cd omnishop
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the project root. Use `.env.example` as a template:

```bash
# Firebase - Client Configuration (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Firebase - Admin SDK (Server-side Only)
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Cloudinary - Image Upload Service
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### 5. Build for Production

```bash
pnpm build
pnpm start
```

## 📂 Directory Structure

```
omnishop/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (root)/            # Main app routes
│   │   │   ├── (pages)/
│   │   │   │   ├── address/   # Address management
│   │   │   │   ├── cart/      # Shopping cart
│   │   │   │   ├── checkout/  # Checkout process
│   │   │   │   ├── order/     # Order history
│   │   │   │   ├── profile/   # User profile
│   │   │   │   ├── search/    # Product search
│   │   │   │   ├── shop/      # Product catalog
│   │   │   │   └── wishlist/  # Saved items
│   │   │   └── layout.tsx
│   │   ├── admin/             # Admin panel (protected)
│   │   │   ├── add-product/
│   │   │   └── layout.tsx
│   │   ├── api/               # API routes
│   │   │   ├── login/
│   │   │   ├── logout/
│   │   │   ├── upload/        # Product image upload
│   │   │   └── check-role/    # Role verification
│   │   └── styles/            # Global styles
│   ├── components/            # Reusable React components
│   │   ├── auth/             # Auth components
│   │   ├── cart/             # Cart components
│   │   ├── profile/          # Profile components
│   │   └── ui/               # UI components
│   ├── context/              # React context (state management)
│   │   ├── CartContext.tsx
│   │   ├── WishlistContext.tsx
│   │   └── Providers.tsx
│   ├── hooks/                # Custom React hooks
│   │   └── useAuth.ts
│   ├── lib/                  # Utility functions & configurations
│   │   ├── auth.ts
│   │   ├── firebase.ts
│   │   ├── firebase-admin.ts
│   │   ├── cloudinary.ts
│   │   ├── getProducts.ts
│   │   └── utils.ts
│   ├── types/                # TypeScript type definitions
│   │   ├── types.ts
│   │   └── user.ts
│   └── data/                 # Static data & constants
│       ├── images.ts
│       └── links.ts
├── public/                   # Static assets
│   ├── images/              # Product images
│   └── robots.txt
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## 📜 Available Scripts

```bash
# Development
pnpm dev              # Start development server (localhost:3000)

# Production
pnpm build            # Build for production
pnpm start            # Start production server

# Code Quality
pnpm lint             # Run ESLint to check code quality

# Build with Sitemap
pnpm build            # Auto-generates sitemap after build via postbuild script
```

## 🔐 Authentication & Authorization

### User Roles
- **Customer** - Default role for registered users
- **Admin** - Can manage products and view analytics (assigned via Firebase Admin SDK)

### Session Management
- Session cookies are created upon successful login
- Cookies are HTTP-only and secure
- Session duration: 5 days
- Automatic session verification on protected routes

### Protected Routes
The following routes require authentication:
- `/profile/*` - User profile and settings
- `/checkout/*` - Checkout process
- `/orders/*` - Order history
- `/completed/*` - Order confirmation

## 🗄️ Firebase Firestore Schema

### Collections

#### `users`
```typescript
{
  uid: string                    // Firebase Auth UID
  email: string
  username: string
  profilePicture: string        // URL or path
  addresses: Address[]          // Saved addresses
  createdAt: Timestamp
}
```

#### `products`
```typescript
{
  id: string                    // Document ID
  name: string
  description: string
  category: string              // electronics, fashion, furniture, etc.
  price: number
  discount: number              // Discount percentage
  discountedAmount: number      // Final price after discount
  tax: number
  unit: number                  // Quantity available
  availability: string          // "in stock" | "out of stock"
  rating: number               // Average rating (0-5)
  tags: string[]               // Search tags
  shippingInfo: string
  images: {
    publicId: string           // Cloudinary public ID
    url: string                // Cloudinary URL
  }[]
  reviews: {
    userId: string
    username: string
    rating: number
    comment: string
    createdAt: Timestamp
  }[]
  createdAt: Timestamp
}
```

#### `orders`
```typescript
{
  id: string
  userId: string
  items: CartProductType[]
  totalPrice: number
  status: string              // pending, processing, shipped, delivered
  shippingAddress: Address
  createdAt: Timestamp
}
```

#### `cart`
```typescript
{
  userId: string              // Document ID
  items: CartProductType[]
  updatedAt: Timestamp
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login (create session)
- `POST /api/logout` - User logout (clear session)
- `GET /api/check-role` - Verify user role

### File Upload
- `POST /api/upload` - Upload product images to Cloudinary
- `POST /api/uploadProfilePicture` - Upload user profile picture

### Routes
All routes use Next.js file-based routing. Dynamic routes use `[param]` syntax.

## 🎨 Styling

The project uses:
- **Tailwind CSS 4** for utility-first styling
- **PostCSS** for CSS processing
- **Custom CSS** for global styles in `src/app/styles/globals.css`

### CSS Classes
Custom CSS classes are available for common patterns:
- Typography classes (font weights, sizes)
- Color palette (neutral, primary, accent)
- Responsive utilities

## 📦 Image Optimization

Images are stored and served via [Cloudinary](https://cloudinary.com/):
- Automatic format optimization (WebP, AVIF)
- Responsive image resizing
- CDN delivery for fast loading
- Image transformations (crop, resize, quality)

Remote image patterns configured in `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  ],
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy with one click

### Environment Variables for Production
Set these in your production environment:
- All `NEXT_PUBLIC_*` variables (public, safe to expose)
- `FIREBASE_PROJECT_ID` (keep private)
- `FIREBASE_CLIENT_EMAIL` (keep private)
- `FIREBASE_PRIVATE_KEY` (keep private)
- `CLOUDINARY_API_KEY` (keep private)
- `CLOUDINARY_API_SECRET` (keep private)

### Post-Deployment
- Sitemap is automatically generated and updated on each build
- Robots.txt is configured for SEO

## 📊 Performance

- **Code Splitting** - Automatic with Next.js
- **Image Optimization** - Next.js Image component + Cloudinary
- **Dynamic Imports** - Lazy loading for components
- **Caching** - Cloudinary CDN for images
- **Database Indexes** - Recommended Firestore indexes for common queries

## 🔄 State Management

### Context API
- **CartContext** - Shopping cart state and operations
- **WishlistContext** - Wishlist state and operations
- **Providers** - Root provider component wrapping context providers

### Local Storage
- Non-authenticated users' cart data stored in browser localStorage
- Cart syncs to Firestore when user logs in

## 🛡️ Security

### Best Practices
- ✅ HTTP-only session cookies
- ✅ Firebase Auth for secure authentication
- ✅ Admin SDK for secure server operations
- ✅ Row-level security rules in Firestore
- ✅ API route protection with session verification
- ✅ Environment variables for sensitive data
- ✅ CORS configured for Cloudinary

### Firestore Security Rules
Configure rules in Firebase Console:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.role == 'admin';
    }
    match /orders/{document=**} {
      allow read, write: if request.auth.uid == resource.data.userId;
    }
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint rules
- Write descriptive commit messages
- Add comments for complex logic
- Test your changes locally before pushing

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Check existing issues for solutions
- Refer to the documentation above

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Vercel Deployment](https://vercel.com/docs)

---

**Built with ❤️ using Next.js, React, TailwindCss, Cloudinary and Firebase**
