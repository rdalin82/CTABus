import React from "react";
import RouteItems from "./RouteItems";

export default class RouteList extends React.Component {
	render(){
		return (
		  <div >
		    <div class="app">
		      <div class="dropdown" id="routeDropdown">
		        <button class="btn btn-success dropdown-toggle" type="button" id="routeDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		          {this.props.selected}
		          <span class="caret"></span>
		        </button>
		        <ul class="dropdown-menu" aria-labelledby="routeDropdown">	
		          <RouteItems routes={this.props.routes} />		          
		        </ul>
		      </div>
		    </div>
			</div>
		)
	}
}