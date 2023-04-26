import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Signup' element={<SignUp/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
