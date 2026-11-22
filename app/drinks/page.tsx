import { Metadata } from 'next'
import DrinksContent from '../components/DrinksContent'

export const metadata: Metadata = {
  title: 'Bangkok Pavilion | Drinks Menu',
  description: 'The drinks menu',
}

const Drinks = async () => {
  return <DrinksContent />
}

// export const dynamic = 'force-dynamic'

export default Drinks
