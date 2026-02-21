import type { TmdbListResponse, TmdbMovie } from "@/lib/tmdb";
import { get, requests } from "@/lib/tmdb";
import HeroClient from "./HeroClient";

export const dynamic = "force-dynamic"; 

const getRandomMovie = async (): Promise<TmdbMovie | null> => {
    try {
        const data = await get<TmdbListResponse<TmdbMovie>>(requests.fetchNowPlaying);
        
        if (!data?.results || data.results.length === 0) {
            return null;
        }

        const candidates = data.results.filter((movie) => movie.backdrop_path);
        
        if (candidates.length === 0) {
            return data.results[0] || null;
        }

        const randomIndex = Math.floor(Math.random() * candidates.length);
        return candidates[randomIndex];
    } catch (error) {
        console.error("Hero 데이터를 가져오는 중 오류 발생:", error);
        return null;
    }
};

export default async function Hero() {
    const movie = await getRandomMovie();

    if (!movie) {
            return <div className="h-[50vh] bg-black" />;
        }

    return <HeroClient movie={movie} />;
}