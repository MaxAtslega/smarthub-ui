import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "@/app";
import {Provider} from "react-redux";
import {store} from "@/store";
import {listenToWebSocket} from "@/actions/webSocketActions";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

// Initialize WebSocket connection
store.dispatch(listenToWebSocket());