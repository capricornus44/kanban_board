import Task from './task'

const tasks = [
  {
    id: '1',
    title: 'Test task',
    description: 'Test description',
    status: 'TODO'
  }
]

type ColumnProps = {
  title: string
  status: string
}

export default function Column({ title, status }: ColumnProps) {
  const filteredTasks = tasks.filter(task => task.status === status)

  return (
    <section className='h-full flex-1'>
      <h2 className='font-serif text-2xl font-semibold'>{title}</h2>

      <div className='mt-3.5 h-4/5 w-full rounded-xl bg-gray-700/50 p-4'>
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
