import React from "react";
import {setDirection} from "../actions/InputActions";


export default class DirectionList extends React.Component {

  render(){
    const route = this.props.route || ""
    const directionlist = this.props.directions || []
    const directions = directionlist.map(function(key, index){
      return <div class="btn-group" role="group" key={index}>
              <button
                class="btn btn-warning"
                data={directionlist[index]}
                onClick={setDirection.bind(this, directionlist[index], route)} >
              {directionlist[index]}
              </button>
            </div>;
    });
    return (
        <div>
          <form>
            {directions}
          </form>
        </div>
      )
  }
}
