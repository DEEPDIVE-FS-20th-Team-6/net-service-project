const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "ko-KR";

export type TmdbMovie = {
    id: number;
    title?: string;
    name?: string;
    original_name?: string;
    overview?: string;
    backdrop_path?: string;
    poster_path?: string;
    genre_ids?: number[];
    popularity?: number;  
    vote_average?: number; 
    vote_count?: number;  
};

export type TmdbListResponse<T> = {
    results: T[];
    page?: number;
    total_pages?: number;
    total_results?: number;
};

export type TmdbGenre = {
    id: number;
    name: string;
};

export type TmdbGenreResponse = {
    genres: TmdbGenre[];
};

export const requests = {
    fetchNowPlaying: "movie/now_playing",
    fetchNetflixOriginals: "discover/tv?with_networks=213&",
    fetchTrending: "trending/all/week",
    fetchTopRated: "movie/top_rated",
    fetchGenre: "genre/movie/list",
};

export async function get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}/${endpoint}${
        endpoint.includes("?") ? "&" : "?"
    }api_key=${API_KEY || ""}&language=${LANG}`;

    try {
        const res = await fetch(url, {
            headers: { accept: "application/json" },
            ...options,
        });

        if (!res.ok) {
            console.error(`[TMDB API Error] ${endpoint}: ${res.statusText}`);
            return { results: [], genres: [] } as unknown as T;
        }

        return res.json();
    } catch (error) {
        console.error(`[TMDB Fetch Error] ${endpoint}:`, error);
        return { results: [], genres: [] } as unknown as T;
    }
}