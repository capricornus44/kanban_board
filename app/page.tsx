import Columns from '@/components/columns'
import NewTodoDialog from '@/components/new-todo-dialog'

export default function Home() {
  return (
    <main className='flex h-screen bg-gradient-to-br from-gray-700 to-gray-900 py-12 text-white'>
      <div className='mx-auto w-full max-w-7xl px-6'>
        <NewTodoDialog />
        <Columns />
      </div>
    </main>
  )
}
