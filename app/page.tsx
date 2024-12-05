import { Text } from '@radix-ui/themes'
import { FaPhone } from 'react-icons/fa'
import Booking from './components/booking'

export default async function Home() {
  return (
    <>
      <div className=" p-3 opacity-90 flex flex-col w-full">
        <div className="my-3 bg-[#c3e9c3ef] border-[#599c59] border p-2 rounded-lg ">
          <h1>Authentic Thai Cuisine</h1>
          <div className="flex flex-col justify-between gap-6">
            <Text size="5">
              Thailand, the land of smiles and its unique cuisine is the Buddhist land in
              South East Asia, the country which is formerly known as Siam has been
              renamed Thailand since 1939 in the era of King Rama VIII. Thailand means the
              land of freedom.
            </Text>
            <section className="relative">
              <h2>DINE-IN OR TAKE AWAY</h2>
              <div className="sm:absolute sm:right-0 text-orange-500 origin-bottom sm:bottom-3 sm:-rotate-6 font-bold">
                <div className="text-4xl">20% discount</div>
                <i>on all take-aways</i>
              </div>
              <p className="text-3xl mb-3">
                <a href="tel:01304367707">
                  <FaPhone className="inline mr-2" />
                  01304 367 707
                </a>
                <span className="text-base">(click/tap to phone)</span>
              </p>
            </section>
          </div>
        </div>
        <aside
          itemScope
          itemType="http://schema.org/LocalBusiness"
          className="bg-[#beecbee7] p-2 rounded-lg w-[300px] flex flex-col justify-center items-center border border-[#599c59] text-lg place-self-center"
        >
          {/* <time itemprop="openingHours" datetime="Tu-Su 17:30-23:00" */}
          <span itemProp="openingHours" content="Tu,We,Th,Fr,Sa,Su 17:30-23:00">
            17:30-23:00 Tuesdays to Sundays
          </span>
          <div>Closed on Mondays</div>
        </aside>
        {/* style="width:100%;height:700px" */}
        <Booking />
      </div>
    </>
  )
}
