# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
# Start development server (runs on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Initial Setup
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add Supabase credentials to .env:
# VITE_SUPABASE_URL="your-supabase-url"
# VITE_SUPABASE_API_KEY="your-anon-key"
```

## Architecture Overview

This is a React e-commerce application built with Vite, using Supabase as the backend.

### Core Stack
- **React 19.0.0** with functional components and hooks
- **Vite** for fast development and optimized builds
- **React Router DOM 7.4.1** for routing
- **@tanstack/react-query** for server state management
- **Supabase** for authentication, database, and storage
- **Bootstrap 5.3.5** (via CDN) for UI components

### Project Structure
```
src/
├── components/      # Reusable UI components
├── contexts/        # React contexts (AuthContext)
├── pages/          # Page components
│   ├── admin/      # Admin panel pages
│   └── auth/       # Authentication pages
├── services/       # API service layer
└── assets/         # CSS, images, utilities
```

### Key Patterns

1. **Service Layer Pattern**: All API calls go through service files in `/src/services/`
   - Each service handles a specific domain (auth, products, cart, etc.)
   - Services use the Supabase client from `supabase.js`

2. **Authentication**: 
   - Global auth state via `AuthContext`
   - Protected routes using `ProtectedRoute` and `AdminRoute` components
   - Session persistence handled by Supabase

3. **State Management**:
   - React Query for server state (data fetching, caching)
   - Context API for global client state (auth)
   - Local component state for UI interactions

4. **Path Aliases** (configured in vite.config.js):
   - `@` → `/src`
   - `@components` → `/src/components`
   - `@services` → `/src/services`
   - `@pages` → `/src/pages`
   - `@contexts` → `/src/contexts`
   - `@assets` → `/src/assets`

### Database Architecture

The application uses Supabase PostgreSQL with:
- **Row Level Security (RLS)** for all tables
- **Stored procedures** for complex operations (cart, orders)
- **Triggers** for automatic timestamps and audit logging
- **Brazilian e-commerce features**: CEP validation, state enum, phone format

Key tables:
- `profiles` - User profiles with admin flag
- `categories` & `products` - Product catalog
- `carts` & `cart_items` - Shopping cart
- `orders` & `order_items` - Order management
- `addresses` - User addresses
- `audit_log` - System audit trail

### Important Implementation Details

1. **Cart Operations**:
   - Uses Supabase RPC functions for atomic operations
   - Optimistic UI updates for better UX
   - Real-time cart count updates without page reload

2. **Image Handling**:
   - Product images stored in Supabase Storage
   - Fallback to placeholder image when URL is invalid
   - Image URLs constructed using Supabase public URLs

3. **Error Handling**:
   - Toast notifications using react-hot-toast
   - Service methods return data or throw errors
   - Components handle errors with try-catch blocks

4. **Course Structure**:
   - Project is part of a ReactJS course (currently on lesson 5)
   - Progressive lessons building features incrementally
   - TODOs in main.jsx track upcoming lessons