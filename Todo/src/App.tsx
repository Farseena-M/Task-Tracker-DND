import { useState } from 'react'
import { Input } from './component/Input'
import { Button } from './component/Button'
import { ItemList } from './component/ItemList'
import { useTodoApi } from './component/api/api'


function App() {

  const { items, setItems, createTodo, updateTodo, deleteTodo } = useTodoApi()
  const [inputValue, setInputValue] = useState<string>('')
  const [editId, setEditId] = useState<string | null>(null)
  const [activeCard, setActiveCard] = useState<string | null>(null)


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

  const onDrop = (status: string, position: number): void => {
    console.log(`${activeCard} is going to place into ${status} at position ${position}`);

    if (!activeCard) return;

    const taskToMove = items.find(item => item._id === activeCard);
    if (!taskToMove) return;

    const updatedTasks = items.filter(task => task._id !== activeCard);

    updatedTasks.splice(position, 0, { ...taskToMove, status });

    const reindexedTasks = updatedTasks.map((task, idx) => ({
      ...task,
      index: idx,
    }));

    setItems(reindexedTasks);
  };


  return (
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
          <div className='w-[400px] h-100 overflow-y-auto'>
            <ItemList items={items} handleEdit={handleEdit} handleDelete={deleteTodo} setActiveCard={setActiveCard} status={'Todo'} onDrop={onDrop} />
          </div>
        </div>

       {/* Drop Area */}

        <div className='flex flex-col items-start'>
          <div className='w-[400px] h-52 border-gray-400 rounded-lg p-4 mt-12'>
            <h2 className='text-xl font-bold mb-4 text-gray-300 text-center font-serif'>Completed Tasks</h2>
            <div className='w-[400px] h-100 overflow-y-auto'>
              <ItemList items={items} handleEdit={handleEdit} handleDelete={deleteTodo} setActiveCard={setActiveCard} status={'Completed'} onDrop={onDrop} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
