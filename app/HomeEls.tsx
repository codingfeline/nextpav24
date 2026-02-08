'use client'
import Link from 'next/link'
import { GiMeal } from 'react-icons/gi'

import { Flex, Text } from '@radix-ui/themes'
import { FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import Reveal from './components/Reveal'

const HomeElIntro = () => {
  return (
    <Flex gap="1" className="flex flex-col gap-3 text-xl tracing-wide">
      <Reveal delay="delay-100">
        <Text as="p">
          Welcome to Bangkok Pavilion where the vibrant flavours of Thailand come to life.
          Immerse yourself in the rich culinary traditions of Thai cuisine, crafted with
          fresh ingredients, bold spices, and authentic recipes passed down through
          generations.
        </Text>
      </Reveal>
      <Reveal delay="delay-200">
        <Text as="p">
          From the comforting warmth of classic Pad Thai to the aromatic allure of Green
          Curry, every dish is a celebration of Thailand’s diverse and dynamic culture.
          Join us in the heart of Deal, Kent for a dining experience that’s as welcoming
          as it is delicious. Let us take your taste buds on a journey through the Land of
          Smiles!
        </Text>
      </Reveal>
      <Reveal delay="delay-300">
        <section className="relative flex justify-between flex-col sm:flex-row items-start gap-2">
          <div className="w-full justify-center flex flex-col items-center gap-3">
            <div className="flex text-3xl  ">
              Find us here
              <Link href="/locate-us">
                <FaMapMarkerAlt className="hover:text-orange-500" />
              </Link>
            </div>
            <div className="text-3xl flex ">
              to dine in &nbsp;
              <GiMeal className=" inline-block " />
            </div>
          </div>
          <div className="flex  justify-around items-center place-self-center w-full sm:w-[20px]  ">
            OR
          </div>
          <div className="takeaway w-full flex flex-col justify-center items-center">
            <div className="text-3xl mb-3">
              <a href="tel:01304367707">
                <FaPhone className="inline mr-2" />
                01304 367 707
              </a>
              <div className="text-base xs:flex  xs:justify-end sm:hidden">
                (click/tap to phone)
              </div>
            </div>
            <div className=" md:right-0 text-[#eb6e08] origin-bottom md:bottom-3 md:-rotate-6 font-bold">
              <div className=" font-[courier]">
                <div className="text-4xl">20% discount</div>
                <i className="text-xl">on take-aways £15 and above</i>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      <Reveal delay="delay-500">
        <aside
          itemScope
          itemType="http://schema.org/LocalBusiness"
          className="bg-[#e5cc96] my-3 p-2 rounded-lg w-[300px] flex flex-col justify-center items-center border border-[#e5cc96] text-lg place-self-center"
        >
          {/* <time itemprop="openingHours" datetime="Tu-Su 17:30-23:00" */}
          <span itemProp="openingHours" content="Tu,We,Th,Fr,Sa,Su 17:30-23:00">
            17:30-23:00 Tuesdays to Sundays
          </span>
          <div>Closed on Mondays</div>
        </aside>
      </Reveal>
    </Flex>
  )
}
export default HomeElIntro
