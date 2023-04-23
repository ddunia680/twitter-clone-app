import { Routes, Route } from 'react-router-dom';

import MainView from "./containers/mainView/mainView";
import UserIdentity from "./components/userIdentity/userIdentity";
import AuthContainer from './containers/authContainer/authContainer';

function App() {
  return (
    <div className="mx-auto w-[100%] xl:w-[80%] text-white">
      <Routes>
        <Route path='/' element={<AuthContainer/>} /> 
        <Route path="/main">
          <Route index  element={<MainView/>} />
          <Route path=':id' element={<UserIdentity/>}/>
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
