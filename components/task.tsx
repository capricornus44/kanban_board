import { cn } from '@/lib/utils'
import { TrashIcon, PencilIcon } from 'lucide-react'
import { Status, useTaskStore } from '@/lib/task-store'
import EditTodoDialog from './edit-todo-dialog'

type TaskProps = {
  id: string
  title: string
  description?: string
  status: Status
}

export default function Task({ id, title, description, status }: TaskProps) {
  const removeTask = useTaskStore(state => state.removeTask)
  const dragTask = useTaskStore(state => state.dragTask)

  return (
    <div
      draggable
      onDragStart={() => dragTask(id)}
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

      <div className='flex flex-col gap-2'>
        <button className='cursor-pointer' onClick={() => removeTask(id)}>
          <TrashIcon className='h-4 w-4 text-gray-500 hover:text-rose-400' />
        </button>

        <EditTodoDialog
          id={id}
          title={title}
          description={description}
          status={status}
        />
      </div>
    </div>
  )
}
