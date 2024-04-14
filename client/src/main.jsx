import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Auth.jsx'
import { StyleProvider } from '@ant-design/cssinjs';
import { SearchProvider } from './context/Search.jsx'
import { CartProvider } from './context/Cart.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StyleProvider hashPriority="high">
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </CartProvider>
  </SearchProvider>
  </AuthProvider>
  </StyleProvider>
)
