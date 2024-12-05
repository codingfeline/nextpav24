'use client'

import { useEffect, useState } from 'react'
import { MdClear, MdDone } from 'react-icons/md'

const Antispam = ({ setPermission }) => {
  const [no1, setNo1] = useState('')
  const [check1, setCheck1] = useState(null)
  const [arr1, setArr1] = useState([])

  // const randomize = () => {
  //   rand1()
  // }

  // to run upon wrong click
  const randArray1 = () => setArr1(arr1.sort(() => 0.5 - Math.random()))

  const compare1 = a => {
    if (a === no1) {
      setCheck1(true)
      setTimeout(() => {
        setPermission(true)
      }, 1500)
    } else {
      rand1()
      randArray1()
      setCheck1(false)
      setTimeout(() => {
        setCheck1(null)
      }, 700)
    }
  }
  const rand1 = () => setNo1(Math.floor(Math.random() * 12 + 1))

  useEffect(() => {
    setArr1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].sort(() => 0.5 - Math.random()))

    rand1()
  }, [])

  return (
    <>
      <div
        className={`flex justify-center items-center w-full h-screen absolute top-0 right-0  `}
      >
        <div
          className={`bg-slate-200 p-4  w-full sm:w-3/4 transition-all delay-1000 rounded-lg shadow-xl border-8 border-slate-300 flex flex-col justify-center items-center ${
            check1 ? 'opacity-0' : 'opacity-100'
          }
         `}
        >
          <h3 className="flex flex-col items-cente w-80 ">
            <div className="text-lg">
              Click on <span className="val-a text-2xl">{no1}</span> below to proceed
            </div>
            <div className="flex items-center">
              <div className="choices">
                {arr1.map(a => (
                  <span
                    key={a}
                    className={`val-b 
                ${a === no1 ? 'hover:bg-green-400' : 'hover:bg-red-500'}
                `}
                    onClick={() => compare1(a)}
                  >
                    {a}
                  </span>
                ))}
              </div>
              <div className="border border-slate-300 p-2 rounded-lg">
                <MdDone
                  className={` text-5xl ${check1 ? 'text-green-500 ' : 'text-slate-300'}`}
                />
                <MdClear
                  className={` text-5xl
                ${check1 === false ? 'text-red-400' : 'text-slate-300'}`}
                />
              </div>
            </div>
          </h3>
        </div>
      </div>
      {/* <button onClick={randomize}>randomize</button> */}
    </>
  )
}

export default Antispam
