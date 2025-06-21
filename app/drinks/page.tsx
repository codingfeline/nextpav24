import Table3_col from '@/app/components/table_3_col'
import Table3col_1_price from '@/app/components/table_3col_1_price'
import prisma from '@/prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bangkok Pavilion | Drinks Menu',
  description: 'The drinks menu',
}

const Drinks = async () => {
  const menus = await prisma.allMenus.findMany()
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
  return (
    <>
      <div className="menusBox">
        <Table3_col menus={menus.filter(m => m.category === 'wine')} title="Wines" />
        {items.map(item => (
          <Table3col_1_price
            key={item.name}
            menus={menus.filter(m => m.category === item.name)}
            title={item.display}
          />
        ))}
      </div>
    </>
  )
}

// export const dynamic = 'force-dynamic'

export default Drinks
