import axios from "axios";

const API_KEY = '43819074-06fd45097a02a2f47bb2a7010';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPhotosByQuery(searchQuery, page = 1, perPage = 15) {
    return axios.get(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            q: searchQuery,
            image_type: 'photo',
            per_page: perPage,
            page: page,
            safesearch: true,
            orientation: 'horizontal'
        }
    });
}