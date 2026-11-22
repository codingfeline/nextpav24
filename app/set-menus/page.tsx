import { Metadata } from 'next'
import SetMenusContent from '../components/SetMenusContent'

export const metadata: Metadata = {
  title: 'Set Menus',
  description: 'The set menus',
}

const SetMenus = async () => {
  return <SetMenusContent />
}

// export const dynamic = 'force-dynamic'

export default SetMenus
