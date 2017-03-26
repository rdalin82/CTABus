import React from "react";
import {setRoute} from "../actions/InputActions";

export default class RouteItems extends React.Component {
	render(){
		let keys = []
		let routelist = this.props.routes;
		for (var key in routelist){
			keys.push(key);
		}
		const routes = keys.map(function(key, index){
			return <li key={index}>
						<a href="#" data={routelist[key].number} onClick={setRoute.bind(this, routelist[key].number)}>
							Route: {routelist[key].number} | {routelist[key].name} 
						</a>
					</li>;
		});
		return (
			<div>{routes}</div>			
		)
	}

}