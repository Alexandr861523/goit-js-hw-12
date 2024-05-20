import axios from 'axios';

export let limit = 10;
export let page = 1;
export const totalPages = Math.ceil(100 / limit);

export async function fetchImageData(searchRequest, page) {
  const urlOptions = {
    http: 'https://pixabay.com/api/',
    key: '43793393-3131be18ae161d81d2e9721c8',
    options: 'image_type=photo&orientation=horizontal&safesearch=true',
  };

  const params = {
    key: urlOptions.key,
    q: searchRequest,
    per_page: limit,
    page: page,
    ...Object.fromEntries(new URLSearchParams(urlOptions.options)),
  };

  try {
    const response = await axios.get(urlOptions.http, { params });

    if (response.status !== 200) {
      throw new Error('Network response was not ok.');
    }

    const { data } = response;
    const images = data.hits;
    return images;
  } catch (error) {
    console.error('Error fetching image data:', error);
    throw error;
  }
}