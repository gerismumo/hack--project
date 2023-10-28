import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './componets/Home';
import Login from './componets/Login';
import LoginUser from './componets/LoginUser';
import RegisterUser from './componets/RegisterUser';
import Registration from './componets/Registration';
import Users from './componets/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/registerUser' element={<RegisterUser />} />
        <Route path='/loginUser' element={<LoginUser />}/>
        <Route path='/usersPage' element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
