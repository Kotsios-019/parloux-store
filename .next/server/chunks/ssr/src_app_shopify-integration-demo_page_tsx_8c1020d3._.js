module.exports=[61246,a=>{"use strict";a.s(["default",()=>k],61246);var b=a.i(87924),c=a.i(72131),d=a.i(46271),e=a.i(69520),f=a.i(16201),g=a.i(92e3),h=a.i(97063);class i{adminApiUrl;accessToken;constructor(a,b){this.adminApiUrl=a,this.accessToken=b}async fetchProducts(a=50,b){let c=`
      query getProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              vendor
              tags
              createdAt
              updatedAt
              images(first: 10) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,d=await this.makeRequest(c,{first:a,after:b});return{products:d.data.products.edges.map(a=>this.transformProduct(a.node)),hasNextPage:d.data.products.pageInfo.hasNextPage,endCursor:d.data.products.pageInfo.endCursor}}async fetchCollections(){let a=`
      query getCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
              productsCount
              sortOrder
              templateSuffix
              updatedAt
              products(first: 20) {
                edges {
                  node {
                    id
                    title
                    handle
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;return(await this.makeRequest(a)).data.collections.edges.map(a=>this.transformCollection(a.node))}async fetchFeaturedCollections(){let a=`
      query getFeaturedCollections {
        collections(first: 50) {
          edges {
            node {
              id
              title
              handle
              description
              image {
                url
                altText
              }
              metafields(first: 10, namespace: "custom") {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;return(await this.makeRequest(a)).data.collections.edges.map(a=>this.transformCollection(a.node)).filter(a=>a.metafields?.some(a=>"featured"===a.key&&"true"===a.value))}async fetchProductsByCollection(a){let b=`
      query getCollectionProducts($handle: String!) {
        collection(handle: $handle) {
          products(first: 50) {
            edges {
              node {
                id
                title
                handle
                description
                productType
                vendor
                tags
                images(first: 10) {
                  edges {
                    node {
                      id
                      url
                      altText
                    }
                  }
                }
                variants(first: 100) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                      availableForSale
                      selectedOptions {
                        name
                        value
                      }
                    }
                  }
                }
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    `;return(await this.makeRequest(b,{handle:a})).data.collection.products.edges.map(a=>this.transformProduct(a.node))}async searchProducts(a,b=20){let c=`
      query searchProducts($query: String!, $first: Int!) {
        products(first: $first, query: $query) {
          edges {
            node {
              id
              title
              handle
              description
              productType
              vendor
              tags
              images(first: 5) {
                edges {
                  node {
                    id
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              featuredImage {
                url
                altText
              }
            }
          }
        }
      }
    `;return(await this.makeRequest(c,{query:a,first:b})).data.products.edges.map(a=>this.transformProduct(a.node))}async updateCollectionMetafield(a,b,c){let d=`
      mutation updateCollectionMetafield($input: CollectionInput!) {
        collectionUpdate(input: $input) {
          collection {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `;await this.makeRequest(d,{input:{id:a,metafields:[{namespace:"custom",key:b,value:c,type:"single_line_text_field"}]}})}transformProduct(a){return{id:a.id,title:a.title,handle:a.handle,description:a.description,images:a.images.edges.map(a=>({id:a.node.id,url:a.node.url,altText:a.node.altText})),variants:a.variants.edges.map(a=>({id:a.node.id,title:a.node.title,price:a.node.price.amount,compareAtPrice:a.node.compareAtPrice?.amount,availableForSale:a.node.availableForSale,selectedOptions:a.node.selectedOptions})),tags:a.tags,productType:a.productType,vendor:a.vendor,createdAt:a.createdAt,updatedAt:a.updatedAt,featuredImage:a.featuredImage}}transformCollection(a){return{id:a.id,title:a.title,handle:a.handle,description:a.description,image:a.image,products:a.products?.edges.map(a=>this.transformProduct(a.node))||[],productsCount:a.productsCount,sortOrder:a.sortOrder,templateSuffix:a.templateSuffix,updatedAt:a.updatedAt}}async makeRequest(a,b){let c=await fetch(`${this.adminApiUrl}/admin/api/2024-01/graphql.json`,{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Access-Token":this.accessToken},body:JSON.stringify({query:a,variables:b})});if(!c.ok)throw Error(`Shopify API error: ${c.statusText}`);let d=await c.json();if(d.errors)throw Error(`GraphQL errors: ${JSON.stringify(d.errors)}`);return d}}var j=a.i(39516);function k(){let[a,k]=(0,c.useState)(null),[l,m]=(0,c.useState)(!1),{products:n,loading:o,error:p}=function(){let[a,b]=(0,c.useState)([]),[d,e]=(0,c.useState)(!0),[f,g]=(0,c.useState)(null);return(0,c.useEffect)(()=>{(async()=>{try{e(!0);let a=new i(process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,process.env.SHOPIFY_ADMIN_ACCESS_TOKEN),c=await a.fetchProducts();b(c.products)}catch(a){g(a instanceof Error?a.message:"Failed to fetch products")}finally{e(!1)}})()},[]),{products:a,loading:d,error:f}}(),{collections:q,loading:r,error:s}=function(){let[a,b]=(0,c.useState)([]),[d,e]=(0,c.useState)(!0),[f,g]=(0,c.useState)(null);return(0,c.useEffect)(()=>{(async()=>{try{e(!0);let a=new i(process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,process.env.SHOPIFY_ADMIN_ACCESS_TOKEN),c=await a.fetchCollections();b(c)}catch(a){g(a instanceof Error?a.message:"Failed to fetch collections")}finally{e(!1)}})()},[]),{collections:a,loading:d,error:f}}(),{featuredCollections:t,loading:u,error:v}=function(){let[a,b]=(0,c.useState)([]),[d,e]=(0,c.useState)(!0),[f,g]=(0,c.useState)(null);return(0,c.useEffect)(()=>{(async()=>{try{e(!0);let a=new i(process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,process.env.SHOPIFY_ADMIN_ACCESS_TOKEN),c=await a.fetchFeaturedCollections();b(c)}catch(a){g(a instanceof Error?a.message:"Failed to fetch featured collections")}finally{e(!1)}})()},[]),{featuredCollections:a,loading:d,error:f}}(),w=async()=>{m(!0),await new Promise(a=>setTimeout(a,2e3)),k(new Date),m(!1)};return(0,b.jsx)(j.default,{children:(0,b.jsx)("div",{className:"min-h-screen bg-gradient-to-br from-champagne-nude/30 to-elegant-base/30 dark:from-champagne-nude/20 dark:to-elegant-base/20 py-8",children:(0,b.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,b.jsxs)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5},className:"text-center mb-12",children:[(0,b.jsx)("h1",{className:"text-4xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-4",children:"Shopify Integration Demo"}),(0,b.jsx)("p",{className:"text-lg text-font-secondary dark:text-font-secondary-dark font-josefin max-w-2xl mx-auto",children:"Real-time data synchronization with Shopify Admin API"}),(0,b.jsxs)("div",{className:"mt-6 flex items-center justify-center space-x-4",children:[(0,b.jsxs)("button",{onClick:w,disabled:l,className:"flex items-center space-x-2 px-4 py-2 bg-soft-gold text-deep-black rounded-lg hover:bg-bright-gold transition-colors disabled:opacity-50",children:[(0,b.jsx)(e.RefreshCw,{className:`w-4 h-4 ${l?"animate-spin":""}`}),(0,b.jsx)("span",{children:"Refresh Data"})]}),a&&(0,b.jsxs)("div",{className:"flex items-center space-x-2 text-sm text-font-secondary dark:text-font-secondary-dark",children:[(0,b.jsx)(f.CheckCircle,{className:"w-4 h-4 text-green-500"}),(0,b.jsxs)("span",{children:["Last updated: ",a.toLocaleTimeString()]})]})]})]}),(0,b.jsxs)("div",{className:"grid grid-cols-1 lg:grid-cols-3 gap-8",children:[(0,b.jsxs)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.1},className:"bg-white dark:bg-deep-black rounded-lg shadow-lg p-6",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-3 mb-4",children:[(0,b.jsx)("div",{className:`w-3 h-3 rounded-full ${o?"bg-yellow-500":p?"bg-red-500":"bg-green-500"}`}),(0,b.jsx)("h2",{className:"text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white",children:"Products"})]}),o?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(e.RefreshCw,{className:"w-4 h-4 animate-spin text-soft-gold"}),(0,b.jsx)("span",{className:"text-font-secondary dark:text-font-secondary-dark",children:"Loading..."})]}):p?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(g.AlertCircle,{className:"w-4 h-4 text-red-500"}),(0,b.jsx)("span",{className:"text-red-600 dark:text-red-400",children:p})]}):(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("div",{className:"text-2xl font-josefin font-bold text-soft-gold",children:n.length}),(0,b.jsx)("div",{className:"text-sm text-font-secondary dark:text-font-secondary-dark",children:"Products synced from Shopify"}),(0,b.jsx)("div",{className:"text-xs text-font-secondary dark:text-font-secondary-dark",children:"Updates automatically via webhooks"})]})]}),(0,b.jsxs)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.2},className:"bg-white dark:bg-deep-black rounded-lg shadow-lg p-6",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-3 mb-4",children:[(0,b.jsx)("div",{className:`w-3 h-3 rounded-full ${r?"bg-yellow-500":s?"bg-red-500":"bg-green-500"}`}),(0,b.jsx)("h2",{className:"text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white",children:"Collections"})]}),r?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(e.RefreshCw,{className:"w-4 h-4 animate-spin text-soft-gold"}),(0,b.jsx)("span",{className:"text-font-secondary dark:text-font-secondary-dark",children:"Loading..."})]}):s?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(g.AlertCircle,{className:"w-4 h-4 text-red-500"}),(0,b.jsx)("span",{className:"text-red-600 dark:text-red-400",children:s})]}):(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("div",{className:"text-2xl font-josefin font-bold text-soft-gold",children:q.length}),(0,b.jsx)("div",{className:"text-sm text-font-secondary dark:text-font-secondary-dark",children:"Collections synced from Shopify"}),(0,b.jsx)("div",{className:"text-xs text-font-secondary dark:text-font-secondary-dark",children:"Featured collections auto-update"})]})]}),(0,b.jsxs)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.3},className:"bg-white dark:bg-deep-black rounded-lg shadow-lg p-6",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-3 mb-4",children:[(0,b.jsx)("div",{className:`w-3 h-3 rounded-full ${u?"bg-yellow-500":v?"bg-red-500":"bg-green-500"}`}),(0,b.jsx)("h2",{className:"text-xl font-cormorant font-bold text-deep-black dark:text-ivory-white",children:"Featured"})]}),u?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(e.RefreshCw,{className:"w-4 h-4 animate-spin text-soft-gold"}),(0,b.jsx)("span",{className:"text-font-secondary dark:text-font-secondary-dark",children:"Loading..."})]}):v?(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(g.AlertCircle,{className:"w-4 h-4 text-red-500"}),(0,b.jsx)("span",{className:"text-red-600 dark:text-red-400",children:v})]}):(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)("div",{className:"text-2xl font-josefin font-bold text-soft-gold",children:t.length}),(0,b.jsx)("div",{className:"text-sm text-font-secondary dark:text-font-secondary-dark",children:"Featured collections"}),(0,b.jsx)("div",{className:"text-xs text-font-secondary dark:text-font-secondary-dark",children:"Controlled by metafields"})]})]})]}),(0,b.jsx)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.4},className:"mt-12",children:(0,b.jsxs)("div",{className:"bg-white dark:bg-deep-black rounded-lg shadow-lg p-8",children:[(0,b.jsx)("h2",{className:"text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6",children:"Automatic Updates"}),(0,b.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:[(0,b.jsxs)("div",{className:"space-y-3",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(f.CheckCircle,{className:"w-5 h-5 text-green-500"}),(0,b.jsx)("h3",{className:"text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white",children:"Products"})]}),(0,b.jsxs)("ul",{className:"text-sm text-font-secondary dark:text-font-secondary-dark space-y-1",children:[(0,b.jsx)("li",{children:"• New products auto-appear"}),(0,b.jsx)("li",{children:"• Updates reflect immediately"}),(0,b.jsx)("li",{children:"• Deleted products removed"}),(0,b.jsx)("li",{children:"• Inventory syncs real-time"}),(0,b.jsx)("li",{children:"• Price changes update instantly"})]})]}),(0,b.jsxs)("div",{className:"space-y-3",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(f.CheckCircle,{className:"w-5 h-5 text-green-500"}),(0,b.jsx)("h3",{className:"text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white",children:"Collections"})]}),(0,b.jsxs)("ul",{className:"text-sm text-font-secondary dark:text-font-secondary-dark space-y-1",children:[(0,b.jsx)("li",{children:"• New collections auto-create"}),(0,b.jsx)("li",{children:"• Featured status via metafields"}),(0,b.jsx)("li",{children:"• Product assignments sync"}),(0,b.jsx)("li",{children:"• Collection images update"}),(0,b.jsx)("li",{children:"• Sort order maintained"})]})]}),(0,b.jsxs)("div",{className:"space-y-3",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,b.jsx)(f.CheckCircle,{className:"w-5 h-5 text-green-500"}),(0,b.jsx)("h3",{className:"text-lg font-cormorant font-semibold text-deep-black dark:text-ivory-white",children:"Content"})]}),(0,b.jsxs)("ul",{className:"text-sm text-font-secondary dark:text-font-secondary-dark space-y-1",children:[(0,b.jsx)("li",{children:"• Descriptions auto-update"}),(0,b.jsx)("li",{children:"• Images sync from Shopify"}),(0,b.jsx)("li",{children:"• Tags create categories"}),(0,b.jsx)("li",{children:"• SEO data maintained"}),(0,b.jsx)("li",{children:"• Search index updates"})]})]})]})]})}),(0,b.jsx)(d.motion.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.5,delay:.5},className:"mt-8",children:(0,b.jsxs)("div",{className:"bg-white dark:bg-deep-black rounded-lg shadow-lg p-8",children:[(0,b.jsx)("h2",{className:"text-2xl font-cormorant font-bold text-deep-black dark:text-ivory-white mb-6",children:"Webhook Configuration"}),(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"flex items-center space-x-3",children:[(0,b.jsx)(h.Info,{className:"w-5 h-5 text-blue-500"}),(0,b.jsxs)("span",{className:"text-font-secondary dark:text-font-secondary-dark",children:["Webhook URL: ",(0,b.jsx)("code",{className:"bg-elegant-base/20 px-2 py-1 rounded",children:"https://yourdomain.com/api/webhooks/shopify"})]})]}),(0,b.jsxs)("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4",children:[(0,b.jsxs)("div",{className:"text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg",children:[(0,b.jsx)("div",{className:"text-sm font-josefin font-semibold text-green-800 dark:text-green-200",children:"Products"}),(0,b.jsx)("div",{className:"text-xs text-green-600 dark:text-green-400",children:"create/update/delete"})]}),(0,b.jsxs)("div",{className:"text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg",children:[(0,b.jsx)("div",{className:"text-sm font-josefin font-semibold text-blue-800 dark:text-blue-200",children:"Collections"}),(0,b.jsx)("div",{className:"text-xs text-blue-600 dark:text-blue-400",children:"create/update/delete"})]}),(0,b.jsxs)("div",{className:"text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg",children:[(0,b.jsx)("div",{className:"text-sm font-josefin font-semibold text-purple-800 dark:text-purple-200",children:"Orders"}),(0,b.jsx)("div",{className:"text-xs text-purple-600 dark:text-purple-400",children:"create/update/paid"})]}),(0,b.jsxs)("div",{className:"text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg",children:[(0,b.jsx)("div",{className:"text-sm font-josefin font-semibold text-orange-800 dark:text-orange-200",children:"Inventory"}),(0,b.jsx)("div",{className:"text-xs text-orange-600 dark:text-orange-400",children:"real-time sync"})]})]})]})]})})]})})})}}];

//# sourceMappingURL=src_app_shopify-integration-demo_page_tsx_8c1020d3._.js.map