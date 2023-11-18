import { cn } from '@/lib/utils'
import { TrashIcon } from 'lucide-react'

type TaskProps = {
  title: string
  description: string
  status: string
}

export default function Task({ title, description, status }: TaskProps) {
  return (
    <div
      className={cn(
        'flex cursor-move items-start justify-between rounded-lg bg-white px-3 py-2 text-gray-900',
        {
          'border-2 border-sky-500': status === 'TODO',
          'border-2 border-amber-500': status === 'IN_PROGRESS',
          'border-2 border-emerald-500': status === 'DONE'
        }
      )}
    >
      <div>
        <h3 className='font-medium text-gray-700'>{title}</h3>
        <p className='text-sm font-light text-gray-500'>{description}</p>
      </div>

      <button className='cursor-pointer'>
        <TrashIcon className='h-5 w-5 text-gray-500 hover:text-rose-400' />
      </button>
    </div>
  )
}
