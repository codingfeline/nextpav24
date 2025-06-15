import Table4col_1_price from '@/app/components/table_4col_1_price'
import prisma from '@/prisma/client'
import { Metadata } from 'next'
import PriceChange from '../components/price-change'
import Spiciness from '../components/spiciness'

export const metadata: Metadata = {
  title: 'Bangkok Pavilion | Main Menu',
  description: 'All the menus',
}

const MainMenu = async () => {
  const menus = await prisma.allMenus.findMany()
  // const sortedMenus =
  const items = [
    //prettier-ignore
    { name: 'starters', display: 'Starters'},
    { name: 'soups', display: 'Soups' },
    { name: 'chicken_duck', display: 'Chicken and Duck' },
    { name: 'pork', display: 'Pork' },
    { name: 'pork_ribs', display: 'Pork Ribs' },
    { name: 'beef', display: 'Beef' },
    { name: 'seafood', display: 'Seafood' },
    { name: 'curry', display: 'Curry' },
    { name: 'salad', display: 'Salad' },
    { name: 'vegetables', display: 'Vegetables' },
    { name: 'rice', display: 'Rice' },
    { name: 'noodles', display: 'Noodles' },
  ]
  return (
    <>
      <div className=" menusBox">
        {items
          .map((item, index) => (
            <Table4col_1_price
              key={index}
              menus={menus.filter(m => m.category === item.name)}
              title={item.display}
            />
          ))
          .sort()}
        <Spiciness />
        <PriceChange />
      </div>
    </>
  )
}

export default MainMenu
