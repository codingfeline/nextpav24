'use client'

import { Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()

  const onLogout = async () => {
    await axios.post('/api/admin/logout')
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <Button variant="soft" color="gray" onClick={onLogout}>
      Log out
    </Button>
  )
}

export default LogoutButton
