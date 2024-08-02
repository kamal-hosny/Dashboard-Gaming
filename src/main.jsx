import './index.css'
import React from 'react'
import App from './routes/App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
  // </React.StrictMode>,
)
