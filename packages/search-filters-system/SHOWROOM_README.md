# ShowRoom - Property Search & Filtering System

## Overview
ShowRoom is a Nigeria-only, web-first, video-first rental platform with a comprehensive tenant-facing property search and filtering system.

## Features Implemented

### 🔐 Authentication
- Login/logout functionality (simulated for demo)
- Protected routes - full search results and property pages require login
- Seamless authentication flow

### 🔍 Search & Filtering System
Nigeria-specific filters including:
- **Location**: State, City, Area search
- **Pricing**: Maximum annual rent, Total move-in cost
- **Utilities**: Power reliability (20+ hours, 12-20 hours, Under 12 hours, Generator only)
- **Water**: Water source (Borehole, Well, Public Supply, Tanker, Borehole + Tanker)
- **Safety**: Flood risk levels (Low, Medium, High)
- **Options**: Agent-free filter

### 📱 Search Results Display
Each property card shows:
- Video thumbnail with play button
- Number of videos available
- Rent amount (formatted in millions)
- Area and location
- Power reliability badge (24/7 power highlighted)
- Agent-free badge
- Move-in cost
- Bedrooms, bathrooms, flood risk
- Hover effects for better UX

### 🏠 Property Detail Pages
Comprehensive property pages featuring:
- **Video Player**: Main video player with thumbnail navigation
- **Multiple Videos**: Grid of all property videos with duration
- **Property Details**: Bedrooms, bathrooms, toilets, parking spaces
- **Description**: Full property description
- **Amenities**: Visual tags for all amenities
- **Utilities Info**: Power, water, flood risk details
- **Pricing**: Annual rent and total move-in cost breakdown
- **Contact**: Show contact info button, call functionality
- **Actions**: Schedule visit, save property buttons

### ⚡ Performance Optimizations
- **Mobile-First**: Responsive design optimized for mobile devices
- **Low Data Usage**: 
  - Minimal animations on mobile
  - Optimized CSS animations
  - No heavy images (placeholder system ready)
- **Fast Loading**:
  - Client-side filtering (instant results)
  - Memoized filter logic
  - Efficient re-renders
- **Touch Optimizations**: 44px minimum touch targets on mobile

### 🎨 UI/UX Features
- Gradient background (purple/blue theme)
- Glass-morphism design (backdrop blur effects)
- Sticky header and filter sidebar
- Mobile filter toggle
- Clear all filters button
- Empty state handling
- Smooth transitions and hover effects
- Accessible form controls

## File Structure
```
src/app/
├── page.tsx              # Landing page with hero and features
├── search/
│   └── page.tsx          # Search page with filters and results
├── property/
│   └── [id]/
│       └── page.tsx      # Dynamic property detail page
├── layout.tsx            # Root layout with metadata
└── globals.css           # Global styles and animations
```

## Mock Data
The system includes 6 sample properties across Lagos and Abuja with realistic:
- Pricing (₦900K - ₦3.2M annual rent)
- Nigeria-specific locations (Lekki, Ikeja, Ajah, Yaba, Gwarinpa, Wuse 2)
- Power reliability data
- Water sources
- Flood risk assessments
- Multiple videos per property

## Integration Points

### Ready for Backend Integration
The system is structured to easily integrate with:

1. **Authentication API**
   - Replace `isLoggedIn` state with actual auth context
   - Add JWT token management
   - Implement protected route middleware

2. **Property Database**
   - Replace `MOCK_PROPERTIES` with API calls
   - Add pagination for large datasets
   - Implement real-time search

3. **Video Storage**
   - Replace placeholder thumbnails with actual video thumbnails
   - Integrate video player (e.g., Cloudflare Stream, Mux)
   - Add video loading states

4. **Contact System**
   - Connect "Show Contact Info" to backend
   - Add messaging functionality
   - Implement visit scheduling

## Nigeria-Specific Features
- Currency formatted in Naira (₦)
- Nigerian states and cities
- Power reliability (critical for Nigerian renters)
- Water source options (common in Nigeria)
- Flood risk assessment (important for Lagos, Port Harcourt)
- Agent-free option (addresses common pain point)

## Mobile Optimization
- Collapsible filter sidebar on mobile
- Touch-friendly controls (44px minimum)
- Reduced animations for performance
- Responsive grid layouts
- Optimized for slow connections

## Next Steps for Production

1. **Backend Integration**
   - Set up authentication API
   - Create property database schema
   - Implement search API with indexing

2. **Video System**
   - Integrate video hosting service
   - Add video upload functionality
   - Implement video compression

3. **Enhanced Features**
   - Save/favorite properties
   - Property comparison
   - Email/SMS notifications
   - Map view integration
   - Advanced search (nearby schools, hospitals)

4. **Performance**
   - Add image optimization (Next.js Image)
   - Implement lazy loading
   - Add service worker for offline support
   - Set up CDN for assets

5. **Analytics**
   - Track search patterns
   - Monitor popular filters
   - Measure conversion rates

## Technology Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS 4
- **Deployment**: Cloudflare (OpenNext)
- **Language**: TypeScript
- **State Management**: React hooks (useState, useMemo)

## Performance Metrics Target
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: > 90
- Mobile-friendly: 100%

