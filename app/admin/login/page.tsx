'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { Button, Heading, TextField } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const AdminLoginPage = () => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await axios.post('/api/admin/login', { password })
      router.push('/admin')
      router.refresh()
    } catch (err) {
      const message = axios.isAxiosError(err) ? err.response?.data?.error : null
      setError(message || 'Unexpected error occurred')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-8 max-w-sm mx-auto">
      <form onSubmit={onSubmit} className="space-y-3 p-5 rounded-lg shadow-lg bg-cream-50/95">
        <Heading>Admin Login</Heading>
        <TextField.Root
          placeholder="Password"
          type="password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <ErrorMessage>{error}</ErrorMessage>
        <Button
          disabled={submitting || !password}
          className="!bg-gold !text-white hover:!bg-gold-light w-full"
        >
          Log in {submitting && <Spinner />}
        </Button>
      </form>
    </div>
  )
}

export default AdminLoginPage
