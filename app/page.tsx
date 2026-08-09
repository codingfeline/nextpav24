import Booking from './components/booking'
import HomeElIntro from './HomeEls'

export default async function Home() {
  return (
    <>
      <div className=" opacity-90 flex flex-col w-full">
        <div className="mt-8 mb-3 bg-cream-200 border-cream-700 border p-2 sm:rounded-lg shadow-lg w-full sm:w-6/7">
          <div className="flex flex-col justify-between gap-6 p-4 text-brown tracking-wider">
            <h1>Authentic Thai Cuisine</h1>
            {/* <Text size="5">
              Thailand, the land of smiles and its unique cuisine is the Buddhist land in
              South East Asia, the country which is formerly known as Siam has been
              renamed Thailand since 1939 in the era of King Rama VIII. Thailand means the
              land of freedom.
            </Text> */}
            <HomeElIntro />
          </div>
        </div>
        {/* style="width:100%;height:700px" */}
        <Booking />
      </div>
    </>
  )
}
