import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(3, 'Name is required.'),
  email: z.string().email('Email is required'),
  message: z.string().min(3, 'Message is required').max(300),
  phone: z.string().min(11, 'Incomplete contact number')
})

export const MenuItemSchema = z.object({
  item: z.string().min(1, 'Item name is required').max(200),
  description: z.string().max(2000),
  price1: z.coerce.number().min(0, 'Price cannot be negative'),
  price2: z.coerce.number().min(0, 'Price cannot be negative'),
  price3: z.coerce.number().min(0, 'Price cannot be negative'),
})