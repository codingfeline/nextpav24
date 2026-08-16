'use server'

import { MenuItemSchema } from '@/app/validationSchemas'
import { isAdminAuthed } from '@/lib/adminAuth'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

export async function updateMenuItem(id: string, data: unknown) {
  if (!(await isAdminAuthed())) {
    return { error: 'Not authenticated' }
  }

  const result = MenuItemSchema.safeParse(data)
  if (!result.success) {
    return { error: result.error.issues[0]?.message ?? 'Invalid input' }
  }

  await prisma.allMenus.update({
    where: { id },
    data: result.data,
  })

  revalidatePath('/admin')
  revalidatePath('/drinks')
  revalidatePath('/main-menu')
  revalidatePath('/set-menus')

  return { ok: true as const }
}
