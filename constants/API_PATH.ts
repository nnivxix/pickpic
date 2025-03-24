const isDev = import.meta.dev;

const API_PATH = {
    SEARCH_PHOTOS: "/search/photos",
    RANDOM_PHOTO: "/random/photo",
    PHOTOS: "/photos",
    GET_PHOTO: "/photos/:id",
} as const;

export default API_PATH;
