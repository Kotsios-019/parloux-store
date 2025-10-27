module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},22024,e=>{"use strict";e.s(["CUSTOMER_QUERIES",()=>C,"shopifyRequest",()=>N],22024);let t="GraphQL Client",r="An error occurred while fetching from the API. Review 'graphQLErrors' for details.",o="Response returned unexpected Content-Type:",s="An unknown error has occurred. The API did not return a data object or any errors in its response.",n={json:"application/json",multipart:"multipart/mixed"},a="X-SDK-Variant",i="X-SDK-Version",c=[429,503],u=/@(defer)\b/i,l=/boundary="?([^=";]+)"?/i,d="\r\n\r\n";function p(e,r=t){return e.startsWith(`${r}`)?e:`${r}: ${e}`}function m(e){return e instanceof Error?e.message:JSON.stringify(e)}function h(e){return e instanceof Error&&e.cause?e.cause:void 0}function f(e){return e.flatMap(({errors:e})=>e??[])}function y({client:e,retries:t}){if(void 0!==t&&("number"!=typeof t||t<0||t>3))throw Error(`${e}: The provided "retries" value (${t}) is invalid - it cannot be less than 0 or greater than 3`)}function g(e,t){return t&&("object"!=typeof t||Array.isArray(t)||"object"==typeof t&&Object.keys(t).length>0)?{[e]:t}:{}}function x([e,...t]){return t.reduce(function e(t,r){return Object.keys(r||{}).reduce((o,s)=>(("object"==typeof r[s]||Array.isArray(r[s]))&&t[s]?o[s]=e(t[s],r[s]):o[s]=r[s],o),Array.isArray(t)?[...t]:{...t})},{...e})}async function w(e){return new Promise(t=>setTimeout(t,e))}async function v(e){let{errors:t,data:o,extensions:n}=await e.json();return{...g("data",o),...g("extensions",n),headers:e.headers,...t||!o?{errors:{networkStatusCode:e.status,message:p(t?r:s),...g("graphQLErrors",t),response:e}}:{}}}async function*E(e){let t=new TextDecoder;if(e.body[Symbol.asyncIterator])for await(let r of e.body)yield t.decode(r);else{let r,o=e.body.getReader();try{for(;!(r=await o.read()).done;)yield t.decode(r.value)}finally{o.cancel()}}}function R({client:e,currentSupportedApiVersions:t,apiVersion:r,logger:o}){let s=`${e}: the provided apiVersion ("${r}")`,n=`Currently supported API versions: ${t.join(", ")}`;if(!r||"string"!=typeof r)throw Error(`${s} is invalid. ${n}`);let a=r.trim();t.includes(a)||(o?o({type:"Unsupported_Api_Version",content:{apiVersion:r,supportedApiVersions:t}}):console.warn(`${s} is likely deprecated or not supported. ${n}`))}function A(e){let t=3*e-2;return 10===t?t:`0${t}`}function T(e,t,r){let o=t-r;return o<=0?`${e-1}-${A(o+4)}`:`${e}-${A(o)}`}let S="application/json",b="Storefront API Client",k={shopDomain:process.env.SHOPIFY_SHOP_DOMAIN||"parloux-store-2.myshopify.com",storefrontAccessToken:process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN||"33b7d52840ee4b3bc693ba3b08a76cc4",apiVersion:"2024-01"},$=function({storeDomain:e,apiVersion:k,publicAccessToken:$,privateAccessToken:C,clientName:N,retries:O=0,customFetchApi:P,logger:j}){var I,U,q,D,_;let H=function(){let{year:e,quarter:t,version:r}=function(){let e=new Date,t=e.getUTCMonth(),r=e.getUTCFullYear(),o=Math.floor(t/3+1);return{year:r,quarter:o,version:`${r}-${A(o)}`}}(),o=4===t?`${e+1}-01`:`${e}-${A(t+1)}`;return[T(e,t,3),T(e,t,2),T(e,t,1),r,o,"unstable"]}(),M=function({client:e,storeDomain:t}){try{if(!t||"string"!=typeof t)throw Error();let e=t.trim(),r=e.match(/^https?:/)?e:`https://${e}`,o=new URL(r);return o.protocol="https",o.origin}catch(r){throw Error(`${e}: a valid store domain ("${t}") must be provided`,{cause:r})}}({client:b,storeDomain:e}),V={client:b,currentSupportedApiVersions:H,logger:j};if(R({...V,apiVersion:k}),!$&&!C)throw Error(`${b}: a public or private access token must be provided`);if($&&C)throw Error(`${b}: only provide either a public or private access token`);let L=(I=M,U=k,q=V,e=>{e&&R({...q,apiVersion:e});let t=(e??U).trim();return`${I}/api/${t}/graphql.json`}),K={storeDomain:M,apiVersion:k,...$?{publicAccessToken:$}:{privateAccessToken:C},headers:{"Content-Type":S,Accept:S,"X-SDK-Variant":"storefront-api-client","X-SDK-Version":"1.0.9",...N?{"X-SDK-Variant-Source":N}:{},...$?{"X-Shopify-Storefront-Access-Token":$}:{"Shopify-Storefront-Private-Token":C}},apiUrl:L(),clientName:N},F=function({headers:e,url:R,customFetchApi:A=fetch,retries:T=0,logger:S}){var b,k,$;y({client:t,retries:T});let C={headers:e,url:R,retries:T},N=function(e,{url:r,headers:o,retries:s}){return async(n,c={})=>{let{variables:u,headers:l,url:d,retries:p,keepalive:m,signal:h}=c,f=JSON.stringify({query:n,variables:u});y({client:t,retries:p});let g=Object.entries({...o,...l}).reduce((e,[t,r])=>(e[t]=Array.isArray(r)?r.join(", "):r.toString(),e),{});return g[a]||g[i]||(g[a]="shopify-graphql-client",g[i]="1.4.1"),e([d??r,{method:"POST",headers:g,body:f,signal:h,keepalive:m}],1,p??s)}}(function({clientLogger:e,customFetchApi:r=fetch,client:o=t,defaultRetryWaitTime:s=1e3,retriableCodes:n=c}){let a=async(t,i,c)=>{let u,l=i+1,d=c+1;try{if(u=await r(...t),e({type:"HTTP-Response",content:{requestParams:t,response:u}}),!u.ok&&n.includes(u.status)&&l<=d)throw Error();let o=u?.headers.get("X-Shopify-API-Deprecated-Reason")||"";return o&&e({type:"HTTP-Response-GraphQL-Deprecation-Notice",content:{requestParams:t,deprecationNotice:o}}),u}catch(r){if(l<=d){let r=u?.headers.get("Retry-After");return await w(r?parseInt(r,10):s),e({type:"HTTP-Retry",content:{requestParams:t,lastResponse:u,retryAttempt:i,maxRetries:c}}),a(t,l,c)}throw Error(p(`${c>0?`Attempted maximum number of ${c} network retries. Last message - `:""}${m(r)}`,o))}};return a}({customFetchApi:A,clientLogger:(b=S,e=>{b&&b(e)}),defaultRetryWaitTime:1e3}),C),O=(k=N,async(...e)=>{if(u.test(e[0]))throw Error(p("This operation will result in a streamable response - use requestStream() instead."));let t=null;try{let{status:r,statusText:s}=t=await k(...e),a=t.headers.get("content-type")||"";if(!t.ok)return{errors:{networkStatusCode:r,message:p(s),response:t}};if(!a.includes(n.json))return{errors:{networkStatusCode:r,message:p(`${o} ${a}`),response:t}};return await v(t)}catch(e){return{errors:{message:m(e),...null==t?{}:{networkStatusCode:t.status,response:t}}}}}),P=($=N,async(...e)=>{if(!u.test(e[0]))throw Error(p("This operation does not result in a streamable response - use request() instead."));try{let t=await $(...e),{statusText:a}=t;if(!t.ok)throw Error(a,{cause:t});let i=t.headers.get("content-type")||"";switch(!0){case i.includes(n.json):return{async *[Symbol.asyncIterator](){let e=await v(t);yield{...e,hasNext:!1}}};case i.includes(n.multipart):return function(e,t){let o,n=(t??"").match(l),a=`--${n?n[1]:"-"}`;if(!e.body?.getReader&&!e.body?.[Symbol.asyncIterator])throw Error("API multipart response did not return an iterable body",{cause:e});let i=E(e),c={};return{async *[Symbol.asyncIterator](){try{let e=!0;for await(let n of{async *[Symbol.asyncIterator](){try{let e="";for await(let t of i)if((e+=t).indexOf(a)>-1){let t=e.lastIndexOf(a),r=e.slice(0,t).split(a).filter(e=>e.trim().length>0).map(e=>e.slice(e.indexOf(d)+d.length).trim());r.length>0&&(yield r),e=e.slice(t+a.length),"--"===e.trim()&&(e="")}}catch(e){throw Error(`Error occured while processing stream payload - ${m(e)}`)}}}){let a=n.map(e=>{try{return JSON.parse(e)}catch(e){throw Error(`Error in parsing multipart response - ${m(e)}`)}}).map(e=>{let{data:t,incremental:r,hasNext:o,extensions:s,errors:n}=e;if(!r)return{data:t||{},...g("errors",n),...g("extensions",s),hasNext:o};let a=r.map(({data:e,path:t,errors:r})=>({data:e&&t?function e(t,r){if(0===t.length)return r;let o={[t.pop()]:r};return 0===t.length?o:e(t,o)}(t,e):{},...g("errors",r)}));return{data:1===a.length?a[0].data:x([...a.map(({data:e})=>e)]),...g("errors",f(a)),hasNext:o}});o=a.find(e=>e.extensions)?.extensions??o;let i=f(a);c=x([c,...a.map(({data:e})=>e)]),e=a.slice(-1)[0].hasNext;var t=c;if(i.length>0)throw Error(r,{cause:{graphQLErrors:i}});if(0===Object.keys(t).length)throw Error(s);yield{...g("data",c),...g("extensions",o),hasNext:e}}if(e)throw Error("Response stream terminated unexpectedly")}catch(r){let t=h(r);yield{...g("data",c),...g("extensions",o),errors:{message:p(m(r)),networkStatusCode:e.status,...g("graphQLErrors",t?.graphQLErrors),response:e},hasNext:!1}}}}}(t,i);default:throw Error(`${o} ${i}`,{cause:t})}}catch(e){return{async *[Symbol.asyncIterator](){let t=h(e);yield{errors:{message:p(m(e)),...g("networkStatusCode",t?.status),...g("response",t)},hasNext:!1}}}}});return{config:C,fetch:N,request:O,requestStream:P}}({headers:K.headers,url:K.apiUrl,retries:O,customFetchApi:P,logger:j}),X=e=>({...e??{},...K.headers}),Q=(D=K,_=L,e=>e?_(e):D.apiUrl),B=function({getHeaders:e,getApiUrl:t}){return(r,o)=>{let s=[r];if(o&&Object.keys(o).length>0){let{variables:r,apiVersion:n,headers:a,retries:i,signal:c}=o;s.push({...r?{variables:r}:{},...a?{headers:e(a)}:{},...n?{url:t(n)}:{},...i?{retries:i}:{},...c?{signal:c}:{}})}return s}}({getHeaders:X,getApiUrl:Q});return Object.freeze({config:K,getHeaders:X,getApiUrl:Q,fetch:(...e)=>F.fetch(...B(...e)),request:(...e)=>F.request(...B(...e)),requestStream:(...e)=>F.requestStream(...B(...e))})}({storeDomain:k.shopDomain,apiVersion:k.apiVersion,publicAccessToken:k.storefrontAccessToken});k.shopDomain,k.apiVersion;let C={customerAccessTokenCreate:`
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
  `};async function N(e,t={}){console.log("Shopify API Debug:"),console.log("Shop Domain:",k.shopDomain),console.log("Token:",`SET (${k.storefrontAccessToken.substring(0,8)}...)`);try{return await $.request(e,{variables:t})}catch(e){throw console.error("Shopify API Error:",e),Error(`Shopify API error: ${e.message}`)}}},4026,(e,t,r)=>{},38079,e=>{"use strict";e.s(["handler",()=>k,"patchFetch",()=>b,"routeModule",()=>R,"serverHooks",()=>S,"workAsyncStorage",()=>A,"workUnitAsyncStorage",()=>T],38079);var t=e.i(47909),r=e.i(74017),o=e.i(96250),s=e.i(59756),n=e.i(61916),a=e.i(69741),i=e.i(16795),c=e.i(87718),u=e.i(95169),l=e.i(47587),d=e.i(66012),p=e.i(70101),m=e.i(26937),h=e.i(10372),f=e.i(93695);e.i(52474);var y=e.i(220);e.s(["PUT",()=>v],88507);var g=e.i(89171),x=e.i(22024),w=e.i(93458);async function v(e){try{let t=(await (0,w.cookies)()).get("shopify-customer-token");if(!t)return g.NextResponse.json({error:"Not authenticated"},{status:401});let{firstName:r,lastName:o,phone:s,acceptsMarketing:n}=await e.json(),a=await (0,x.shopifyRequest)(x.CUSTOMER_QUERIES.customerUpdate,{customerAccessToken:t.value,customer:{firstName:r,lastName:o,phone:s||null,acceptsMarketing:n}}),i=a.data?.customerUpdate||a.customerUpdate;if(i.customerUserErrors.length>0){let e=i.customerUserErrors[0];return g.NextResponse.json({error:e.message},{status:400})}return g.NextResponse.json({success:!0,user:i.customer})}catch(e){return console.error("Profile update error:",e),g.NextResponse.json({error:"Profile update failed"},{status:500})}}var E=e.i(88507);let R=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/auth/profile/route",pathname:"/api/auth/profile",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/auth/profile/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:A,workUnitAsyncStorage:T,serverHooks:S}=R;function b(){return(0,o.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:T})}async function k(e,t,o){var g;let x="/api/auth/profile/route";x=x.replace(/\/index$/,"")||"/";let w=await R.prepare(e,t,{srcPage:x,multiZoneDraftMode:!1});if(!w)return t.statusCode=400,t.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:v,params:E,nextConfig:A,isDraftMode:T,prerenderManifest:S,routerServerContext:b,isOnDemandRevalidate:k,revalidateOnlyGenerated:$,resolvedPathname:C}=w,N=(0,a.normalizeAppPath)(x),O=!!(S.dynamicRoutes[N]||S.routes[C]);if(O&&!T){let e=!!S.routes[C],t=S.dynamicRoutes[N];if(t&&!1===t.fallback&&!e)throw new f.NoFallbackError}let P=null;!O||R.isDev||T||(P="/index"===(P=C)?"/":P);let j=!0===R.isDev||!O,I=O&&!j,U=e.method||"GET",q=(0,n.getTracer)(),D=q.getActiveScopeSpan(),_={params:E,prerenderManifest:S,renderOpts:{experimental:{cacheComponents:!!A.experimental.cacheComponents,authInterrupts:!!A.experimental.authInterrupts},supportsDynamicResponse:j,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(g=A.experimental)?void 0:g.cacheLife,isRevalidate:I,waitUntil:o.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,o)=>R.onRequestError(e,t,o,b)},sharedContext:{buildId:v}},H=new i.NodeNextRequest(e),M=new i.NodeNextResponse(t),V=c.NextRequestAdapter.fromNodeNextRequest(H,(0,c.signalFromNodeResponse)(t));try{let a=async r=>R.handle(V,_).finally(()=>{if(!r)return;r.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let o=q.getRootSpanAttributes();if(!o)return;if(o.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${o.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=o.get("next.route");if(s){let e=`${U} ${s}`;r.setAttributes({"next.route":s,"http.route":s,"next.span_name":e}),r.updateName(e)}else r.updateName(`${U} ${e.url}`)}),i=async n=>{var i,c;let u=async({previousCacheEntry:r})=>{try{if(!(0,s.getRequestMeta)(e,"minimalMode")&&k&&$&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await a(n);e.fetchMetrics=_.renderOpts.fetchMetrics;let c=_.renderOpts.pendingWaitUntil;c&&o.waitUntil&&(o.waitUntil(c),c=void 0);let u=_.renderOpts.collectedTags;if(!O)return await (0,d.sendResponse)(H,M,i,_.renderOpts.pendingWaitUntil),null;{let e=await i.blob(),t=(0,p.toNodeOutgoingHttpHeaders)(i.headers);u&&(t[h.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==_.renderOpts.collectedRevalidate&&!(_.renderOpts.collectedRevalidate>=h.INFINITE_CACHE)&&_.renderOpts.collectedRevalidate,o=void 0===_.renderOpts.collectedExpire||_.renderOpts.collectedExpire>=h.INFINITE_CACHE?void 0:_.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:o}}}}catch(t){throw(null==r?void 0:r.isStale)&&await R.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isRevalidate:I,isOnDemandRevalidate:k})},b),t}},f=await R.handleResponse({req:e,nextConfig:A,cacheKey:P,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:S,isRoutePPREnabled:!1,isOnDemandRevalidate:k,revalidateOnlyGenerated:$,responseGenerator:u,waitUntil:o.waitUntil});if(!O)return null;if((null==f||null==(i=f.value)?void 0:i.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==f||null==(c=f.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,s.getRequestMeta)(e,"minimalMode")||t.setHeader("x-nextjs-cache",k?"REVALIDATED":f.isMiss?"MISS":f.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let g=(0,p.fromNodeOutgoingHttpHeaders)(f.value.headers);return(0,s.getRequestMeta)(e,"minimalMode")&&O||g.delete(h.NEXT_CACHE_TAGS_HEADER),!f.cacheControl||t.getHeader("Cache-Control")||g.get("Cache-Control")||g.set("Cache-Control",(0,m.getCacheControlHeader)(f.cacheControl)),await (0,d.sendResponse)(H,M,new Response(f.value.body,{headers:g,status:f.value.status||200})),null};D?await i(D):await q.withPropagatedContext(e.headers,()=>q.trace(u.BaseServerSpan.handleRequest,{spanName:`${U} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},i))}catch(t){if(t instanceof f.NoFallbackError||await R.onRequestError(e,t,{routerKind:"App Router",routePath:N,routeType:"route",revalidateReason:(0,l.getRevalidateReason)({isRevalidate:I,isOnDemandRevalidate:k})}),O)throw t;return await (0,d.sendResponse)(H,M,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=%5Broot-of-the-server%5D__b924099d._.js.map