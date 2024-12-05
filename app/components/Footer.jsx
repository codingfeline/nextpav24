import { FaMap } from 'react-icons/fa'
import Link from './Link'

const Footer = () => {
  return (
    <footer
      className="bg-slate-100 p-5  flex flex-col items-center sm:flex-row
    justify-between"
    >
      <span>&copy;{` ${new Date().getFullYear()}`} Bangkok Pavilion</span>
      <FaMap className="text-lg " />
      <Link href="/locate-us" className="flex gap-2">
        <address>114 HIGH STREET CT14 6BB, DEAL, KENT, UK</address>
      </Link>
    </footer>
  )
}

export default Footer
