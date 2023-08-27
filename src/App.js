
import "./App.css"
import UseGestureCode from "./UseGestureCode"
import VanillJsCode from "./VanillaJsCode"

export default function App() {
  
  return (
    <div className="App" style={{touchAction: 'none'}}>
      {/* <UseGestureCode /> */}
      <VanillJsCode />
    </div>
  )
}
