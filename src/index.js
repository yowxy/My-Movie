import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from './StarRating';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
{/*   
    <StarRating max={10} color="yellow" size={50}/>
    <StarRating color="red" /> */}
  </React.StrictMode>
);

