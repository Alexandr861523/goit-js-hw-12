import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { totalPages } from './pixabay-api';
import { refs, currentPage } from '../main';

function initializeLightbox() {
  return new SimpleLightbox('.image-card-link', {
    caption: true,
    captionSelector: 'img',
    captionType: 'attr',
    captionsData: 'alt',
    captionDelay: 250,
    captionPosition: 'bottom',
  });
}

function initializeIziToast() {
  iziToast.settings({
    timeout: 5000,
    titleColor: '#fff',
    position: 'topRight',
    messageColor: '#fff',
    icon: '',
    close: false,
  });
}

// Function: show notification
let notificationShown = false;

export function showNotification(message) {
  if (!notificationShown) {
    initializeIziToast();

    iziToast.error({
      message:
        message ||
        `Sorry, there are no images matching your search query. Please try again!`,
      class: 'error-notification',
      timeout: 5000,
      iconUrl: '/img/octagon.svg',
      titleColor: '#fff',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: '#fff',
      progressBarColor: '#B51B1B',
      close: true,
    });
  }
}

export function updateUi(arrayImages) {
  const gallery = document.querySelector('.gallery-list');
  const markup = arrayImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-card">
              <a href="${largeImageURL}" class="image-card-link"><img src="${webformatURL}" width="360" height="200" class="image-card-thumb" alt="${tags}">
                <ul class="image-card-details-list">
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Likes</p>
                      <p class="image-card-details-text">${likes}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Views</p>
                      <p class="image-card-details-text">${views}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Comments</p>
                      <p class="image-card-details-text">${comments}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Downloads</p>
                      <p class="image-card-details-text">${downloads}</p>
                  </li>
                </ul>
              </a>
          </li>`;
      }
    )
    .join('');

  gallery.innerHTML = markup;
  initializeLightbox().refresh();
}

export function updateNewUi(arrayImages) {
  const gallery = document.querySelector('.gallery-list');
  const markup = arrayImages
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="image-card">
              <a href="${largeImageURL}" class="image-card-link"><img src="${webformatURL}" width="360" height="200" class="image-card-thumb" alt="${tags}">
                <ul class="image-card-details-list">
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Likes</p>
                      <p class="image-card-details-text">${likes}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Views</p>
                      <p class="image-card-details-text">${views}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Comments</p>
                      <p class="image-card-details-text">${comments}</p>
                  </li>
                  <li class="image-card-details-list-item">
                      <p class="image-card-details-title">Downloads</p>
                      <p class="image-card-details-text">${downloads}</p>
                  </li>
                </ul>
              </a>
          </li>`;
      }
    )
    .join('');

  gallery.innerHTML += markup;
  initializeLightbox().refresh();
}

export function updateButtonUi() {
  if (currentPage >= totalPages) {
    refs.extensionButton.remove();
    iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
      class: 'error-notification',
      timeout: 5000,
      iconUrl: '/img/octagon.svg',
      titleColor: '#fff',
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: '#fff',
      progressBarColor: '#B51B1B',
      close: true,
    });
  }
}

export function getUserValue(event) {
  const button = document.querySelector('button');
  const value = event.target.value;

  if (value) {
    button.classList.remove('is-disable');
    button.removeAttribute('disabled');
    return value;
  } else {
    button.classList.add('is-disable');
    button.setAttribute('disabled', '');
    return '';
  }
}

export function showLoader(status) {
  const loader = document.querySelector('.loader');
  loader.classList.toggle('is-active', status);
}