module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},22024,e=>{"use strict";e.s(["CUSTOMER_QUERIES",()=>C,"shopifyRequest",()=>N],22024);let t="GraphQL Client",r="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",s="Response returned unexpected Content-Type:",o="An unknown error has occurred. The API did not return a data object or any errors in its response.",n={json:"application/json",multipart:"multipart/mixed"},a="X-SDK-Variant",i="X-SDK-Version",c=[429,503],u=/@(defer)\b/i,l=/boundary="?([^=";]+)"?/i,d="\r\n\r\n";function p(e,r=t){return e.startsWith(`${r}`)?e:`${r}: ${e}`}function m(e){return e instanceof Error?e.message:JSON.stringify(e)}function h(e){return e instanceof Error&&e.cause?e.cause:void 0}function f(e){return e.flatMap(({errors:e})=>e??[])}function y({client:e,retries:t}){if(void 0!==t&&("number"!=typeof t||t<0||t>3))throw Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than 0 or greater than 3`)}function g(e,t){return t&&("object"!=typeof t||Array.isArray(t)||"object"==typeof t&&Object.keys(t).length>0)?{[e]:t}:{}}function x([e,...t]){return t.reduce(function e(t,r){return Object.keys(r||{}).reduce((s,o)=>(("object"==typeof r[o]||Array.isArray(r[o]))&&t[o]?s[o]=e(t[o],r[o]):s[o]=r[o],s),Array.isArray(t)?[...t]:{...t})},{...e})}async function v(e){return new Promise(t=>setTimeout(t,e))}async function w(e){let{errors:t,data:s,extensions:n}=await e.json();return{...g("data",s),...g("extensions",n),headers:e.headers,...t||!s?{errors:{networkStatusCode:e.status,message:p(t?r:o),...g("graphQLErrors",t),response:e}}:{}}}async function*A(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r,s=e.body.getReader();try{for(;!(r=await s.read()).done;)yield t.decode(r.value)}finally{s.cancel()}}}function R({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:s}){let o=`${e}: the provided apiVersion ("${r}")`,n=`Currently supported API versions: ${t.join(", ")}`;if(!r||"string"!=typeof r)throw Error(`${o} is invalid. ${n}`);let a=r.trim();t.includes(a)||(s?s({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${o} is likely deprecated or not supported. ${n}`))}function k(e){let t=3*e-2;return 10===t?t:`0${t}`}function E(e,t,r){let s=t-r;return s<=0?`${e-1}-${k(s+4)}`:`${e}-${k(s)}`}let T="application/json",S="Storefront API Client",$={shopDomain:process.env.SHOPIFY_SHOP_DOMAIN||"parloux-store-2.myshopify.com",storefrontAccessToken:process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN||"33b7d52840ee4b3bc693ba3b08a76cc4",apiVersion:"2024-01"},b=function({storeDomain:e,apiVersion:$,publicAccessToken:b,privateAccessToken:C,clientName:N,retries:O=0,customFetchApi:j,logger:I}){var P,U,q,D,_;let M=function(){let{year:e,quarter:t,version:r}=function(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),s=Math.floor(t/3+1);return{year:r,quarter:s,version:`${r}-${k(s)}`}}(),s=4===t?`${e+1}-01`:`${e}-${k(t+1)}`;return[E(e,t,3),E(e,t,2),E(e,t,1),r,s,"unstable"]}(),H=function({client:e,storeDomain:t}){try{if(!t||"string"!=typeof t)throw Error();let e=t.trim(),r=e.match(/^https?:/)?e:`https://${e}`,s=new URL(r);return s.protocol="https",s.origin}catch(r){throw Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}({client:S,storeDomain:e}),V={client:S,currentSupportedApiVersions:M,logger:I};if(R({...V,apiVersion:$}),!b&&!C)throw Error(`${S}: a public or private access token must be provided`);if(b&&C)throw Error(`${S}: only provide either a public or private access token`);let L=(P=H,U=$,q=V,e=>{e&&R({...q,apiVersion:e});let t=(e??U).trim();return`${P}/api/${t}/graphql.json`}),F={storeDomain:H,apiVersion:$,...b?{publicAccessToken:b}:{privateAccessToken:C},headers:{"Content-Type":T,Accept:T,"X-SDK-Variant":"storefront-api-client","X-SDK-Version":"1.0.9",...N?{"X-SDK-Variant-Source":N}:{},...b?{"X-Shopify-Storefront-Access-Token":b}:{"Shopify-Storefront-Private-Token":C}},apiUrl:L(),clientName:N},K=function({headers:e,url:R,customFetchApi:k=fetch,retries:E=0,logger:T}){var S,$,b;y({client:t,retries:E});let C={headers:e,url:R,retries:E},N=function(e,{url:r,headers:s,retries:o}){return async(n,c={})=>{let{variables:u,headers:l,url:d,retries:p,keepalive:m,signal:h}=c,f=JSON.stringify({query:n,variables:u});y({client:t,retries:p});let g=Object.entries({...s,...l}).reduce((e,[t,r])=>(e[t]=Array.isArray(r)?r.join(", "):r.toString(),e),{});return g[a]||g[i]||(g[a]="shopify-graphql-client",g[i]="1.4.1"),e([d??r,{method:"POST",headers:g,body:f,signal:h,keepalive:m}],1,p??o)}}(function({clientLogger:e,customFetchApi:r=fetch,client:s=t,defaultRetryWaitTime:o=1e3,retriableCodes:n=c}){let a=async(t,i,c)=>{let u,l=i+1,d=c+1;try{if(u=await r(...t),e({type:"HTTP-Response",content:{requestParams:t,response:u}}),!u.ok&&n.includes(u.status)&&l<=d)throw Error();let s=u?.headers.get("X-Shopify-API-Deprecated-Reason")||"";return s&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:t,deprecationNotice:s}}),u}catch(r){if(l<=d){let r=u?.headers.get("Retry-After");return await v(r?parseInt(r,10):o),e({type:"HTTP-Retry",content:{requestParams:t,lastResponse:u,retryAttempt:i,maxRetries:c}}),a(t,l,c)}throw Error(p(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${m(r)}`,s))}};return a}({customFetchApi:k,clientLogger:(S=T,e=>{S&&S(e)}),defaultRetryWaitTime:1e3}),C),O=($=N,async(...e)=>{if(u.test(e[0]))throw Error(p("This operation will result in a streamable response - use requestStream() instead."));let t=null;try{let{status:r,statusText:o}=t=await $(...e),a=t.headers.get("content-type")||"";if(!t.ok)return{errors:{networkStatusCode:r,message:p(o),response:t}};if(!a.includes(n.json))return{errors:{networkStatusCode:r,message:p(`${s} ${a}`),response:t}};return await w(t)}catch(e){return{errors:{message:m(e),...null==t?{}:{networkStatusCode:t.status,response:t}}}}}),j=(b=N,async(...e)=>{if(!u.test(e[0]))throw Error(p("This operation does not result in a streamable response - use request() instead."));try{let t=await b(...e),{statusText:a}=t;if(!t.ok)throw Error(a,{cause:t});let i=t.headers.get("content-type")||"";switch(!0){case i.includes(n.json):return{async *[Symbol.asyncIterator](){let e=await w(t);yield{...e,hasNext:!1}}};case i.includes(n.multipart):return function(e,t){let s,n=(t??"").match(l),a=`--${n?n[1]:"-"}`;if(!e.body?.getReader&&!e.body?.[Symbol.asyncIterator])throw Error("API multipart response did not return an iterable body",{cause:e});let i=A(e),c={};return{async *[Symbol.asyncIterator](){try{let e=!0;for await(let n of{async *[Symbol.asyncIterator](){try{let e="";for await(let t of i)if((e+=t).indexOf(a)>-1){let t=e.lastIndexOf(a),r=e.slice(0,t).split(a).filter(e=>e.trim().length>0).map(e=>e.slice(e.indexOf(d)+d.length).trim());r.length>0&&(yield r),e=e.slice(t+a.length),"--"===e.trim()&&(e="")}}catch(e){throw Error(`Error occured while processing stream payload - ${m(e)}`)}}}){let a=n.map(e=>{try{return JSON.parse(e)}catch(e){throw Error(`Error in parsing multipart response - ${m(e)}`)}}).map(e=>{let{data:t,incremental:r,hasNext:s,extensions:o,errors:n}=e;if(!r)return{data:t||{},...g("errors",n),...g("extensions",o),hasNext:s};let a=r.map(({data:e,path:t,errors:r})=>({data:e&&t?function e(t,r){if(0===t.length)return r;let s={[t.pop()]:r};return 0===t.length?s:e(t,s)}(t,e):{},...g("errors",r)}));return{data:1===a.length?a[0].data:x([...a.map(({data:e})=>e)]),...g("errors",f(a)),hasNext:s}});s=a.find(e=>e.extensions)?.extensions??s;let i=f(a);c=x([c,...a.map(({data:e})=>e)]),e=a.slice(-1)[0].hasNext;var t=c;if(i.length>0)throw Error(r,{cause:{graphQLErrors:i}});if(0===Object.keys(t).length)throw Error(o);yield{...g("data",c),...g("extensions",s),hasNext:e}}if(e)throw Error("Response stream terminated unexpectedly")}catch(r){let t=h(r);yield{...g("data",c),...g("extensions",s),errors:{message:p(m(r)),networkStatusCode:e.status,...g("graphQLErrors",t?.graphQLErrors),response:e},hasNext:!1}}}}}(t,i);default:throw Error(`${s} ${i}`,{cause:t})}}catch(e){return{async *[Symbol.asyncIterator](){let t=h(e);yield{errors:{message:p(m(e)),...g("networkStatusCode",t?.status),...g("response",t)},hasNext:!1}}}}});return{config:C,fetch:N,request:O,requestStream:j}}({headers:F.headers,url:F.apiUrl,retries:O,customFetchApi:j,logger:I}),X=e=>({...e??{},...F.headers}),Q=(D=F,_=L,e=>e?_(e):D.apiUrl),G=function({getHeaders:e,getApiUrl:t}){return(r,s)=>{let o=[r];if(s&&Object.keys(s).length>0){let{variables:r,apiVersion:n,headers:a,retries:i,signal:c}=s;o.push({...r?{variables:r}:{},...a?{headers:e(a)}:{},...n?{url:t(n)}:{},...i?{retries:i}:{},...c?{signal:c}:{}})}return o}}({getHeaders:X,getApiUrl:Q});return Object.freeze({config:F,getHeaders:X,getApiUrl:Q,fetch:(...e)=>K.fetch(...G(...e)),request:(...e)=>K.request(...G(...e)),requestStream:(...e)=>K.requestStream(...G(...e))})}({storeDomain:$.shopDomain,apiVersion:$.apiVersion,publicAccessToken:$.storefrontAccessToken});$.shopDomain,$.apiVersion;let C={customerAccessTokenCreate:`
    mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,customer:`
    query customer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
        createdAt
        updatedAt
        defaultAddress {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
      }
    }
  `,customerCreate:`
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          createdAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,customerUpdate:`
    mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          id
          email
          firstName
          lastName
          phone
          acceptsMarketing
          updatedAt
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `,customerRecover:`
    mutation customerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors {
          field
          message
        }
      }
    }
  `,customerOrders:`
    query customerOrders($customerAccessToken: String!, $first: Int!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: $first) {
          edges {
            node {
              id
              orderNumber
              processedAt
              totalPrice {
                amount
                currencyCode
              }
              fulfillmentStatus
              financialStatus
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      title
                      image {
                        url
                        altText
                      }
                    }
                    originalTotalPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `};async function N(e,t={}){console.log("Shopify API Debug:"),console.log("Shop Domain:",$.shopDomain),console.log("Token:",`SET (${$.storefrontAccessToken.substring(0,8)}...)`);try{return await b.request(e,{variables:t})}catch(e){throw console.error("Shopify API Error:",e),Error(`Shopify API error: ${e.message}`)}}},65517,(e,t,r)=>{},91004,e=>{"use strict";e.s(["handler",()=>b,"patchFetch",()=>$,"routeModule",()=>k,"serverHooks",()=>S,"workAsyncStorage",()=>E,"workUnitAsyncStorage",()=>T],91004);var t=e.i(47909),r=e.i(74017),s=e.i(96250),o=e.i(59756),n=e.i(61916),a=e.i(69741),i=e.i(16795),c=e.i(87718),u=e.i(95169),l=e.i(47587),d=e.i(66012),p=e.i(70101),m=e.i(26937),h=e.i(10372),f=e.i(93695);e.i(52474);var y=e.i(220);e.s(["GET",()=>w,"POST",()=>A],61016);var g=e.i(89171),x=e.i(93458),v=e.i(22024);async function w(e){try{let e=(await (0,x.cookies)()).get("shopify-customer-token");if(!e)return g.NextResponse.json({error:"Not authenticated"},{status:401});let t=await (0,v.shopifyRequest)(`
      query customerMetafields($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
          id
          metafields(first: 10, namespace: "parloux") {
            edges {
              node {
                id
                key
                value
                type
              }
            }
          }
        }
      }
    `,{customerAccessToken:e.value}),r=t.data?.customer||t.customer;if(!r)return g.NextResponse.json({error:"Customer not found"},{status:404});let s=r.metafields?.edges||[],o=s.find(e=>"wishlist"===e.node.key)?.node?.value||"[]",n=s.find(e=>"cart"===e.node.key)?.node?.value||"[]";return g.NextResponse.json({wishlist:JSON.parse(o),cart:JSON.parse(n)})}catch(e){return console.error("Get user data error:",e),g.NextResponse.json({error:"Failed to retrieve user data"},{status:500})}}async function A(e){try{let t=(await (0,x.cookies)()).get("shopify-customer-token");if(!t)return g.NextResponse.json({error:"Not authenticated"},{status:401});let{wishlist:r,cart:s}=await e.json(),o=await (0,v.shopifyRequest)(v.CUSTOMER_QUERIES.customer,{customerAccessToken:t.value});if(!(o.data?.customer||o.customer))return g.NextResponse.json({error:"Customer not found"},{status:404});return void 0!==r&&await (0,v.shopifyRequest)(`
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `,{customerAccessToken:t.value,customer:{metafields:[{namespace:"parloux",key:"wishlist",value:JSON.stringify(r),type:"json"}]}}),void 0!==s&&await (0,v.shopifyRequest)(`
        mutation customerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
          customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
            customer {
              id
            }
            customerUserErrors {
              field
              message
            }
          }
        }
      `,{customerAccessToken:t.value,customer:{metafields:[{namespace:"parloux",key:"cart",value:JSON.stringify(s),type:"json"}]}}),g.NextResponse.json({success:!0})}catch(e){return console.error("Save user data error:",e),g.NextResponse.json({error:"Failed to save user data"},{status:500})}}var R=e.i(61016);let k=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/user-data/route",pathname:"/api/user-data",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/user-data/route.ts",nextConfigOutput:"",userland:R}),{workAsyncStorage:E,workUnitAsyncStorage:T,serverHooks:S}=k;function $(){return(0,s.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:T})}async function b(e,t,s){var g;let x="/api/user-data/route";x=x.replace(/\/index$/,"")||"/";let v=await k.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!v)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:w,params:A,nextConfig:R,isDraftMode:E,prerenderManifest:T,routerServerContext:S,isOnDemandRevalidate:$,revalidateOnlyGenerated:b,resolvedPathname:C}=v,N=(0,a.normalizeAppPath)(x),O=!!(T.dynamicRoutes[N]||T.routes[C]);if(O&&!E){let e=!!T.routes[C],t=T.dynamicRoutes[N];if(t&&!1===t.fallback&&!e)throw new f.NoFallbackError}let j=null;!O||k.isDev||E||(j="/index"===(j=C)?"/":j);let I=!0===k.isDev||!O,P=O&&!I,U=e.method||"GET",q=(0,n.getTracer)(),D=q.getActiveScopeSpan(),_={params:A,prerenderManifest:T,renderOpts:{experimental:{cacheComponents:!!R.experimental.cacheComponents,authInterrupts:!!R.experimental.authInterrupts},supportsDynamicResponse:I,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(g=R.experimental)?void 0:g.cacheLife,isRevalidate:P,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s)=>k.onRequestError(e,t,s,S)},sharedContext:{buildId:w}},M=new i.NodeNextRequest(e),H=new i.NodeNextResponse(t),V=c.NextRequestAdapter.fromNodeNextRequest(M,(0,c.signalFromNodeResponse)(t));try{let a=async r=>k.handle(V,_).finally(()=>{if(!r)return;r.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let s=q.getRootSpanAttributes();if(!s)return;if(s.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${s.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=s.get("next.route");if(o){let e=`${U} ${o}`;r.setAttributes({"next.route":o,"http.route":o,"next.span_name":e}),r.updateName(e)}else r.updateName(`${U} ${e.url}`)}),i=async n=>{var i,c;let u=async({previousCacheEntry:r})=>{try{if(!(0,o.getRequestMeta)(e,"minimalMode")&&$&&b&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await a(n);e.fetchMetrics=_.renderOpts.fetchMetrics;let c=_.renderOpts.pendingWaitUntil;c&&s.waitUntil&&(s.waitUntil(c),c=void 0);let u=_.renderOpts.collectedTags;if(!O)return await (0,d.sendResponse)(M,H,i,_.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,p.toNodeOutgoingHttpHeaders)(i.headers);u&&(t[h.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==_.renderOpts.collectedRevalidate&&!(_.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&_.renderOpts.collectedRevalidate,s=void 0===_.renderOpts.collectedExpire||_.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:_.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==r?void 0:r.isStale)&&await k.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isRevalidate:P,isOnDemandRevalidate:$})},S),t}},f=await k.handleResponse({req:e,nextConfig:R,cacheKey:j,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:$,revalidateOnlyGenerated:b,responseGenerator:u,waitUntil:s.waitUntil});if(!O)return null;if((null==f||null==(i=f.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==f||null==(c=f.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,o.getRequestMeta)(e,"minimalMode")||t.setHeader("x-nextjs-cache",$?"REVALIDATED":f.isMiss?"MISS":f.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,p.fromNodeOutgoingHttpHeaders)(f.value.headers);return(0,o.getRequestMeta)(e,"minimalMode")&&O||g.delete(h.NEXT_CACHE_TAGS_HEADER),!f.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,m.getCacheControlHeader)(f.cacheControl)),await (0,d.sendResponse)(M,H,new Response(f.value.body,{headers:g,status:f.value.status||200})),null};D?await i(D):await q.withPropagatedContext(e.headers,()=>q.trace(u.BaseServerSpan.handleRequest,{spanName:`${U} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},i))}catch(t){if(t instanceof f.NoFallbackError||await k.onRequestError(e,t,{routerKind:"App Router",routePath:N,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isRevalidate:P,isOnDemandRevalidate:$})}),O)throw t;return await (0,d.sendResponse)(M,H,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__06980390._.js.map