import './styles/reset.css'
import './styles/global.css'
import {RegisterPage} from "../pages/RegisterPage";
import {Suspense} from "react";


function App() {


    return (
    <div className="App">
      <Suspense fallback={''}>
        <RegisterPage
        />
      </Suspense>
    </div>
  )
}

export default App
