import './styles/reset.css'
import './styles/global.css'
import {RegisterPage} from "../pages/RegisterPage";
import {Suspense, useState} from "react";
import Toast from "../shared/ui/Toast/Toast.tsx";


function App() {
    const [isShown, setIsShown] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const showToast = (message: string) => {
        setToastMessage(message);
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 3000);
    };

    return (
    <div className="App">
      <Suspense fallback={''}>
        <RegisterPage showToast={showToast}/>
          {isShown && (
              <Toast message={toastMessage} />
          )}
      </Suspense>
    </div>
  )
}

export default App
