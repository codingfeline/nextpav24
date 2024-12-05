'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'

const Navbar = () => {
  const [hidden, setHidden] = useState(true)
  const toggleMenu = () => setHidden(!hidden)
  const collapse = () => setHidden(true)
  const pathname = usePathname()

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
    { to: '/contact-us', page: 'contact us' },
  ]

  return (
    <>
      <nav className=" flex flex-col">
        <div className="bg-slate-100 md:hidden z-40 flex justify-center ">
          <FaBars
            className="text-5xl  bg-blue-200 text-slate-600 hover:cursor-pointer hover:text-slate-800 w-full border border-b-slate-400"
            onClick={toggleMenu}
          />
          <span className=" text-center absolute right-2 top-2 uppercase">
            {/* {pathname.replace('/', '').replace('-', ' ')} */}
          </span>
        </div>
        <div
          className={`duration-200 md:static absolute bg-blue-100 md:min-h-fit min-h-[100vh] left-0  md:w-auto  w-full flex items-center justify-center  z-50 
      ${!hidden ? 'top-[0%]' : 'top-[-120%]'}
      `}
          onClick={collapse}
        >
          <ul className="flex flex-col justify-center items-center md:flex-row md:justify-around  bg-indigo-200 w-full h-full md:h-12">
            {links.map(link => {
              const isActive = pathname === link.to
              return (
                <li key={link.to} className="nav-li">
                  <Link
                    onClick={collapse}
                    href={link.to}
                    className={`nav-a 
                    ${isActive ? 'bg-slate-200 hover:bg-slate-100' : 'hover:bg-blue-300'}
                  `}
                  >
                    {link.page.toUpperCase()}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
