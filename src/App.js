import './App.css';
import { useEffect } from 'react';
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore
} from "@100mslive/react-sdk";
import SignIn from './components/signin.tsx';
import Conference from './components/confrence.tsx';
import Footer from './components/footer.tsx';
import Agenda from './components/agenda.tsx';

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  
  useEffect(() => {
    window.onunload = () => {
        if(isConnected) {
          hmsActions.leave();
        }
      }
    }, [hmsActions, isConnected]);

  return (
    <div className="App">
          {isConnected ? (
            <>
              <Conference />
              <Footer/>
            </>

            ):(
              <SignIn />
          )}
    </div>
  );
}

export default App;
