import React from 'react';
import { Component } from 'react';

export default class App extends Component {

  render() {
    let { ActiveSubRegion, CountryList, PositionInQueue } = this.props;

    const renderLocation = (ActiveSubRegion, CountryList, PositionInQueue)=>{
      let correctCountryName = CountryList[PositionInQueue];
      let countryData = ActiveSubRegion.countries.filter((ele)=>{
        return ele.name === correctCountryName})[0];

      let url = countryData["orthographic"];
      return (
        <img className="map" src={require('../img/' + url)} alt="location" ></img>
      );
    }

    return (

      <div>
        <h3>Location of { CountryList.length > 0 ? CountryList[PositionInQueue] : ""}</h3>
        <div>
           { renderLocation(ActiveSubRegion, CountryList, PositionInQueue)}
        </div>
      </div>

    )
  }
}
