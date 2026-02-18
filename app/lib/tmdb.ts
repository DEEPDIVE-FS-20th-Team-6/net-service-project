const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const options = {
  headers: {
    accept: 'application/json',
  },
};

export async function getNowPlaying() {
  const endpoint = '/movie/now_playing';
  const res = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=ko-KR`, {
    ...options,
  });

  if (!res.ok) {
    throw new Error('Failed to fetch now playing movies');
  }

  return res.json();
}
