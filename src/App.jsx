import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen grid place-items-center">
        <h1 className="text-3xl font-bold text-green-600">Tailwind is working ✅</h1>
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )
}

export default App
