import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Saturn from './Saturn';
import Home from './Home';
import AboutUs from './AboutUs';
import Services from './Services';
import Blog from './Blog';
import Contact from './Contact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Saturn />
  </React.StrictMode>
);