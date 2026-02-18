"use client";

import { Info, Play } from "lucide-react";
import type { TmdbMovie } from "@/lib/tmdb";

function truncate(str?: string, n = 120) {
	if (!str) return "";
	return str.length > n ? `${str.slice(0, n - 1)}…` : str;
}

export default function HeroClient({ movie }: { movie: TmdbMovie }) {
	return (
		<section className="relative w-full aspect-video max-h-[90vh] text-white overflow-hidden">
			<div
				className="absolute inset-0 bg-cover bg-center"
				style={{
					backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
				}}
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-30% to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent via-50% to-transparent" />

			<div className="absolute bottom-[22%] sm:bottom-[24%] md:bottom-[28%] left-0 px-12 md:px-16 z-10">
				<div className="max-w-lg">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
						{movie.title || movie.name || movie.original_name}
					</h1>
					<p className="mt-3 text-sm md:text-base text-gray-200 line-clamp-3 drop-shadow">
						{truncate(movie.overview, 150)}
					</p>
					<div className="flex gap-3 mt-5">
						<button
							type="button"
							className="inline-flex items-center gap-2 rounded px-5 py-2 bg-white text-black font-semibold hover:bg-white/80 transition text-sm md:text-base"
						>
							<Play size={20} fill="black" />
							재생
						</button>
						<button
							type="button"
							className="inline-flex items-center gap-2 rounded px-5 py-2 bg-gray-500/70 text-white font-semibold hover:bg-gray-500/50 transition text-sm md:text-base"
						>
							<Info size={20} />
							상세 정보
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
