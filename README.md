# ParlouX Store - Luxury Womenswear E-commerce

A sophisticated headless e-commerce store built with Next.js 15, Shopify Storefront API, and Tailwind CSS, featuring bilingual support (Greek/English) and elegant luxury brand aesthetics.

## Features

- 🛍️ **Headless Shopify Integration** - Full e-commerce functionality with Shopify as CMS
- 🌍 **Bilingual Support** - Greek and English with next-intl
- 🎨 **Luxury Brand Design** - Custom ParlouX color palette and typography
- 🌙 **Dark/Light Theme** - Smooth theme switching with persistence
- 📱 **Responsive Design** - Mobile-first approach with elegant animations
- ⚡ **Performance Optimized** - Next.js 15 with App Router and ISR
- 🔍 **SEO Ready** - Dynamic metadata and structured data
- 🛒 **Advanced Cart** - Persistent cart with optimistic UI updates

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom ParlouX design system
- **E-commerce**: Shopify Storefront API
- **Internationalization**: next-intl
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Cormorant Garamond (headings) + Josefin Sans (body)

## Quick Start

### 1. Environment Setup

Create a `.env.local` file in the root directory with your Shopify credentials:

```bash
# Copy the template
cp env.template .env.local
```

Then edit `.env.local` with your actual values:

```env
# Shopify Configuration
SHOPIFY_STORE_DOMAIN=parloux-store-2.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_actual_storefront_token
SHOPIFY_ADMIN_API_TOKEN=your_actual_admin_token

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your store!

## Shopify Setup Guide

### Getting Your Credentials

1. **Store Domain**: Your Shopify store URL (e.g., `parloux-store-2.myshopify.com`)

2. **Storefront Access Token**:
   - Go to Apps → App and sales channel settings → Develop apps
   - Create a new app called "Headless Storefront"
   - Go to Configuration → Enable "Storefront API access"
   - Copy the Storefront access token

3. **Admin API Access Token**:
   - In the same app, go to Admin API access scopes
   - Enable: `read_products`, `read_orders`, `read_customers`, `read_inventory`
   - Install the app and copy the Admin API access token

### Required Shopify Settings

- **Storefront API**: Enabled
- **Products**: Add your clothing products with proper variants (size, color)
- **Collections**: Create collections for different categories (dresses, tops, etc.)
- **Shipping**: Configure shipping zones and rates
- **Payment**: Set up payment gateways

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # Internationalized routes
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Product pages
│   │   ├── collections/     # Collection pages
│   │   └── layout.tsx      # Locale layout
│   ├── globals.css         # Global styles with ParlouX theme
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
├── contexts/               # React contexts (Cart, Theme)
├── lib/
│   └── shopify.ts         # Shopify API client
├── locales/               # Translation files
│   ├── en.json            # English translations
│   └── el.json            # Greek translations
├── types/
│   └── shopify.ts         # TypeScript types
└── i18n.ts               # i18n configuration
```

## Brand Colors

- **Deep Black**: `#0A0A0A` - Backgrounds, titles, header/footer
- **Soft Gold**: `#C9A34E` - Primary accent, buttons, hover effects
- **Bright Gold**: `#DDBB5F` - Hover states
- **Ivory White**: `#F9F8F6` - Section backgrounds, product cards
- **Elegant Base**: `#D1CFCB` - Dividers, borders, subtle shadows
- **Champagne Nude**: `#E8DCC4` - Banners, hero overlays
- **Font Primary**: `#111111` - Headings and main titles
- **Font Secondary**: `#4B4B4B` - Paragraphs and supporting text

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

### Key Features to Implement

1. **Product Catalog** - Grid layout with filtering and search
2. **Product Detail Pages** - Image gallery, variants, add to cart
3. **Shopping Cart** - Drawer UI with persistent state
4. **Collections** - Category pages with sorting
5. **Checkout** - Shopify checkout integration
6. **SEO** - Dynamic metadata and structured data
7. **Analytics** - Google Analytics integration

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Make sure to set these in your Vercel dashboard:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_ADMIN_API_TOKEN`
- `NEXT_PUBLIC_SITE_URL` (your production domain)
- `NEXT_PUBLIC_GA_ID` (if using analytics)

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new files
3. Follow the ParlouX brand guidelines
4. Test on both light and dark themes
5. Ensure responsive design works on all devices

## License

Private project for ParlouX brand. All rights reserved.
