import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Your global error handler
window.addEventListener('error', function(event) {
  if (event.message === 'Unimplemented type: 7') {
    event.preventDefault();
  }
});

// Your global warning handler
const originalWarn = console.warn;

console.warn = function(message, ...optionalParams) {
  if (message.startsWith('Incorrect mesh URL for')) {
    return;
  }
  originalWarn.apply(console, [message, ...optionalParams]);
};

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>,
)
