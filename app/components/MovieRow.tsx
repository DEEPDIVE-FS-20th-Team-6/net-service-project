import MovieRowClient from './MovieRowClient';
import { get, requests } from '@/lib/tmdb';

export default async function MovieRow({ title, fetchUrl }: { title: string; fetchUrl: string }) {
  const [data, genreData] = await Promise.all([
    get(fetchUrl),
    get(requests.fetchGenre, { next: { revalidate: 60 * 60 * 24 } }),
  ]);

  const genreMap = Object.fromEntries(genreData.genres.map((g: any) => [g.id, g.name]));

  return <MovieRowClient title={title} movies={data.results} genreMap={genreMap} />;
}
