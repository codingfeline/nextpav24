import Table2_col from '@/app/components/table_2_col'
import Table4col_1_price_per_person from '@/app/components/table_4col_1_price_per_person'
import Table4col_2_price from '@/app/components/table_4col_2_price'
import prisma from '@/prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set Menus',
  description: 'The set menus',
}

const SetMenus = async () => {
  const menus = await prisma.allMenus.findMany()
  // const items = [
  //   //prettier-ignore
  //   { name: 'lunch_menus', title: 'Lunch Menus'},
  //   { name: 'choices', title: 'Choices' },
  //   { name: 'set_menu', title: 'Set Menus' },
  // ]

  return (
    <>
      <div className="menusBox">
        <Table4col_2_price
          menus={menus.filter(m => m.category === 'lunch_menus')}
          title="Lunch Menus"
        />
        <Table2_col
          menus={menus.filter(m => m.category === 'choices')}
          title="Choose one starter below for a 2-course lunch"
        />
        <Table4col_1_price_per_person
          menus={menus.filter(m => m.category === 'set_menu')}
          title="Set Menus"
        />
      </div>
    </>
  )
}

// export const dynamic = 'force-dynamic'

export default SetMenus
