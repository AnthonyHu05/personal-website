'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link 
          href="/" 
          className={pathname === '/' ? 'nav-link active' : 'nav-link'}
        >
          Home
        </Link>
        <Link 
          href="/experience" 
          className={pathname === '/experience' ? 'nav-link active' : 'nav-link'}
        >
          Experience
        </Link>
        <Link 
          href="/project" 
          className={pathname === '/project' ? 'nav-link active' : 'nav-link'}
        >
          Projects
        </Link>
      </div>
    </nav>
  );
}