import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from "@/app";
import {Provider} from "react-redux";
import {store} from "@/store";
import {listenToWebSocket} from "@/actions/webSocketActions";
import i18n from '@/utils/i18n'
import {I18nextProvider} from "react-i18next";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <I18nextProvider i18n={i18n}>
          <Provider store={store}>
              <App />
          </Provider>
      </I18nextProvider>


  </React.StrictMode>,
)

// Initialize WebSocket connection
store.dispatch(listenToWebSocket());