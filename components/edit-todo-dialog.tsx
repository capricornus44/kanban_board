'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from './ui/textarea'
import { PencilIcon } from 'lucide-react'
import { Status, useTaskStore } from '@/lib/task-store'

type EditTodoDialogProps = {
  id: string
  title: string
  description?: string
  status: Status
}

export default function EditTodoDialog({
  id,
  title,
  description,
  status
}: EditTodoDialogProps) {
  const updateTask = useTaskStore(state => state.updateTask)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)
    const { title, description } = Object.fromEntries(formData)

    if (typeof title !== 'string' || typeof description !== 'string') return

    updateTask(id, title, description)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost' size='icon' className='h-4 w-4'>
          <PencilIcon className='h-4 w-4 text-gray-500 hover:text-emerald-400' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form
          id='todo-form'
          className='grid gap-4 py-4'
          onSubmit={handleSubmit}
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Input
              id='title'
              name='title'
              defaultValue={title}
              autoComplete='none'
              className='col-span-4'
            />
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Textarea
              id='description'
              name='description'
              defaultValue={description}
              className='col-span-4'
            />
          </div>
        </form>

        <DialogFooter>
          <DialogTrigger asChild>
            <Button type='submit' size='sm' form='todo-form'>
              Apply
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
