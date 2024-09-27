import { useState } from 'react'
import { Input } from './component/Input'
import { Button } from './component/Button'
import { ItemList } from './component/ItemList'
import { useTodoApi } from './component/api/api'

function App() {

  const { items, createTodo, updateTodo, deleteTodo } = useTodoApi()
  const [inputValue, setInputValue] = useState<string>('')
  const [editId, setEditId] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editId) {
      updateTodo(editId, inputValue)
      setEditId(null)
    } else {
      createTodo(inputValue)
    }
    setInputValue('')
  }
  const handleEdit = (id: string, title: string) => {
    setInputValue(title)
    setEditId(id)
  }

  return (
    <div className='h-[100vh] flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-8 text-gray-600 font-serif'>
        TaskTracker
      </h1>
      <div className='w-[500px]'>
        <form onSubmit={handleSubmit} className='mb-5'>
          <Input inputValue={inputValue} setInputValue={setInputValue} type='text' />
          <Button className='bg-gray-700 text-white w-full p-2'>Add</Button>
        </form>
      </div>
      <div className='w-[500px] h-52 overflow-y-auto'>
        <ItemList items={items} handleEdit={handleEdit} handleDelete={deleteTodo} />
      </div>
    </div>
  )
}

export default App
