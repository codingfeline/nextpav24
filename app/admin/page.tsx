import prisma from '@/prisma/client'
import { AllMenus } from '@prisma/client'
import { Heading } from '@radix-ui/themes'
import AdminMenuEditor from './AdminMenuEditor'
import LogoutButton from './LogoutButton'

const groupByCategory = (menus: AllMenus[]) => {
  const sorted = [...menus].sort(
    (a, b) => a.category.localeCompare(b.category) || a.item_id - b.item_id
  )
  return sorted.reduce<Record<string, AllMenus[]>>((groups, menu) => {
    ;(groups[menu.category] ??= []).push(menu)
    return groups
  }, {})
}

const AdminPage = async () => {
  const menus = await prisma.allMenus.findMany()
  const grouped = groupByCategory(menus)

  return (
    <div className="w-full mt-8">
      <div className="flex items-center justify-between mb-4">
        <Heading>Menu Admin</Heading>
        <LogoutButton />
      </div>
      <AdminMenuEditor grouped={grouped} />
    </div>
  )
}

export const dynamic = 'force-dynamic'

export default AdminPage
