// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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
import './App.css'
import DotLoader from "react-spinners/DotLoader"

// Create a user context
const UserContext = createContext();

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState(""); // Add state for the user's name
  const [emailAddress, setEmailAddress] = useState(""); // Add state for the user's name

  

  useEffect(() => {


    axiosInstance
      .get("/user/user")
      .then(function (res) {
        console.log(res);
        setCurrentUser(true);
        // setUserName(res.data.user.username); // Set the user's name from the response
        // console.log(res.data.user.username)
        // setEmailAddress(res.data.user.email)
        // console.log(res.data.user.email)

      })
      .catch(function (error) {
        console.log(error);
        setCurrentUser(false);
      }).finally(() => {
        // Simulate a 5-second delay before setting isLoading to false
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });

  }, []);
  // Function to reset userName and email states after successful registration
  const handleRegisterSuccess = (username, userEmail) => {
    setUserName(username);
    setEmailAddress(userEmail);
  };



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
    <UserContext.Provider value={{ currentUser, setCurrentUser, userName, emailAddress, handleRegisterSuccess }}>
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
