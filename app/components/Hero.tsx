import { get, requests } from '@/lib/tmdb';
import HeroClient from './HeroClient';

const getRandomMovie = async () => {
  const data = await get(requests.fetchNowPlaying);
  const candidates = data.results.filter((m: any) => m.backdrop_path);
  return candidates[Math.floor(Math.random() * candidates.length)];
};

export default async function Hero() {
  const movie = await getRandomMovie();

  return <HeroClient movie={movie} />;
}
