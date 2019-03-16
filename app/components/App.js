import React from 'react';

export class MyComponentClass extends React.Component {

	render () {
		return (
			<h1>First Component name is : {this.props.type} and {this.props.passed}</h1>
		);
	}
};

export default class MyComponentClass1 extends React.Component {

	render () {
		return (
			<h1>second component name is : {this.props.name}</h1>
			
		);
	}
};

export class Component2 extends React.Component {
	render () {
		// var s=7+8;
		return(
		<h2> Number is {sum1()}</h2>
		);

		function sum1(){
			return (15+15);
		}

		console.log
	}
}