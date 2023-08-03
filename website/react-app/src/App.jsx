// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import SignupLoginPage from "./components/SignupLoginPage/SignupLoginPage";
import Header from "./components/Header/Header";
import SignedInHeader from "./components/Header/SignedInHeader/SignedInHeader";
import Footer from "./components/Footer/Footer";
import axiosInstance from "./AxiosConfig";
import SolutionsContent from "./components/Solutions/SolutionsContent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SavedPage from './components/SavedPage/SavedPage';
import ScrollToTop from "./components/ScrollToTop";
import webhomepagelogo from "./assets/AdVantageMainLoader.svg";
import './App.css';
import DotLoader from "react-spinners/DotLoader";
import axios from 'axios';

// Create a user context
const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const refreshToken = localStorage.getItem('refresh_token');
    
    const refreshTokenData = async (refreshToken) => {
      // if there exists token in localStorage
      const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
      const now = Math.ceil(Date.now() / 1000);
      if (tokenParts.exp > now) {
        // if refresh token hasn't expire, send request to get new access token
        const axiosInstanceForUserAuth = axios.create({
          // baseURL: 'http://localhost:8000/',
          baseURL: import.meta.env.VITE_APP_API_BASE_URL,
          timeout: 5000,
          headers: {
            Authorization: localStorage.getItem('access_token')
              ? 'JWT ' + localStorage.getItem('access_token')
              : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });
        return axiosInstanceForUserAuth
        .post('/token/refresh/', { refresh: refreshToken })
        .then((response) => {
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);

          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + response.data.access;

          setCurrentUser(true);
        })
        .catch(function (error) {
          console.log(error);
          setCurrentUser(false);
        }).finally(() => {
          // setTimeout(() => {
          //   setIsLoading(false);
          // }, 1000);
          setIsLoading(false);
        });
      } else {
        // setTimeout(() => {
        //   setIsLoading(false);
        // }, 3000);
        setIsLoading(false);
        setCurrentUser(false);
        return;
      }
    };
    if (!refreshToken) {
      // if no token in localStorage, set no user
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1000);
      setIsLoading(false);
      setCurrentUser(false);
      return;
    } else {
      refreshTokenData(refreshToken);
    }

  }, []);


  if (currentUser === null || isLoading) {
    return (
      <div className="loader-container">
        {/* <h3>Get Ahead, Get AdVantage</h3> */}
        <img className="loadingpagelogo" src={webhomepagelogo} alt="Loading..." />
          {/* Loading spinner */}
          <DotLoader className="loadingpagespinner" color="#050505" />

      </div>
    );
  }

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser}}>
      <ToastContainer />
      <Router>
      <ScrollToTop />
        <MyRoutes />
      </Router>
    </UserContext.Provider>
  );
}

function MyRoutes() {
  const { currentUser } = useContext(UserContext);
  let location = useLocation();

  //=======================new===========================
  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser && (location.pathname === '/solutions' || location.pathname === '/saved')) {
      navigate('/signup');
    }
  }, [currentUser, navigate]);
  //=======================new===========================

  return (
    <div>
      {/* Only show Header when not on LoginPage */}
      {/* Only show Header or SignedInHeader based on user login status */}
      {location.pathname !== "/signup" &&
        (currentUser ? <SignedInHeader /> : <Header />)}
    {/* // (currentUser ? <Header /> : <SignedInHeader />)}   */}

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignupLoginPage/>}/>
        <Route path='/solutions' element={<SolutionsContent />} />
        <Route path='/saved' element={<SavedPage />} />
      </Routes>
      {/* Only show Footer when not on LoginPage */}
      {location.pathname !== "/signup" && <Footer />}
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
export { UserContext };
