'use client'

import { AllMenus } from '@prisma/client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import { useState, useTransition } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { updateMenuItem } from './actions'

const EditableRow = ({ menu }: { menu: AllMenus }) => {
  const [editing, setEditing] = useState(false)
  const [item, setItem] = useState(menu.item)
  const [description, setDescription] = useState(menu.description)
  const [price1, setPrice1] = useState(String(menu.price1))
  const [price2, setPrice2] = useState(String(menu.price2))
  const [price3, setPrice3] = useState(String(menu.price3))
  const [isPending, startTransition] = useTransition()

  const cancel = () => {
    setItem(menu.item)
    setDescription(menu.description)
    setPrice1(String(menu.price1))
    setPrice2(String(menu.price2))
    setPrice3(String(menu.price3))
    setEditing(false)
  }

  const save = () => {
    startTransition(async () => {
      const result = await updateMenuItem(menu.id, { item, description, price1, price2, price3 })
      if (result?.error) {
        toast.error(result.error)
        return
      }
      toast.success('Saved')
      setEditing(false)
    })
  }

  if (!editing) {
    return (
      <tr className="even:bg-cream-100 odd:bg-cream-50">
        <td className="row_number">{menu.item_id}</td>
        <td className="p-2 align-top">{menu.item}</td>
        <td className="p-2 align-top whitespace-pre-wrap">{menu.description}</td>
        <td className="p-2 align-top font-mono">
          {menu.price1 || menu.price2 || menu.price3 ? (
            <div className="flex flex-col gap-1">
              {!!menu.price1 && <span>£ {menu.price1.toFixed(2)}</span>}
              {!!menu.price2 && <span>£ {menu.price2.toFixed(2)}</span>}
              {!!menu.price3 && <span>£ {menu.price3.toFixed(2)}</span>}
            </div>
          ) : (
            '—'
          )}
        </td>
        <td className="p-2 align-top">
          <Button variant="soft" onClick={() => setEditing(true)}>
            Edit
          </Button>
        </td>
      </tr>
    )
  }

  return (
    <tr className="bg-cream-300">
      <td className="row_number">{menu.item_id}</td>
      <td className="p-2 align-top min-w-[180px]">
        <TextField.Root value={item} onChange={e => setItem(e.target.value)} />
      </td>
      <td className="p-2 align-top min-w-[260px]">
        <TextArea rows={4} value={description} onChange={e => setDescription(e.target.value)} />
      </td>
      <td className="p-2 align-top min-w-[120px]">
        <div className="flex flex-col gap-1">
          <TextField.Root
            type="number"
            step="0.01"
            value={price1}
            onChange={e => setPrice1(e.target.value)}
          />
          <TextField.Root
            type="number"
            step="0.01"
            value={price2}
            onChange={e => setPrice2(e.target.value)}
          />
          <TextField.Root
            type="number"
            step="0.01"
            value={price3}
            onChange={e => setPrice3(e.target.value)}
          />
        </div>
      </td>
      <td className="p-2 align-top">
        <div className="flex flex-col gap-1">
          <Button disabled={isPending} onClick={save} className="!bg-gold !text-white hover:!bg-gold-light">
            Save
          </Button>
          <Button disabled={isPending} variant="soft" color="gray" onClick={cancel}>
            Cancel
          </Button>
        </div>
      </td>
    </tr>
  )
}

const AdminMenuEditor = ({ grouped }: { grouped: Record<string, AllMenus[]> }) => {
  return (
    <div className="w-full">
      <Toaster />
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="menusBox">
          <h3>{category}</h3>
          <table className="menus table-auto w-full">
            <thead>
              <tr>
                <th></th>
                <th>Item</th>
                <th>Description</th>
                <th>Price(s)</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(menu => (
                <EditableRow key={menu.id} menu={menu} />
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default AdminMenuEditor
