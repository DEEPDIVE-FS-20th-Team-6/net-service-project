import Hero from "@/components/Hero";
import MovieRow from "@/components/MovieRow";
import Navbar from "@/components/Navbar";
import { requests } from "@/lib/tmdb";

export default function Home() {
	return (
		<div className="bg-black min-h-screen">
			<Navbar />
			<Hero />
			<div className="relative z-20 -mt-16 md:-mt-24 space-y-6 pb-16">
				<MovieRow title="인기 콘텐츠" fetchUrl={requests.fetchNowPlaying} />
				<MovieRow
					title="넷플릭스 오리지널"
					fetchUrl={requests.fetchNetflixOriginals}
				/>
				<MovieRow title="지금 뜨는 콘텐츠" fetchUrl={requests.fetchTrending} />
			</div>
		</div>
	);
}
