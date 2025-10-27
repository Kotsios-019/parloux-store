module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},22024,e=>{"use strict";e.s(["CUSTOMER_QUERIES",()=>$,"shopifyRequest",()=>O],22024);let t="GraphQL Client",r="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",s="Response returned unexpected Content-Type:",o="An unknown error has occurred. The API did not return a data object or any errors in its response.",n={json:"application/json",multipart:"multipart/mixed"},a="X-SDK-Variant",i="X-SDK-Version",c=[429,503],l=/@(defer)\b/i,u=/boundary="?([^=";]+)"?/i,p="\r\n\r\n";function d(e,r=t){return e.startsWith(`${r}`)?e:`${r}: ${e}`}function m(e){return e instanceof Error?e.message:JSON.stringify(e)}function h(e){return e instanceof Error&&e.cause?e.cause:void 0}function f(e){return e.flatMap(({errors:e})=>e??[])}function y({client:e,retries:t}){if(void 0!==t&&("number"!=typeof t||t<0||t>3))throw Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than 0 or greater than 3`)}function g(e,t){return t&&("object"!=typeof t||Array.isArray(t)||"object"==typeof t&&Object.keys(t).length>0)?{[e]:t}:{}}function E([e,...t]){return t.reduce(function e(t,r){return Object.keys(r||{}).reduce((s,o)=>(("object"==typeof r[o]||Array.isArray(r[o]))&&t[o]?s[o]=e(t[o],r[o]):s[o]=r[o],s),Array.isArray(t)?[...t]:{...t})},{...e})}async function R(e){return new Promise(t=>setTimeout(t,e))}async function x(e){let{errors:t,data:s,extensions:n}=await e.json();return{...g("data",s),...g("extensions",n),headers:e.headers,...t||!s?{errors:{networkStatusCode:e.status,message:d(t?r:o),...g("graphQLErrors",t),response:e}}:{}}}async function*w(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r,s=e.body.getReader();try{for(;!(r=await s.read()).done;)yield t.decode(r.value)}finally{s.cancel()}}}function T({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:s}){let o=`${e}: the provided apiVersion ("${r}")`,n=`Currently supported API versions: ${t.join(", ")}`;if(!r||"string"!=typeof r)throw Error(`${o} is invalid. ${n}`);let a=r.trim();t.includes(a)||(s?s({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${o} is likely deprecated or not supported. ${n}`))}function A(e){let t=3*e-2;return 10===t?t:`0${t}`}function S(e,t,r){let s=t-r;return s<=0?`${e-1}-${A(s+4)}`:`${e}-${A(s)}`}let v="application/json",C="Storefront API Client",k={shopDomain:process.env.SHOPIFY_SHOP_DOMAIN||"parloux-store-2.myshopify.com",storefrontAccessToken:process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN||"33b7d52840ee4b3bc693ba3b08a76cc4",apiVersion:"2024-01"},b=function({storeDomain:e,apiVersion:k,publicAccessToken:b,privateAccessToken:$,clientName:O,retries:N=0,customFetchApi:P,logger:I}){var j,U,_,q,D;let H=function(){let{year:e,quarter:t,version:r}=function(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),s=Math.floor(t/3+1);return{year:r,quarter:s,version:`${r}-${A(s)}`}}(),s=4===t?`${e+1}-01`:`${e}-${A(t+1)}`;return[S(e,t,3),S(e,t,2),S(e,t,1),r,s,"unstable"]}(),M=function({client:e,storeDomain:t}){try{if(!t||"string"!=typeof t)throw Error();let e=t.trim(),r=e.match(/^https?:/)?e:`https://${e}`,s=new URL(r);return s.protocol="https",s.origin}catch(r){throw Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}({client:C,storeDomain:e}),L={client:C,currentSupportedApiVersions:H,logger:I};if(T({...L,apiVersion:k}),!b&&!$)throw Error(`${C}: a public or private access token must be provided`);if(b&&$)throw Error(`${C}: only provide either a public or private access token`);let F=(j=M,U=k,_=L,e=>{e&&T({..._,apiVersion:e});let t=(e??U).trim();return`${j}/api/${t}/graphql.json`}),K={storeDomain:M,apiVersion:k,...b?{publicAccessToken:b}:{privateAccessToken:$},headers:{"Content-Type":v,Accept:v,"X-SDK-Variant":"storefront-api-client","X-SDK-Version":"1.0.9",...O?{"X-SDK-Variant-Source":O}:{},...b?{"X-Shopify-Storefront-Access-Token":b}:{"Shopify-Storefront-Private-Token":$}},apiUrl:F(),clientName:O},V=function({headers:e,url:T,customFetchApi:A=fetch,retries:S=0,logger:v}){var C,k,b;y({client:t,retries:S});let $={headers:e,url:T,retries:S},O=function(e,{url:r,headers:s,retries:o}){return async(n,c={})=>{let{variables:l,headers:u,url:p,retries:d,keepalive:m,signal:h}=c,f=JSON.stringify({query:n,variables:l});y({client:t,retries:d});let g=Object.entries({...s,...u}).reduce((e,[t,r])=>(e[t]=Array.isArray(r)?r.join(", "):r.toString(),e),{});return g[a]||g[i]||(g[a]="shopify-graphql-client",g[i]="1.4.1"),e([p??r,{method:"POST",headers:g,body:f,signal:h,keepalive:m}],1,d??o)}}(function({clientLogger:e,customFetchApi:r=fetch,client:s=t,defaultRetryWaitTime:o=1e3,retriableCodes:n=c}){let a=async(t,i,c)=>{let l,u=i+1,p=c+1;try{if(l=await r(...t),e({type:"HTTP-Response",content:{requestParams:t,response:l}}),!l.ok&&n.includes(l.status)&&u<=p)throw Error();let s=l?.headers.get("X-Shopify-API-Deprecated-Reason")||"";return s&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:t,deprecationNotice:s}}),l}catch(r){if(u<=p){let r=l?.headers.get("Retry-After");return await R(r?parseInt(r,10):o),e({type:"HTTP-Retry",content:{requestParams:t,lastResponse:l,retryAttempt:i,maxRetries:c}}),a(t,u,c)}throw Error(d(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${m(r)}`,s))}};return a}({customFetchApi:A,clientLogger:(C=v,e=>{C&&C(e)}),defaultRetryWaitTime:1e3}),$),N=(k=O,async(...e)=>{if(l.test(e[0]))throw Error(d("This operation will result in a streamable response - use requestStream() instead."));let t=null;try{let{status:r,statusText:o}=t=await k(...e),a=t.headers.get("content-type")||"";if(!t.ok)return{errors:{networkStatusCode:r,message:d(o),response:t}};if(!a.includes(n.json))return{errors:{networkStatusCode:r,message:d(`${s} ${a}`),response:t}};return await x(t)}catch(e){return{errors:{message:m(e),...null==t?{}:{networkStatusCode:t.status,response:t}}}}}),P=(b=O,async(...e)=>{if(!l.test(e[0]))throw Error(d("This operation does not result in a streamable response - use request() instead."));try{let t=await b(...e),{statusText:a}=t;if(!t.ok)throw Error(a,{cause:t});let i=t.headers.get("content-type")||"";switch(!0){case i.includes(n.json):return{async *[Symbol.asyncIterator](){let e=await x(t);yield{...e,hasNext:!1}}};case i.includes(n.multipart):return function(e,t){let s,n=(t??"").match(u),a=`--${n?n[1]:"-"}`;if(!e.body?.getReader&&!e.body?.[Symbol.asyncIterator])throw Error("API multipart response did not return an iterable body",{cause:e});let i=w(e),c={};return{async *[Symbol.asyncIterator](){try{let e=!0;for await(let n of{async *[Symbol.asyncIterator](){try{let e="";for await(let t of i)if((e+=t).indexOf(a)>-1){let t=e.lastIndexOf(a),r=e.slice(0,t).split(a).filter(e=>e.trim().length>0).map(e=>e.slice(e.indexOf(p)+p.length).trim());r.length>0&&(yield r),e=e.slice(t+a.length),"--"===e.trim()&&(e="")}}catch(e){throw Error(`Error occured while processing stream payload - ${m(e)}`)}}}){let a=n.map(e=>{try{return JSON.parse(e)}catch(e){throw Error(`Error in parsing multipart response - ${m(e)}`)}}).map(e=>{let{data:t,incremental:r,hasNext:s,extensions:o,errors:n}=e;if(!r)return{data:t||{},...g("errors",n),...g("extensions",o),hasNext:s};let a=r.map(({data:e,path:t,errors:r})=>({data:e&&t?function e(t,r){if(0===t.length)return r;let s={[t.pop()]:r};return 0===t.length?s:e(t,s)}(t,e):{},...g("errors",r)}));return{data:1===a.length?a[0].data:E([...a.map(({data:e})=>e)]),...g("errors",f(a)),hasNext:s}});s=a.find(e=>e.extensions)?.extensions??s;let i=f(a);c=E([c,...a.map(({data:e})=>e)]),e=a.slice(-1)[0].hasNext;var t=c;if(i.length>0)throw Error(r,{cause:{graphQLErrors:i}});if(0===Object.keys(t).length)throw Error(o);yield{...g("data",c),...g("extensions",s),hasNext:e}}if(e)throw Error("Response stream terminated unexpectedly")}catch(r){let t=h(r);yield{...g("data",c),...g("extensions",s),errors:{message:d(m(r)),networkStatusCode:e.status,...g("graphQLErrors",t?.graphQLErrors),response:e},hasNext:!1}}}}}(t,i);default:throw Error(`${s} ${i}`,{cause:t})}}catch(e){return{async *[Symbol.asyncIterator](){let t=h(e);yield{errors:{message:d(m(e)),...g("networkStatusCode",t?.status),...g("response",t)},hasNext:!1}}}}});return{config:$,fetch:O,request:N,requestStream:P}}({headers:K.headers,url:K.apiUrl,retries:N,customFetchApi:P,logger:I}),Q=e=>({...e??{},...K.headers}),X=(q=K,D=F,e=>e?D(e):q.apiUrl),B=function({getHeaders:e,getApiUrl:t}){return(r,s)=>{let o=[r];if(s&&Object.keys(s).length>0){let{variables:r,apiVersion:n,headers:a,retries:i,signal:c}=s;o.push({...r?{variables:r}:{},...a?{headers:e(a)}:{},...n?{url:t(n)}:{},...i?{retries:i}:{},...c?{signal:c}:{}})}return o}}({getHeaders:Q,getApiUrl:X});return Object.freeze({config:K,getHeaders:Q,getApiUrl:X,fetch:(...e)=>V.fetch(...B(...e)),request:(...e)=>V.request(...B(...e)),requestStream:(...e)=>V.requestStream(...B(...e))})}({storeDomain:k.shopDomain,apiVersion:k.apiVersion,publicAccessToken:k.storefrontAccessToken});k.shopDomain,k.apiVersion;let $={customerAccessTokenCreate:`
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
  `};async function O(e,t={}){console.log("Shopify API Debug:"),console.log("Shop Domain:",k.shopDomain),console.log("Token:",`SET (${k.storefrontAccessToken.substring(0,8)}...)`);try{return await b.request(e,{variables:t})}catch(e){throw console.error("Shopify API Error:",e),Error(`Shopify API error: ${e.message}`)}}},96331,(e,t,r)=>{},6706,e=>{"use strict";e.s(["handler",()=>k,"patchFetch",()=>C,"routeModule",()=>T,"serverHooks",()=>v,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>S],6706);var t=e.i(47909),r=e.i(74017),s=e.i(96250),o=e.i(59756),n=e.i(61916),a=e.i(69741),i=e.i(16795),c=e.i(87718),l=e.i(95169),u=e.i(47587),p=e.i(66012),d=e.i(70101),m=e.i(26937),h=e.i(10372),f=e.i(93695);e.i(52474);var y=e.i(220);e.s(["POST",()=>x],26170);var g=e.i(89171),E=e.i(93458),R=e.i(22024);async function x(e){try{console.log("Environment check:"),console.log("SHOP_DOMAIN:",process.env.NEXT_PUBLIC_SHOPIFY_SHOP_DOMAIN),console.log("STOREFRONT_TOKEN:",process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?"SET":"NOT SET");let{email:t,password:r,firstName:s,lastName:o,phone:n,acceptsMarketing:a}=await e.json();if(!t||!r||!s||!o)return g.NextResponse.json({error:"Email, password, first name, and last name are required"},{status:400});let i={email:t,password:r,firstName:s,lastName:o,acceptsMarketing:a||!1};n&&""!==n.trim()&&(i.phone=n);let c=await (0,R.shopifyRequest)(R.CUSTOMER_QUERIES.customerCreate,{input:i});if(console.log("Customer Create Response:",JSON.stringify(c,null,2)),c.errors?.graphQLErrors?.length>0){let e=c.errors.graphQLErrors[0];if(console.log("GraphQL Error Details:",JSON.stringify(e,null,2)),e.extensions?.code!=="THROTTLED")return g.NextResponse.json({error:`Registration failed: ${e.message}`},{status:400});console.log("Rate limited, attempting login...")}let l=c.data?.customerCreate||c.customerCreate;if(l?.customerUserErrors?.length>0){let e=l.customerUserErrors[0];return g.NextResponse.json({error:e.message},{status:400})}let u=await (0,R.shopifyRequest)(R.CUSTOMER_QUERIES.customerAccessTokenCreate,{input:{email:t,password:r}}),p=u.data?.customerAccessTokenCreate||u.customerAccessTokenCreate;if(p?.customerUserErrors?.length>0)return g.NextResponse.json({error:"Registration successful, but automatic login failed. Please log in manually."},{status:200});let{accessToken:d,expiresAt:m}=p.customerAccessToken,h=await (0,R.shopifyRequest)(R.CUSTOMER_QUERIES.customer,{customerAccessToken:d}),f=h.data?.customer||h.customer,y=g.NextResponse.json({success:!0,user:f,redirectTo:"/account"});return(await (0,E.cookies)()).set("shopify-customer-token",d,{httpOnly:!0,secure:!0,sameSite:"lax",expires:new Date(m),path:"/"}),y}catch(e){return console.error("Registration error:",e),g.NextResponse.json({error:"Registration failed. Please try again."},{status:500})}}var w=e.i(26170);let T=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/auth/register/route",pathname:"/api/auth/register",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/auth/register/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:A,workUnitAsyncStorage:S,serverHooks:v}=T;function C(){return(0,s.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:S})}async function k(e,t,s){var g;let E="/api/auth/register/route";E=E.replace(/\/index$/,"")||"/";let R=await T.prepare(e,t,{srcPage:E,multiZoneDraftMode:!1});if(!R)return t.statusCode=400,t.end("Bad Request"),null==s.waitUntil||s.waitUntil.call(s,Promise.resolve()),null;let{buildId:x,params:w,nextConfig:A,isDraftMode:S,prerenderManifest:v,routerServerContext:C,isOnDemandRevalidate:k,revalidateOnlyGenerated:b,resolvedPathname:$}=R,O=(0,a.normalizeAppPath)(E),N=!!(v.dynamicRoutes[O]||v.routes[$]);if(N&&!S){let e=!!v.routes[$],t=v.dynamicRoutes[O];if(t&&!1===t.fallback&&!e)throw new f.NoFallbackError}let P=null;!N||T.isDev||S||(P="/index"===(P=$)?"/":P);let I=!0===T.isDev||!N,j=N&&!I,U=e.method||"GET",_=(0,n.getTracer)(),q=_.getActiveScopeSpan(),D={params:w,prerenderManifest:v,renderOpts:{experimental:{cacheComponents:!!A.experimental.cacheComponents,authInterrupts:!!A.experimental.authInterrupts},supportsDynamicResponse:I,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(g=A.experimental)?void 0:g.cacheLife,isRevalidate:j,waitUntil:s.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s)=>T.onRequestError(e,t,s,C)},sharedContext:{buildId:x}},H=new i.NodeNextRequest(e),M=new i.NodeNextResponse(t),L=c.NextRequestAdapter.fromNodeNextRequest(H,(0,c.signalFromNodeResponse)(t));try{let a=async r=>T.handle(L,D).finally(()=>{if(!r)return;r.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let s=_.getRootSpanAttributes();if(!s)return;if(s.get("next.span_type")!==l.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${s.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=s.get("next.route");if(o){let e=`${U} ${o}`;r.setAttributes({"next.route":o,"http.route":o,"next.span_name":e}),r.updateName(e)}else r.updateName(`${U} ${e.url}`)}),i=async n=>{var i,c;let l=async({previousCacheEntry:r})=>{try{if(!(0,o.getRequestMeta)(e,"minimalMode")&&k&&b&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await a(n);e.fetchMetrics=D.renderOpts.fetchMetrics;let c=D.renderOpts.pendingWaitUntil;c&&s.waitUntil&&(s.waitUntil(c),c=void 0);let l=D.renderOpts.collectedTags;if(!N)return await (0,p.sendResponse)(H,M,i,D.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,d.toNodeOutgoingHttpHeaders)(i.headers);l&&(t[h.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==D.renderOpts.collectedRevalidate&&!(D.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&D.renderOpts.collectedRevalidate,s=void 0===D.renderOpts.collectedExpire||D.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:D.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==r?void 0:r.isStale)&&await T.onRequestError(e,t,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isRevalidate:j,isOnDemandRevalidate:k})},C),t}},f=await T.handleResponse({req:e,nextConfig:A,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:k,revalidateOnlyGenerated:b,responseGenerator:l,waitUntil:s.waitUntil});if(!N)return null;if((null==f||null==(i=f.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==f||null==(c=f.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,o.getRequestMeta)(e,"minimalMode")||t.setHeader("x-nextjs-cache",k?"REVALIDATED":f.isMiss?"MISS":f.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,d.fromNodeOutgoingHttpHeaders)(f.value.headers);return(0,o.getRequestMeta)(e,"minimalMode")&&N||g.delete(h.NEXT_CACHE_TAGS_HEADER),!f.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,m.getCacheControlHeader)(f.cacheControl)),await (0,p.sendResponse)(H,M,new Response(f.value.body,{headers:g,status:f.value.status||200})),null};q?await i(q):await _.withPropagatedContext(e.headers,()=>_.trace(l.BaseServerSpan.handleRequest,{spanName:`${U} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},i))}catch(t){if(t instanceof f.NoFallbackError||await T.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isRevalidate:j,isOnDemandRevalidate:k})}),N)throw t;return await (0,p.sendResponse)(H,M,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__531c559f._.js.map