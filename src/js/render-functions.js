export const createGalleryItemMarkup = (images) => {
    
   
  return images.map((image) => {
      
      return `<li class="img">
       <a class="gallery-link" href="${image.largeImageURL}">
         <img class="gallery-image" src= "${image.webformatURL}"
          data-source="${image.largeImageURL}"
           alt="${image.tags}"/>
           <ul class="description">
                  <li>
                  <p>Likes</p>
                  <p class="likes-one">${image.likes}</p>
                  </li>
                  <li>
                  <p>Views</p>
                  <p class="likes-one">${image.views}</p>
                  </li>
                  <li>
                  <p>Comments</p>
                  <p class="likes-one">${image.comments}</p>
                  </li>
                  <li>
                  <p>Downloads</p>
                  <p class="likes-one">${image.downloads}</p>
                  </li>
              </ul>
        </a>
      
     </li>`
   }).join('');
  
    
}