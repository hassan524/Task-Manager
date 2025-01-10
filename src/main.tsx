import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/main.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // Correct import
import store from './redux/store/Store';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
