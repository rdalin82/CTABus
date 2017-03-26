import React from "react";
import {setStop} from "../actions/InputActions"

export default class StopList extends React.Component {
	render(){
    const stops = this.props.stops || []
    const selected = this.props.selected || "Stops"
    const stoplist = stops.map(function(key, index){
      return <li>
                <a href="#" data={stops[index].stopId } onClick={setStop.bind(this, stops[index].stopId)}>
                   {stops[index].stopName}
                </a>
            </li>;
    });
		return (

		  <div>
	      <div class="dropdown" id="stopsDropdown">
	        <button
						class="btn btn-danger dropdown-toggle"
						type="button"
						id="stopsDropdown"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="true">
          		{selected}
          		<span class="caret"></span>
	        </button>
	        <ul class="dropdown-menu" aria-labelledby="routeDropdown">
              {stoplist}
	        </ul>
		      </div>
			</div>
		)
	}
}
