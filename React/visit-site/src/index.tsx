import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Navigate,
} from "react-router-dom";

import './scss/index.scss';
import App from './components/Pages/App';
import Ui from './components/Pages/Ui';
import Header from './components/Header';
import Footer from './components/Footer';
import ApiCom from './components/Pages/ApiCom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <Header/>
      <main>
        <React.StrictMode>
          <Router>
            <Routes>
              <Route path='/' element={<App pageName="Главная страница"/>}/>
              <Route path='/ui' element={<Ui pageName="Ui Page"/>}/>
              <Route path='/api-com' element={<ApiCom pageName="Api Com"/>}/>
            </Routes>
          </Router>
        </React.StrictMode>
      </main>
    <Footer/>
  </>
);
