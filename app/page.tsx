import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';

const sampleMovies = [
  { id: 1, title: 'Movie 1', image: 'https://picsum.photos/200/300?1' },
  { id: 2, title: 'Movie 2', image: 'https://picsum.photos/200/300?2' },
  { id: 3, title: 'Movie 3', image: 'https://picsum.photos/200/300?3' },
];

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className='mt-[-100px] relative z-10'>
        <MovieRow title='인기 콘텐츠' movies={sampleMovies} />
        <MovieRow title='추천 콘텐츠' movies={sampleMovies} />
        <MovieRow title='신작 콘텐츠' movies={sampleMovies} />
      </div>
    </div>
  );
}
