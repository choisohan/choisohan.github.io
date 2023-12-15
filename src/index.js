import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConversationContextProvider } from './Contexts/ConversationContext';
import { BrowserRouter } from 'react-router-dom';
import { PopupContentContextProvider } from './Contexts/PopupContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<BrowserRouter>
<PopupContentContextProvider>
      <ConversationContextProvider>
        <App />
      </ConversationContextProvider>
    </PopupContentContextProvider>
</BrowserRouter>

);

reportWebVitals();
