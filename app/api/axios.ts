import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: apiKey,
    language: 'ko-KR',
  },
});

export default instance;
