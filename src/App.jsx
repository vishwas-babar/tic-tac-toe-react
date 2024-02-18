import { useState } from "react"
import Board from "./components/Component.jsx"

function App(props) {

  // const [arr[], setarr] = useState([])
  let xoro = 'X';

  return (
    <main className="h-screen w-full flex justify-center items-center bg-gray-950">
      <Board />
    </main>
  )
}

export default App
