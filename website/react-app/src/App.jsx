
// eslint-disable-next-line no-unused-vars 
import React, { createContext, useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SignupLoginPage from './components/SignupLoginPage/SignupLoginPage';
import Header from './components/Header/Header';
import SignedInHeader from './components/Header/SignedInHeader/SignedInHeader'
import Footer from './components/Footer/Footer';
import axios from 'axios';
import SolutionsContent from './components/Solutions/SolutionsContent';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
// Create a user context
const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const client = axios.create({
      baseURL: "http://127.0.0.1:8000"
    });
    client.get("/user/user")
    .then(function(res) {
      console.log(res)
      setCurrentUser(true);
    })
    .catch(function(error) {
      console.log(error)
      setCurrentUser(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>

    <Router>
      <MyRoutes />
    </Router>
    </UserContext.Provider>

  );
}

function MyRoutes() {
  const { currentUser } = useContext(UserContext);
  let location = useLocation();

  return (
    <div>
      {/* Only show Header when not on LoginPage */}
      {/* Only show Header or SignedInHeader based on user login status */}
      {location.pathname !== '/signup' && 
      (currentUser ? <SignedInHeader /> : <Header />)}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupLoginPage/>}/>
        <Route path='/solutions' element={<SolutionsContent />} />
      </Routes>
      {/* Only show Footer when not on LoginPage */}
      {location.pathname !== '/signup' && <Footer />}
    </div>
  );
}



// function App() {
//   return (
//     <Router>
//       <MyRoutes />
//     </Router>
//   );
// }


// function MyRoutes() {
//   let location = useLocation();

//   return (
//     <div>
//       {/* Only show Header when not on LoginPage */}
//       {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}

//       <Routes>
//         <Route path="/" element={<HomePage />} />

//         <Route path='/solutions' element={<HeatmapPage />} />

//         <Route path="/login" element={<LoginPage />} />

//         <Route path="/signup" element={<SignupPage/>}/>
//       </Routes>
      
//       {/* Only show Footer when not on LoginPage */}
//       {location.pathname !== '/login' && <Footer />}
//     </div>
//   );
// }
// import './App.css';
// import ZoneComponent from  './components/BackendAPI/ZoneComponent'
// function App() {
//   return (
//     <div>
//       <ZoneComponent />
//     </div>
//   );
// }

export default App;
export {UserContext}