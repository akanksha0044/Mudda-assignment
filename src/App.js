import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Adduser from './components/Adduser';
import UserDetails from './components/Userdetails';
import UpdateUser from './components/Updateuser';

function App() {
  return (
    <>

      <Router>
        <div className="App" style={{ overflow: 'scroll' }}>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/Adduser" element={<Adduser />}></Route>
            <Route exact path="/UserDetails" element={<UserDetails />}></Route>
            <Route exact path="/UpdateUser" element={<UpdateUser />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
