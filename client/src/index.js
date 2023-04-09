import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home.js';
import Recent from './pages/Recent.js';
import AboutUs from './pages/AboutUs.js';
import Video from './pages/Video.js'
import Upload from './pages/Upload.js';
import store from './store.js';
import { Provider } from 'react-redux';
import Liked from './pages/Liked.js';
import Delete from './pages/Delete.js';
import Help from './pages/Help';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Twitter from './pages/Twitter';
import Instagram from './pages/Instagram';
import LinkedIn from './pages/LinkedIn';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/twitter" element={<Twitter />} />
          <Route path="/instagram" element={<Instagram />} />
          <Route path="/linkedin" element={<LinkedIn />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
