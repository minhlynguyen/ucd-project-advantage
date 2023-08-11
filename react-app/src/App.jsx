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

// Create a user context for authentication
const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // check if there exists refresh token in local,
  // if exists, try to login user automatically using token
  useEffect(() => {
    const refreshToken = localStorage.getItem('refresh_token');

    // define a function to refresh token data
    const refreshTokenData = async (refreshToken) => {
      // get token from local storage
      const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));//extract token
      const now = Math.ceil(Date.now() / 1000);
      // check if refresh token is expired
      if (tokenParts.exp > now) {
        // if refresh token hasn't expire, send request to get new access token
        // create a new axios instance
        const axiosInstanceForUserAuth = axios.create({
          baseURL: import.meta.env.VITE_APP_API_BASE_URL,
          timeout: 50000,
          headers: {
            Authorization: localStorage.getItem('access_token')
              ? 'JWT ' + localStorage.getItem('access_token')
              : null,
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
        });
        // use the axios instance to send requests with refresh token
        return axiosInstanceForUserAuth
        .post('/api/user/login/refresh/', { refresh: refreshToken })
        .then((response) => {
          // if get response successfully, store new tokens in local
          localStorage.setItem('access_token', response.data.access);
          localStorage.setItem('refresh_token', response.data.refresh);
          // set new headers for axios instance defined in AxiosConfig.jsx
          axiosInstance.defaults.headers['Authorization'] =
            'JWT ' + response.data.access;
          // set user is authenticated
          setCurrentUser(true);
        })
        .catch(function (error) {
          // if failed, set no user
          setCurrentUser(false);
        }).finally(() => {
          // stop loading
          setIsLoading(false);
        });
      } else {
        // if refresh token is expired, set no user, stop loading and return
        setIsLoading(false);
        setCurrentUser(false);
        return;
      }
    };

    if (!refreshToken) {
      // if no token in localStorage, set no user, stop loading and return
      setIsLoading(false);
      setCurrentUser(false);
      return;
    } else {
      // if exists token, try to refresh it
      refreshTokenData(refreshToken);
    }

  }, []);

  // show loading before confirm user state
  if (currentUser === null || isLoading) {
    return (
      <div className="loader-container">
        <img className="loadingpagelogo" src={webhomepagelogo} alt="Loading..." />
          <DotLoader className="loadingpagespinner" color="#050505" />
      </div>
    );
  }

  // show app after confirm user state
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
  const navigate = useNavigate();
  // if user didn't login, redirect to sign up page when path is solutions page or saved page
  useEffect(() => {
    if (!currentUser && (location.pathname === '/solutions' || location.pathname === '/saved')) {
      navigate('/signup');
    }
  }, [currentUser, navigate]);

  return (
    <div>
      {/* Only show Header when not on LoginPage */}
      {/* Only show Header or SignedInHeader based on user login status */}
      {location.pathname !== "/signup" &&
        (currentUser ? <SignedInHeader /> : <Header />)}
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
};

export default App;
export { UserContext };
