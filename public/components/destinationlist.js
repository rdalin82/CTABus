import React from "react";
import {updateDestination} from "../actions/InputActions";

export default class DestinationList extends React.Component {

  componentWillUnMount(){
  }
  render(){
    const destinationlist=this.props.destinationlist || [] 
    const destinations = destinationlist.map(function(key, index){
      return <div class="btn-group" role="group">
        <button 
          key={index} 
          data={key} 
          value={key}
          type="button" class="btn btn-primary" 
          onClick={updateDestination.bind(this, {key})}>
        {key} 
        </button> 
      </div>;
    });
    return ( 
      <div>
        <form>
          {destinations}
        </form>
      </div>
    )
  }
}

