import type { TmdbListResponse, TmdbMovie } from "@/lib/tmdb";
import { get, requests } from "@/lib/tmdb";
import HeroClient from "./HeroClient";

const getRandomMovie = async () => {
	const data = await get<TmdbListResponse<TmdbMovie>>(requests.fetchNowPlaying);
	const candidates = data.results.filter((movie) => movie.backdrop_path);
	return candidates[Math.floor(Math.random() * candidates.length)];
};

export default async function Hero() {
	const movie = await getRandomMovie();

	return <HeroClient movie={movie} />;
}
