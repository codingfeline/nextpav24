import { Metadata } from 'next'
import MapEmbed from './MapEmbed'

export const metadata: Metadata = {
  title: 'Our Location',
  description: 'Find us on the coast of East Kent',
}
const LocateUs = () => {
  return (
    // <div className="flex flex-col grow w-full">
    <div className="flex p-4 pt-8 w-full grow  ">
      <MapEmbed />
    </div>
    // </div>
  )
}

export default LocateUs
