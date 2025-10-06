import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'   
import './styles/global.css'
import './styles/confetti.css';
import ErrorBoundary from './ErrorBoundary.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>)
