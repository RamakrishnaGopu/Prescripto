import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProfileContext from './Context/ProfileContext.jsx'
import {BrowserRouter} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ProfileContext> <App /></ProfileContext>
  </BrowserRouter>,
)
