'use client'

import { Status, useTaskStore } from '@/lib/task-store'
import Task from './task'
import { useMemo } from 'react'

type ColumnProps = {
  title: string
  status: Status
}

export default function Column({ title, status }: ColumnProps) {
  const tasks = useTaskStore(state => state.tasks)
  const draggedTask = useTaskStore(state => state.draggedTask)
  const updateStatus = useTaskStore(state => state.updateStatus)
  const dragTask = useTaskStore(state => state.dragTask)

  const filteredTasks = useMemo(
    () => tasks.filter(task => task.status === status),
    [tasks, status]
  )

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggedTask) return
    updateStatus(draggedTask, status)
    dragTask(null)
  }

  return (
    <section className='h-full flex-1'>
      <h2 className='font-serif text-2xl font-semibold'>{title}</h2>

      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        className='mt-3.5 h-4/5 w-full rounded-xl bg-gray-700/50 p-4'
      >
        <div className='flex flex-col gap-4'>
          {filteredTasks.map(task => (
            <Task key={task.id} {...task} />
          ))}

          {filteredTasks.length === 0 && status === 'TODO' && (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Create a new task</p>
            </div>
          )}

          {tasks.length && filteredTasks.length === 0 && status !== 'TODO' ? (
            <div className='mt-8 text-center text-sm text-gray-500'>
              <p>Drag your tasks here</p>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
