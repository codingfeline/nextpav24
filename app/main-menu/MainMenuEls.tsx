'use client'
import Reveal from '../components/Reveal'
import PriceChange from '../components/price-change'
import Spiciness from '../components/spiciness'

const MainMenuEls = () => {
  return (
    <>
      <Reveal delay="delay-100">
        <Spiciness />
      </Reveal>
      <Reveal delay="delay-200">
        <PriceChange />
      </Reveal>
    </>
  )
}

export default MainMenuEls
