import type {
	TmdbGenreResponse,
	TmdbListResponse,
	TmdbMovie,
} from "@/lib/tmdb";
import { get, requests } from "@/lib/tmdb";
import MovieRowClient from "./MovieRowClient";

export default async function MovieRow({
	title,
	fetchUrl,
}: {
	title: string;
	fetchUrl: string;
}) {
	const [data, genreData] = await Promise.all([
		get<TmdbListResponse<TmdbMovie>>(fetchUrl),
		get<TmdbGenreResponse>(requests.fetchGenre, {
			next: { revalidate: 60 * 60 * 24 },
		}),
	]);

	const genreMap = genreData.genres.reduce<Record<number, string>>(
		(acc, genre) => {
			acc[genre.id] = genre.name;
			return acc;
		},
		{},
	);

	return (
		<MovieRowClient title={title} movies={data.results} genreMap={genreMap} />
	);
}
