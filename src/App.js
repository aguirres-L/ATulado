import './App.css';
import { UserTypeProvider } from './context/UserTypeContext';
import Main from './Main';

function App() {
  return (
    <UserTypeProvider>
   <Main/>
    </UserTypeProvider>
  );
}

export default App;