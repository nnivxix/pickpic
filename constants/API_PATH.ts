const isDev = import.meta.dev;

const API_PATH = {
    SEARCH_PHOTOS: isDev ? "/search-photos" : "/search/photos",
    RANDOM_PHOTO: isDev ? "/random-photo" : "/random/photo",
} as const;

export default API_PATH;
