import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

import CardMaker from './card-maker'

const App = (props) => (
    <div>
        <h1>Hello World</h1>
        <CardMaker />
    </div>
);

ReactDOM.render((
    <App/>
), document.getElementById('app'));
