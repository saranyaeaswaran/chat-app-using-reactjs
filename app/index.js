import React from 'react';
import ReactDOM from 'react-dom';
import MyComponentClass1,{MyComponentClass,Component2} from './components/App.js'
// var ReactDOM = require('react-dom')
// var App = require('./components/App')

const elementsRendered = (
<div>
<MyComponentClass type={gel()} passed="See console111" />
<MyComponentClass1 name="Troy"/>
<Component2 />
</div>
)

ReactDOM.render(elementsRendered,document.getElementById('appNode1'))

function gel() {
    console.log("testing props");
}

//using JSX
const childElement = <div className="container">Checking JSX</div>
ReactDOM.render(childElement,document.getElementById('NumberNode'))





