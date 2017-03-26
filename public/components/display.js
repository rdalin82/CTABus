import React from 'react';
import {setDestinations} from "../actions/InputActions";

export default class Display extends React.Component {

	render(){
  		return (
			<div class="btn-group" role="group">
    			<button class="btn btn-default">Your Route is: {this.props.route}/{this.props.destination}</button>
			</div>
   		)
 	}
}
