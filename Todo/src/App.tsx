import { useState } from 'react'
import { Input } from './component/Input'
import { Button } from './component/Button'
import { ItemList } from './component/ItemList'
import { useTodoApi } from './component/api/api'
import { DndContext } from '@dnd-kit/core';

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
    <DndContext >
      <div className='h-[100vh] flex flex-col items-center mt-5'>
        <h1 className='text-3xl font-bold mb-8 text-gray-600 font-serif'>
          TaskTracker
        </h1>
        <div className='flex'>
          <div className='flex flex-col items-start mr-10'>
            <div className='w-[400px]'>
              <form onSubmit={handleSubmit} className='mb-5'>
                <Input inputValue={inputValue} setInputValue={setInputValue} type='text' />
                <Button className='bg-gray-700 text-white w-full p-2'>Add</Button>
              </form>
            </div>
            <div className='w-[400px] h-52 overflow-y-auto'>
              <ItemList items={items} handleEdit={handleEdit} handleDelete={deleteTodo} />
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <div className='w-[400px] h-52 bg-gray-700 border border-gray-400 rounded-lg p-4'>
              <h2 className='text-xl font-bold mb-4 text-gray-300 text-center font-serif'>Completed Tasks</h2>
              <div className='text-gray-500'></div>
            </div>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default App
