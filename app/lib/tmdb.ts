const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;
const LANG = 'ko-KR';

export const requests = {
  fetchNowPlaying: 'movie/now_playing',
  fetchNetflixOriginals: 'discover/tv?with_networks=213&',
  fetchTrending: 'trending/all/week',
  fetchTopRated: 'movie/top_rated',
  // TODO 장르별 API는 나중에 구현
  // fetchActionMovies: 'discover/movie?with_genres=28',
  // fetchComedyMovies: 'discover/movie?with_genres=35',
  // fetchHorrorMovies: 'discover/movie?with_genres=27',
  // fetchRomanceMovies: 'discover/movie?with_genres=10749',
  // fetchDocumentaries: 'discover/movie?with_genres=99',
  fetchGenre: 'genre/movie/list',
};

export async function get(endpoint: string, options: any | null = {}) {
  const url = `${BASE_URL}/${endpoint}${
    endpoint.includes('?') ? '&' : '?'
  }api_key=${API_KEY}&language=${LANG}`;

  const resOptions = {
    headers: {
      accept: 'application/json',
    },
    ...options,
  };

  const res = await fetch(url, {
    ...resOptions,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return res.json();
}
