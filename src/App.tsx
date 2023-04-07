import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { About } from "./routes/About";
import { ChromeIndex } from './chrome/index';
import { Home } from "./routes/Home";

import './App.css';

export const App = () => {
    return (
        <ChromeIndex/>
    )
};
