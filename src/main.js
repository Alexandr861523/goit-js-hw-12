import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";



 import { createGalleryItemMarkup } from "./js/render-functions";
 import { fetchPhotosByQuery } from "./js/pixabay-api";

 const galleryEl = document.querySelector('.gallery');
 const searchForm = document.querySelector('.js-search-form');
 const loader = document.querySelector('.js-loader');
 const searchLoadMore = document.querySelector('.js-load-more');
 const loadMore = document.querySelector('.load-two');
 
 let lightbox;
 let currentPage = 1;
 let searchQuery = '';
 let totalPages = 0;
 const perPage = 15;


  

async function onSearchFormSubmit (event) {
    event.preventDefault();
     searchQuery = event.target.elements.searchKey.value.trim();
    currentPage = 1
  
    if (searchQuery === "") {
        
        galleryEl.innerHTML = '';
        event.target.reset();
        iziToast.show({
            
            message: 'Input field can not be empty',
            messageColor: 'black',
            close: true,
            backgroundColor: 'orange',
            timeout: 3000,
        });
        searchLoadMore.classList.add('is-hidden');
        return;
    }
    galleryEl.innerHTML = '';
    loader.classList.remove('is-hidden');
    searchLoadMore.classList.add('is-hidden');
    

    

    try {

         const { totalHits, data } = await fetchPhotosByQuery(searchQuery, currentPage, perPage);
               if (data.total === 0) {
                event.target.reset();
                loader.classList.add('is-hidden');
                iziToast.show({
                
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    messageColor: 'blue',
                    close: true,
                    backgroundColor: 'yellow',
                    timeout: 3000,
                });
                
                return;
            }
            
            galleryEl.innerHTML = createGalleryItemMarkup(data.hits);
            totalPages = Math.ceil(data.totalHits / perPage);
            console.log(totalPages);
            

            if (!lightbox) {
                lightbox = new SimpleLightbox('.gallery a', {
                    captionsData: 'alt',
                    captionPosition: 'bottom',
                    captionDelay: 250
                });
            } else {
                lightbox.refresh();
            } 

            if (currentPage >= totalPages) {
                 searchLoadMore.classList.add('is-hidden'); 
                 iziToast.show({
                    message: "We're sorry, but you've reached the end of search results.",
                    messageColor: 'black',
                    close: true,
                    backgroundColor: 'orange',
                    timeout: 3000,
                });
             } else {
                 searchLoadMore.classList.remove('is-hidden'); 
             }

           

            
            
    }  catch (error) {
        console.log(error);
      }
      event.target.reset();
      loader.classList.add('is-hidden');
    }
    
   
searchForm.addEventListener("submit", onSearchFormSubmit);

searchLoadMore.addEventListener("click", async event => {
    loader.classList.remove('is-hidden');
    currentPage += 1;
    searchLoadMore.classList.add('is-hidden');
    
   
     try {
          const { totalHits, data }  = await fetchPhotosByQuery(searchQuery, currentPage, perPage);
          galleryEl.innerHTML += createGalleryItemMarkup(data.hits);
          if (currentPage >= totalPages) {
            searchLoadMore.classList.add('is-hidden');
            loader.classList.add('is-hidden');
            iziToast.show({
                message: "We're sorry, but you've reached the end of search results.",
                messageColor: 'black',
                close: true,
                backgroundColor: 'orange',
                timeout: 3000,
            });
        } else {
            searchLoadMore.classList.remove('is-hidden');
            
        }
         smoothScroll(); 
      
    } catch (error) {
       console.log(error);
    }finally {
        loader.classList.add('is-hidden');
        
    }
     lightbox.refresh();
   });

    function smoothScroll() {
     const cardHeight = galleryEl.firstElementChild.getBoundingClientRect().height;
     window.scrollBy({
         top: cardHeight * 2,
         left: 0,
         behavior: 'smooth',
     });
  }