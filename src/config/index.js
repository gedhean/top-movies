// API CONFIG
// export const IMG_BASE_URL = 'http://image.tmdb.org/t/p/'
export const IMG_BASE_URL_SEC = 'https://image.tmdb.org/t/p/'
export const IMG_BACKDROP_SIZE = ['w300', 'w780', 'w1280', 'original']
export const IMG_POST_SIZE = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original']
const config = {
  api: {
    post_base_url: (size = 1) => `${IMG_BASE_URL_SEC}/${IMG_POST_SIZE[size]}`,
    backdrop_base_url: (size = 1) => `${IMG_BASE_URL_SEC}/${IMG_BACKDROP_SIZE[size]}`
  }
}

export default config

// backdrop_sizes: (4) ["w300", "w780", "w1280", "original"]
// base_url: "http://image.tmdb.org/t/p/"
// logo_sizes: Array(7)
// 0: "w45"
// 1: "w92"
// 2: "w154"
// 3: "w185"
// 4: "w300"
// 5: "w500"
// 6: "original"
// poster_sizes: Array(7)
// 0: "w92"
// 1: "w154"
// 2: "w185"
// 3: "w342"
// 4: "w500"
// 5: "w780"
// 6: "original"
// profile_sizes: Array(4)
// 0: "w45"
// 1: "w185"
// 2: "h632"
// 3: "original"
// length: 4
// secure_base_url: "https://image.tmdb.org/t/p/"
// still_sizes: (4) ["w92", "w185", "w300", "original"]
