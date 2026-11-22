import Table3_col from '@/app/components/table_3_col'
import Table3col_1_price from '@/app/components/table_3col_1_price'
import prisma from '@/prisma/client'
import Reveal from './Reveal'
import RevealLoop from './RevealLoop'

const items = [
  //prettier-ignore
  {name: 'aperitifs', display: 'Aperitifs'},
  { name: 'brandy', display: 'Brandy' },
  { name: 'ports', display: 'Ports' },
  { name: 'liqueurs', display: 'Liqueurs' },
  { name: 'spirits', display: 'Spirits' },
  { name: 'lager', display: 'Lager' },
  { name: 'soft-drinks', display: 'Soft Drinks' },
  { name: 'water', display: 'Mineral Water' },
]

// The drinks menu, shared by the /drinks page and the new home's "Drinks" circle.
export default async function DrinksContent() {
  const menus = await prisma.allMenus.findMany()

  return (
    <div className="menusBox">
      <Reveal delay="delay-100">
        <Table3_col menus={menus.filter(m => m.category === 'wine')} title="Wines" />
      </Reveal>
      {items.map((item, index) => (
        <RevealLoop key={item.name} delay={index * 150}>
          <Table3col_1_price
            menus={menus.filter(m => m.category === item.name)}
            title={item.display}
          />
        </RevealLoop>
      ))}
    </div>
  )
}
