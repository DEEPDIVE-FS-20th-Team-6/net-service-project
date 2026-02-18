import { getNowPlaying } from '@/lib/tmdb';
import NavbarClient from './NavBarClient';

export default async function Navbar() {
  const data = await getNowPlaying();
  return <NavbarClient movies={data.results} />;
}
