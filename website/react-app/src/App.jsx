
// eslint-disable-next-line no-unused-vars 
import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import SignupPage from './components/SignupPage/SignupPage';
import Header from './components/Header/Header';
import SignedInHeader from './components/Header/SignedInHeader/SignedInHeader'
import Footer from './components/Footer/Footer';
import HeatmapPage from './components/HeatmapPage/HeatmapPage';

// Create a user context
const UserContext = createContext();

// const mockUser = {
//   name: 'John Doe',
//   email: 'johndoe@example.com'
// };

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  // testing user log in 
  // const [currentUser, setCurrentUser] = useState(mockUser);

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
      {/* {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />} */}
      {/* Only show Header or SignedInHeader based on user login status */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && (

          currentUser ? <SignedInHeader /> : <Header />

      )}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path='/solutions' element={<HeatmapPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
      
      {/* Only show Footer when not on LoginPage */}
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}
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