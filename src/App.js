
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';
import Leads from './pages/Leads';
import './App.scss';
import 'rsuite/dist/rsuite.css';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/leads" element={<PrivateRoute><Leads /></PrivateRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
