module.exports=[77156,a=>{"use strict";a.s(["Eye",()=>b],77156);let b=(0,a.i(70106).default)("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},59612,a=>{"use strict";a.s(["default",()=>i]);var b=a.i(87924),c=a.i(76472),d=a.i(31067),e=a.i(71537),f=a.i(11642),g=a.i(72131),h=a.i(50944);function i({product:a,variant:i,size:j,color:k,className:l="",showText:m=!1}){let{toggleItem:n,isInWishlist:o,isLoading:p}=(0,e.useWishlist)(),{isAuthenticated:q}=(0,f.useAuth)(),r=(0,h.useRouter)(),[s,t]=(0,g.useState)(!1),u=o(a.id,i.id,j,k);return(0,b.jsxs)("button",{onClick:b=>{if(b.preventDefault(),b.stopPropagation(),!p){if(!q)return void r.push("/login");t(!0),n(a,i,j,k),setTimeout(()=>t(!1),300)}},disabled:p,className:`
        group relative flex items-center space-x-2 transition-all duration-300
        ${!q?"text-font-secondary dark:text-elegant-base hover:text-soft-gold":u?"text-red-500 hover:text-red-600":"text-font-secondary dark:text-elegant-base hover:text-red-500"}
        ${s?"scale-110":"scale-100"}
        ${p?"opacity-50 cursor-not-allowed":"cursor-pointer"}
        ${l}
      `,"aria-label":q?u?"Remove from wishlist":"Add to wishlist":"Login to add to wishlist",title:q?"":"Login required to add to wishlist",children:[q?(0,b.jsx)(c.Heart,{className:`
            w-5 h-5 transition-all duration-300
            ${u?"fill-current":""}
            ${s?"animate-pulse":""}
          `}):(0,b.jsx)(d.LogIn,{className:"w-5 h-5"}),m&&(0,b.jsx)("span",{className:"text-sm font-josefin",children:q?u?"Saved":"Save":"Login"})]})}}];

//# sourceMappingURL=_fcf8c205._.js.map