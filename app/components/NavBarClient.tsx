'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Bell, Search } from 'lucide-react';

export default function NavbarClient({ movies }: { movies: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      {/* ${
        scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/80 to-transparent'
      } */}
      <div className='flex items-center justify-between px-6 md:px-12 py-4'>
        {/* 왼쪽 */}
        <div className='flex items-center gap-6'>
          <Image
            src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
            alt='Netflix'
            width={100}
            height={40}
            style={{
              width: '80px',
              height: '36px',
            }}
            className='cursor-pointer'
          />

          <nav className='hidden md:flex gap-6 text-sm text-gray-300'>
            <a className='hover:text-white transition'>홈</a>
            <a className='hover:text-white transition'>시리즈</a>
            <a className='hover:text-white transition'>영화</a>
            <a className='hover:text-white transition'>NEW! 요즘 대세</a>
            <a className='hover:text-white transition'>내가 찜한 리스트</a>
          </nav>
        </div>

        {/* 오른쪽 */}
        <div className='flex items-center gap-5 text-gray-300 relative'>
          <Search className='w-5 h-5 cursor-pointer hover:text-white' />
          <span className='hidden md:block cursor-pointer hover:text-white'>키즈</span>
          <Bell className='w-5 h-5 cursor-pointer hover:text-white' />

          {/* 프로필 */}
          <div className='relative'>
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className='w-8 h-8 bg-blue-500 rounded cursor-pointer'></div>

            {profileOpen && (
              <div className='absolute right-0 mt-3 w-40 bg-black/90 backdrop-blur-md rounded shadow-lg p-3 text-sm'>
                <p className='hover:text-white cursor-pointer'>프로필 관리</p>
                <p className='hover:text-white cursor-pointer mt-2'>계정 설정</p>
                <p className='hover:text-white cursor-pointer mt-2'>로그아웃</p>
              </div>
            )}
          </div>

          {/* 모바일 버튼 */}
          <div className='md:hidden'>
            {mobileOpen ? (
              <X onClick={() => setMobileOpen(false)} />
            ) : (
              <Menu onClick={() => setMobileOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className='md:hidden bg-black/95 px-6 pb-4 text-gray-300 space-y-3'>
          <p className='hover:text-white cursor-pointer'>홈</p>
          <p className='hover:text-white cursor-pointer'>시리즈</p>
          <p className='hover:text-white cursor-pointer'>영화</p>
          <p className='hover:text-white cursor-pointer'>내가 찜한 리스트</p>
        </div>
      )}
    </header>
  );
}
