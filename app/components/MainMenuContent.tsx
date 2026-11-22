import Table4col_1_price from '@/app/components/table_4col_1_price'
import prisma from '@/prisma/client'
import MainMenuEls from '../main-menu/MainMenuEls'
import RevealLoop from './RevealLoop'

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

// The main menu, shared by the /main-menu page and the new home's "Main Menu" circle.
export default async function MainMenuContent() {
  const menus = await prisma.allMenus.findMany()

  return (
    <div className=" menusBox">
      {items
        .map((item, index) => (
          <RevealLoop key={index} delay={index * 150}>
            <Table4col_1_price
              menus={menus.filter(m => m.category === item.name)}
              title={item.display}
              stackPriceMobile
            />
          </RevealLoop>
        ))
        .sort()}
      <MainMenuEls />
    </div>
  )
}
