import React from 'react';
import { Component } from 'react';
import { Progress } from 'reactstrap';

export default class RegionProgress extends Component {

  render() {
    let { CountryList, PositionInQueue } = this.props;
    const percentage = (PositionInQueue / CountryList.length * 100).toFixed(0) ;

    return (
      <div>
          <h3>Progress within region</h3>
          <div className="text-center">{ percentage }%</div>
          <Progress value={ percentage } />
      </div>
    )
  }
}
