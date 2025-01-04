'use client'

import Antispam from '@/app/components/antispam'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaLock } from 'react-icons/fa'
// import { DevTool } from '@hookform/devtools'

// export const metadata = {
//   title: 'Contact Us',
//   description: 'Email to get in touch with us',
// }

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, formState, reset } = useForm()
  const { errors } = formState
  const [allowForm, setAllowForm] = useState(false)

  const setPermission = flag => setAllowForm(flag)

  const onSubmit = data => {
    console.log(error)
    console.log(data)
    const newData = {
      ...data,
      message: data.message.replace(/\n/g, '<br />'),
    }
    axios
      .post('/api/send-email', {
        ...newData,
        // submitToOskars: true,
      })
      .then(res => {
        console.log(res)
        if (res.status === 200) setSubmitted(true)
        else setError('message not sent')
      })
      .catch(err => console.log(err))
  }

  const resetForm = e => {
    e.preventDefault()
    reset()
  }

  return (
    <div className="flex flex-col justify-center items-center mt-6 ">
      <div className={`bg-[#e2dfd8] p-5 sm:rounded-lg w-full sm:w-[638px]  `}>
        <h4>
          ContactUs{' '}
          <FaLock
            className={`inline transition-all delay-700 ${
              allowForm ? 'opacity-0 -translate-y-24' : 'opacity-100 '
            }`}
          />
        </h4>
        {submitted ? (
          <>
            <p>Enquiry submitted.</p>
            <button
              onClick={() => {
                setSubmitted(false)
                reset()
              }}
            >
              Clear
            </button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`transition-opacity delay-700 ${
              !allowForm ? 'opacity-40 text-slate-400' : 'opacity-100 '
            } `}
          >
            <fieldset disabled={!allowForm && 'disabled'}>
              <div>
                <label htmlFor="name">
                  Name
                  <span>{errors.name?.message}</span>
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'name is required' })}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="email">
                  Email
                  <span>{errors.email?.message}</span>
                  <input
                    type="text"
                    id="email"
                    {...register('email', {
                      required: 'email is required',
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'invalid email format',
                      },
                    })}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="message">
                  Message
                  <span>{errors.message?.message}</span>
                  <textarea
                    id="message"
                    cols="30"
                    rows="10"
                    {...register('message', {
                      required: 'Message is required',
                    })}
                  ></textarea>
                </label>
              </div>
              <div
                className={`flex gap-4 transition-opacity delay-600
            
            `}
              >
                <input type="submit" value="Submit" className="btn" />
                <button onClick={resetForm}>Clear</button>
              </div>
            </fieldset>
          </form>
        )}
        {/* <DevTool control={control} /> */}
        {!allowForm && (
          <>
            <div className="">
              <Antispam setPermission={setPermission} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ContactUs
