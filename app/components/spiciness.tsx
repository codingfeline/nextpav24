// import parse from 'html-react-parser'

import { GiChiliPepper } from 'react-icons/gi'
import reactStringReplace from 'react-string-replace'

const Spiciness = () => {
  const levels = ['* Mild', '** Medium', '*** Hot']

  return (
    <div className="text-red-600  w-full p-2 gap-7 flex bg-black flex_center">
      {/* * Mild, ** Medium, *** Hot */}
      {levels.map((level, i) => {
        const parsed = reactStringReplace(level, '*', () => <GiChiliPepper />)
        return (
          <span className=" flex " key={i}>
            {parsed}
          </span>
        )
      })}
    </div>
  )
}

export default Spiciness
