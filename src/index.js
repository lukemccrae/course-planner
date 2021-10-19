import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CourseInfoProvider from './Providers/CourseInfoProvider';
import MileTimesProvider from './Providers/MileTimesProvider';
import RouteProvider from './Providers/RouteProvider';

ReactDOM.render(
    <React.StrictMode>
        <CourseInfoProvider>
            <MileTimesProvider>
                <RouteProvider>
                    <App />
                </RouteProvider>
            </MileTimesProvider>
        </CourseInfoProvider>
    </React.StrictMode>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
