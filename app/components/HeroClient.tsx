'use client';

import { Info, Play } from 'lucide-react';

function truncate(str?: string, n = 120) {
  if (!str) return '';
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function HeroClient({ movie }: { movie: any }) {
  return (
    <section
      className='relative w-full aspect-video text-white pb-32 pl-24'
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
      }}>
      {/* 콘텐츠 */}
      <div className='relative z-10 h-full  max-w-md'>
        <div className='relative  flex h-full items-end '>
          <div>
            <h1 className='text-5xl font-bold'>
              {movie.title || movie.name || movie.original_name}
            </h1>
            <p className='mt-4 text-sm md:text-base text-gray-200'>
              {truncate(movie.overview, 120)}
            </p>
          </div>
        </div>
        <div className='flex gap-3 pt-6'>
          <button className='inline-flex rounded-sm px-6 py-2 bg-white text-black hover:bg-gray-300 transition'>
            <Play size={24} fill='black' className='inline mr-2' />
            재생
          </button>
          <button className='inline-flex rounded-sm px-6 py-2 bg-gray-400 text-white '>
            <Info size={24} className='inline mr-2' />
            상세 정보
          </button>
        </div>
      </div>
    </section>
  );
}
