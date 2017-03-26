import React from "react";
import {getPredictions} from "../actions/InputActions";

export default class Predictions extends React.Component {

  render(){
    const predictionsList = this.props.predictions || [];
    const predictions = predictionsList.map(function(index){
      return <div>
        <p>Bus</p>
      </div>;
    })
    return (
      <div>
        <div id="predictions">Predictions</div>
        {predictions}
      </div>
    )
  }
}
