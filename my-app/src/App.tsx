import { useEffect, useState } from 'react'
import './App.css'

function TodoCard({ todo }: { todo: { id: number, title: string, completed: boolean } }) {
  return (
    <div className="bg-gray-700 shadow-md rounded p-4 mb-4">
      <h2 className="text-xl font-bold">{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "Not Completed"}</p>
    </div>
  )
}


function AddTodoForm() {
  const [title, setTitle] = useState("")

  function onAdd(title: string) {
    fetch("http://localhost:3000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    })
      .then((response) => response.json()).catch((error) => console.error("Error adding todo:", error));
  }


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(title)
    setTitle("")
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title"
        className="border p-2 rounded mr-2"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Todo
      </button>
    </form>
  )
}

function App(){
  const [todo, setTodo] = useState<Array<{
    id: number,
    title: string,
    completed: boolean,
  }> | null>(null)

  function fetchTodos() {
    fetch("http://localhost:3000/api/todos")
      .then((response) => response.json())
      .then((data) => setTodo(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }

  useEffect (() => {
    fetchTodos();
  }, []);

  return (
    <>
     <div className="App min-h-screen gap-10 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Here is your kubernetes app!</h1>
      <button onClick={fetchTodos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Refresh
      </button>
      <div className="w-full h-1/2 flex gap-1 items-center justify-center">
        {
          todo==null ? "No todos found" : todo.map((t) => <TodoCard key={t.id} todo={t} />)
        }
      </div>

      <AddTodoForm/>
     </div>
    </>
  )
}

export default App
