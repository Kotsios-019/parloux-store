# Shopify Authentication Setup Guide

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Your Shopify store domain (e.g., your-store.myshopify.com)
NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN=parloux-store.myshopify.com

# Storefront Access Token (for customer operations)
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token_here

# Admin Access Token (for server-side operations)
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token_here

# Optional: Shopify API Version (defaults to 2024-01)
SHOPIFY_API_VERSION=2024-01
```

## How to Get Shopify Access Tokens

### 1. Storefront Access Token
1. Go to your Shopify Admin
2. Navigate to **Apps** > **App and sales channel settings**
3. Click **Develop apps**
4. Create a new app or use existing one
5. Go to **Configuration** tab
6. Enable **Storefront API access**
7. Copy the **Storefront access token**

### 2. Admin Access Token
1. In the same app from step 1
2. Go to **Configuration** tab
3. Enable **Admin API access**
4. Select required scopes:
   - `read_customers`
   - `write_customers`
   - `read_orders`
   - `write_orders`
5. Copy the **Admin access token**

## Required Shopify Scopes

Make sure your app has these scopes enabled:

**Storefront API:**
- `unauthenticated_read_customers`
- `unauthenticated_write_customers`

**Admin API:**
- `read_customers`
- `write_customers`
- `read_orders`
- `write_orders`

## Testing the Authentication

1. Start your development server: `npm run dev`
2. Navigate to `/login`
3. Try creating a new account
4. Check your Shopify Admin > Customers to see the new customer
5. Try logging in with the created account

## Features Implemented

✅ **User Registration** - Creates customers in Shopify
✅ **User Login** - Authenticates with Shopify
✅ **User Profile** - Updates customer data in Shopify
✅ **Password Reset** - Uses Shopify's password reset
✅ **Order History** - Fetches orders from Shopify
✅ **Secure Sessions** - HTTP-only cookies
✅ **Real-time Auth State** - Updates UI based on login status

## Next Steps

1. Set up your Shopify store credentials
2. Test the authentication flow
3. Customize the login/register pages as needed
4. Add additional features like address management


