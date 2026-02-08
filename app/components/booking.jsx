'use client'
import Reveal from './Reveal'

const Booking = () => {
  return (
    <Reveal delay="delay-1000">
      <div className="w-full sm:w-[500px] place-self-center m-3 ">
        <iframe
          src="https://svtables.com/widget/?rest_id=403"
          className="w-full sm:rounded-xl mt-2"
          height="680px"
        ></iframe>
      </div>
    </Reveal>
  )
}

export default Booking
