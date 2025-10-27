# 🛠️ Shopify Integration & Maintenance Guide

## **Overview**
This guide covers how to maintain your Parloux store with real Shopify data, ensuring seamless updates and minimal manual intervention.

## **🔄 Real-time Updates System**

### **1. Webhook Configuration**
Set up these webhooks in your Shopify Admin:

```
Webhook URL: https://yourdomain.com/api/webhooks/shopify
Events to subscribe to:
- products/create
- products/update  
- products/delete
- collections/create
- collections/update
- collections/delete
- orders/create
- orders/updated
- orders/paid
- orders/cancelled
- orders/fulfilled
```

### **2. Environment Variables**
Add these to your `.env.local`:

```bash
# Shopify Admin API
SHOPIFY_ADMIN_ACCESS_TOKEN=your_admin_access_token
SHOPIFY_WEBHOOK_SECRET=your_webhook_secret

# Shopify Storefront API (already configured)
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_token
```

## **📦 Product Management**

### **Automatic Product Updates**
✅ **What happens automatically:**
- New products appear on product pages
- Product updates reflect immediately
- Deleted products are removed from UI
- Inventory changes update availability
- Price changes reflect in real-time

### **Product Structure Mapping**
```typescript
// Shopify Product → Our UI
{
  id: "gid://shopify/Product/123",
  title: "Elegant Silk Dress",
  handle: "elegant-silk-dress",
  description: "Beautiful silk dress...",
  images: [...], // Auto-mapped to gallery
  variants: [...], // Auto-mapped to size/color options
  tags: ["dress", "silk", "elegant"], // Auto-mapped to categories
  productType: "Dresses", // Auto-mapped to category
  vendor: "Parloux"
}
```

### **Category Management**
**Option 1: Product Types (Recommended)**
- Use Shopify's `productType` field
- Automatically creates categories
- No manual maintenance needed

**Option 2: Tags**
- Use Shopify's `tags` field
- More flexible categorization
- Requires tag standardization

**Option 3: Metafields**
- Custom categorization system
- Most flexible but requires setup

## **🎨 Collection Management**

### **Featured Collections**
**Method 1: Metafields (Recommended)**
1. In Shopify Admin, go to Collections
2. Add a metafield: `custom.featured = true`
3. Collections automatically appear in featured section

**Method 2: Collection Handles**
- Hardcode specific collection handles
- Less flexible but simpler setup

**Method 3: Collection Tags**
- Use collection tags for categorization
- More flexible than handles

### **Collection Structure**
```typescript
// Shopify Collection → Our UI
{
  id: "gid://shopify/Collection/456",
  title: "Dresses",
  handle: "dresses",
  description: "Beautiful dresses...",
  image: {...}, // Auto-mapped to collection image
  products: [...], // Auto-mapped to product grid
  productsCount: 25,
  metafields: [
    { key: "featured", value: "true" }, // Controls featured status
    { key: "sort_order", value: "1" }   // Controls display order
  ]
}
```

## **🔍 Search Integration**

### **Shopify Search API**
```typescript
// Automatic search integration
const searchResults = await shopify.searchProducts(query, {
  fields: ['title', 'handle', 'description', 'tags'],
  limit: 20,
  sort: 'relevance'
});
```

### **Search Features**
✅ **Automatic:**
- Product search by title, description, tags
- Collection search
- Filter by price, availability, category
- Search suggestions
- Search history

## **📱 Content Management Workflow**

### **Adding New Products**
1. **In Shopify Admin:**
   - Create new product
   - Add images, variants, description
   - Set product type (category)
   - Add tags for additional categorization

2. **Automatic Updates:**
   - Product appears on `/products` page
   - Available in search results
   - Shows in relevant collections
   - Breadcrumbs auto-generate

### **Adding New Collections**
1. **In Shopify Admin:**
   - Create new collection
   - Add products to collection
   - Set collection image
   - Add metafields for featured status

2. **Automatic Updates:**
   - Collection appears on `/collections` page
   - Available in navigation (if configured)
   - Shows in featured section (if metafield set)

### **Updating Featured Content**
1. **Featured Products:**
   - Add `custom.featured = true` metafield to products
   - Products automatically appear in featured section

2. **Featured Collections:**
   - Add `custom.featured = true` metafield to collections
   - Collections automatically appear in featured section

## **🔄 Cache Management**

