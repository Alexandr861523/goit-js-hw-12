import{a as L,i as c,S as b}from"./assets/vendor-6e0bf343.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))g(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const m of o.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&g(m)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const f=t=>t.map(e=>`<li class="img">
       <a class="gallery-link" href="${e.largeImageURL}">
         <img class="gallery-image" src= "${e.webformatURL}"
          data-source="${e.largeImageURL}"
           alt="${e.tags}"/>
           <ul class="description">
                  <li>
                  <p>Likes</p>
                  <p class="likes-one">${e.likes}</p>
                  </li>
                  <li>
                  <p>Views</p>
                  <p class="likes-one">${e.views}</p>
                  </li>
                  <li>
                  <p>Comments</p>
                  <p class="likes-one">${e.comments}</p>
                  </li>
                  <li>
                  <p>Downloads</p>
                  <p class="likes-one">${e.downloads}</p>
                  </li>
              </ul>
        </a>
      
     </li>`).join(""),w="43819074-06fd45097a02a2f47bb2a7010",S="https://pixabay.com/api/";async function y(t,e=1,r=15){return L.get(`${S}`,{params:{key:w,q:t,image_type:"photo",per_page:r,page:e,safesearch:!0,orientation:"horizontal"}})}const n=document.querySelector(".gallery"),k=document.querySelector(".js-search-form"),i=document.querySelector(".js-loader"),a=document.querySelector(".js-load-more");document.querySelector(".load-two");let d,l=1,u="",h=0;const p=15;async function v(t){if(t.preventDefault(),u=t.target.elements.searchKey.value.trim(),l=1,u===""){n.innerHTML="",t.target.reset(),c.show({message:"Input field can not be empty",messageColor:"black",close:!0,backgroundColor:"orange",timeout:3e3}),a.classList.add("is-hidden");return}n.innerHTML="",i.classList.remove("is-hidden"),a.classList.add("is-hidden");try{const{totalHits:e,data:r}=await y(u,l,p);if(r.total===0){t.target.reset(),i.classList.add("is-hidden"),c.show({message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"blue",close:!0,backgroundColor:"yellow",timeout:3e3});return}n.innerHTML=f(r.hits),h=Math.ceil(r.totalHits/p),console.log(h),d?d.refresh():d=new b(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}),l>=h?(a.classList.add("is-hidden"),c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"black",close:!0,backgroundColor:"orange",timeout:3e3})):a.classList.remove("is-hidden")}catch(e){console.log(e)}t.target.reset(),i.classList.add("is-hidden")}k.addEventListener("submit",v);a.addEventListener("click",async t=>{i.classList.remove("is-hidden"),l+=1,a.classList.add("is-hidden");try{const{totalHits:e,data:r}=await y(u,l,p);n.innerHTML+=f(r.hits),l>=h?(a.classList.add("is-hidden"),i.classList.add("is-hidden"),c.show({message:"We're sorry, but you've reached the end of search results.",messageColor:"black",close:!0,backgroundColor:"orange",timeout:3e3})):a.classList.remove("is-hidden"),C()}catch(e){console.log(e)}finally{i.classList.add("is-hidden")}d.refresh()});function C(){const t=n.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
