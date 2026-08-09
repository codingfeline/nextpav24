'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaBars, FaHome } from 'react-icons/fa'
import ThemeChooser from './ThemeChooser'

const Navbar = () => {
  const [hidden, setHidden] = useState(true)
  const toggleMenu = () => setHidden(!hidden)
  const collapse = () => setHidden(true)
  const pathname = usePathname()
  let home = ''

  useEffect(() => {
    window.addEventListener('scroll', collapse)
    window.addEventListener('resize', collapse)
  }, [])

  const links = [
    { to: '/', page: 'Home' },
    { to: '/main-menu', page: 'Main Menu' },
    { to: '/set-menus', page: 'set menus' },
    { to: '/drinks', page: 'drinks' },
    { to: '/locate-us', page: 'locate us' },
    { to: '/contact', page: 'contact' },
  ]
  {
    if (pathname === '/') home = <FaHome className="text-3xl" />
  }

  return (
    <>
      <nav className=" flex flex-col">
        <div className="bg-slate-100 md:hidden z-40 flex justify-center items-center">
          <FaBars
            className="text-5xl py-2  bg-gold text-white hover:cursor-pointer hover:text-black w-full border border-b-slate-400 transition-colors"
            onClick={toggleMenu}
          />
          <span className="absolute right-2 uppercase font-bold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.7)]">
            {/* {pathname} */}
            {pathname.replace('/', '').replace('-', ' ')}
            {home}
          </span>
        </div>
        <div
          className={`duration-200 md:static absolute bg-gold md:min-h-fit min-h-[100vh] left-0  md:w-auto  w-full flex items-center justify-center  z-50
      ${!hidden ? 'top-[0%]' : 'top-[-120%]'}
      `}
          onClick={collapse}
        >
          <ul className="flex flex-col justify-center items-center md:flex-row md:justify-around  bg-gold w-full h-full md:h-12">
            {links.map(link => {
              const isActive = pathname === link.to
              return (
                <li key={link.to} className="nav-li">
                  <Link
                    onClick={collapse}
                    href={link.to}
                    className={`nav-a
                    ${isActive ? 'bg-gold-dark text-white ' : 'hover:bg-gold-light'}
                  `}
                  >
                    {link.page.toUpperCase()}
                  </Link>
                </li>
              )
            })}
            <li
              className="md:hidden w-full flex justify-center py-6 bg-cream-400 text-brown"
              onClick={e => e.stopPropagation()}
            >
              <ThemeChooser />
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
