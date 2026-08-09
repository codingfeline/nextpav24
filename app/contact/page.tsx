'use client'

import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'
import { ContactSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Callout, Heading, TextArea, TextField } from '@radix-ui/themes'
import axios from 'axios'
import Link from 'next/link'
// import 'easymde/dist/easymde.min.css'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { FaMap, FaPhone } from 'react-icons/fa'
import { z } from 'zod'
import Reveal from '../components/Reveal'

type ContactFormData = z.infer<typeof ContactSchema>

const ContentForm = () => {
  const [error] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  })

  const onSubmit = handleSubmit(async data => {
    const convertedData = {
      ...data,
      message: data.message.replace(/\n/g, '<br />'),
    }
    try {
      setSubmitting(true)
      await axios.post('/api/send-email/', convertedData)
      // router.push('/')
      // setSubmitted(true)
      toast('Enquiry submitted')
      reset()
      setSubmitting(false)
      // router.refresh()
    } catch (error) {
      console.log(error)
      setSubmitting(false)
      toast.error('Unexpected error occured')
      // setError('Unexpected error')
    }
  })

  return (
    <div className="w-full mt-8">
      {/* <ErrorMessage>{submitted && 'Your enquiry has been submitted'}</ErrorMessage> */}
      <Toaster />
      {submitted && (
        <Callout.Root color="violet" mb="2">
          <Callout.Text>Your enquiry has been submitted.</Callout.Text>
        </Callout.Root>
      )}

      {error && (
        <Callout.Root color="red" mb="2">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <Reveal>
        <form className=" space-y-3 p-5 rounded-lg shadow-lg bg-cream-50/95">
          {/* <form className=" space-y-3" onSubmit={onSubmit}> */}
          <Heading>Contact Us</Heading>
          <TextField.Root placeholder=" Name" {...register('name')} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <TextField.Root placeholder=" Email" {...register('email')} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <TextField.Root placeholder=" Phone" type="number" {...register('phone')} />
          <ErrorMessage>{errors.phone?.message}</ErrorMessage>

          {/* <Controller
          name="message"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="Message" {...field} />}
          /> */}
          <TextArea rows={8} placeholder=" Message" {...register('message')} />
          <ErrorMessage>{errors.message?.message}</ErrorMessage>

          <Button
            disabled={submitting}
            onClick={onSubmit}
            className="!bg-gold !text-white hover:!bg-gold-light"
          >
            <a href="#" className="!text-white">
              Send enquiry {submitting && <Spinner />}
            </a>
          </Button>
        </form>
      </Reveal>
      <Reveal delay="delay-200">
        <div className="mt-4 p-5 rounded-lg shadow-lg bg-cream-50/95 flex flex-col items-center gap-2 text-brown">
          <Link
            href="/locate-us"
            className="flex items-center justify-center gap-2 hover:text-gold transition-colors"
          >
            <FaMap className="text-lg shrink-0" />
            <address className="not-italic">
              114 HIGH STREET CT14 6BB, DEAL, KENT, UK
            </address>
          </Link>
          <a
            href="tel:01304367707"
            className="flex items-center justify-center gap-2 hover:text-gold transition-colors"
          >
            <FaPhone className="shrink-0" />
            01304 367 707
          </a>
        </div>
      </Reveal>
    </div>
  )
}

export default ContentForm