### **Automatic Cache Invalidation**
```typescript
// Webhook triggers cache invalidation
await revalidatePath('/products');
await revalidatePath('/collections');
await revalidatePath('/'); // Homepage
```

### **Cache Strategy**
- **Product pages:** Cache for 1 hour
- **Collection pages:** Cache for 30 minutes
- **Homepage:** Cache for 15 minutes
- **Search results:** Cache for 5 minutes

## **📊 Analytics & Monitoring**

### **Webhook Monitoring**
```typescript
// Track webhook success/failure
const webhookMetrics = {
  productsUpdated: 0,
  collectionsUpdated: 0,
  ordersProcessed: 0,
  errors: 0
};
```

### **Performance Monitoring**
- Monitor API response times
- Track cache hit rates
- Monitor webhook processing times
- Alert on failed webhooks

## **🛡️ Error Handling**

### **Webhook Failures**
```typescript
// Retry mechanism for failed webhooks
const retryWebhook = async (webhookData: any, retries = 3) => {
  try {
    await processWebhook(webhookData);
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return retryWebhook(webhookData, retries - 1);
    }
    throw error;
  }
};
```

### **Fallback Strategies**
- Use cached data if API fails
- Show loading states during updates
- Graceful degradation for missing data

## **🔧 Maintenance Tasks**

### **Daily Tasks**
- Monitor webhook logs
- Check for failed API calls
- Verify product/collection sync

### **Weekly Tasks**
- Review search performance
- Check cache hit rates
- Monitor error rates

### **Monthly Tasks**
- Update product images
- Review collection organization
- Analyze user behavior

## **📈 Scaling Considerations**

### **High Volume Stores**
- Implement Redis caching
- Use CDN for images
- Optimize GraphQL queries
- Implement pagination

### **Multiple Stores**
- Use Shopify's multi-store API
- Implement store-specific configurations
- Handle cross-store inventory

### **International Stores**
- Use Shopify's multi-currency API
- Implement region-specific content
- Handle different tax rates

## **🚀 Advanced Features**

### **Inventory Management**
```typescript
// Real-time inventory updates
const updateInventory = async (productId: string, quantity: number) => {
  await shopify.updateProductVariant(productId, { inventory: quantity });
  // Automatically updates UI
};
```

### **Price Management**
```typescript
// Dynamic pricing
const updatePricing = async (productId: string, newPrice: number) => {
  await shopify.updateProductVariant(productId, { price: newPrice });
  // Automatically updates UI
};
```

### **Content Scheduling**
```typescript
// Schedule product releases
const scheduleProduct = async (productId: string, publishDate: Date) => {
  await shopify.updateProduct(productId, { 
    publishedAt: publishDate.toISOString() 
  });
};
```

## **📋 Checklist for Go-Live**

### **Pre-Launch**
- [ ] Configure all webhooks
- [ ] Test webhook endpoints
- [ ] Set up monitoring
- [ ] Configure cache settings
- [ ] Test product/collection sync

### **Launch Day**
- [ ] Monitor webhook logs
- [ ] Check API performance
- [ ] Verify content updates
- [ ] Test search functionality

### **Post-Launch**
- [ ] Monitor error rates
- [ ] Check cache performance
- [ ] Verify user experience
- [ ] Gather feedback

## **🆘 Troubleshooting**

### **Common Issues**
1. **Products not updating:** Check webhook configuration
2. **Images not loading:** Verify CDN settings
3. **Search not working:** Check API credentials
4. **Cache issues:** Clear cache and restart

### **Debug Tools**
```typescript
// Debug webhook processing
const debugWebhook = (data: any) => {
  console.log('Webhook data:', JSON.stringify(data, null, 2));
  console.log('Processing time:', Date.now() - data.timestamp);
};
```

## **📞 Support**

### **Shopify Resources**
- [Shopify Admin API Documentation](https://shopify.dev/docs/admin-api)
- [Shopify Webhooks Guide](https://shopify.dev/docs/admin-api/rest/reference/events/webhook)
- [Shopify GraphQL Tutorial](https://shopify.dev/docs/admin-api/graphql)

### **Technical Support**
- Check webhook logs in Shopify Admin
- Monitor API usage in Shopify Partner Dashboard
- Review error logs in your application

---

**This system ensures your store remains up-to-date with minimal manual intervention while providing maximum flexibility for content management.**

