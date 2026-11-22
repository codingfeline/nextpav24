import { Metadata } from 'next'
import MainMenuContent from '../components/MainMenuContent'

export const metadata: Metadata = {
  title: 'Bangkok Pavilion | Main Menu',
  description: 'All the menus',
}

const MainMenu = async () => {
  return <MainMenuContent />
}

// export const dynamic = 'force-dynamic'

export default MainMenu
