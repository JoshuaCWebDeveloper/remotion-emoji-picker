/* app.js
 * App loader
 * Dependencies: modules, services, classes
 * Author: Joshua Carter
 * Created: March 8, 2021
 */
"use strict";
//import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
//import components
import { RemotionApp } from './RemotionApp.js';
//import styles
import './styles/main.css';


ReactDOM.render(
    <RemotionApp />,
    document.getElementById("view-container")
);
