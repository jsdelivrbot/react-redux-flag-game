import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementPositionInQueue } from '../actions/index';
import Location from '../components/location';
import RegionProgress from '../components/regionProgress';
import FlagButtons from './flagButtons';

class Gameboard extends Component {
  constructor(props) {
    super(props);
  }

  getNewChoices = (CountryList, PositionInQueue, shuffle) => {
    let countryQueueMinusCorrectCountry = CountryList.slice(0, PositionInQueue).concat(CountryList.slice(PositionInQueue + 1));
    let threeRandomIncorrectCountries = shuffle(countryQueueMinusCorrectCountry).slice(0, 3);
    let CorrectCountry = CountryList[PositionInQueue];
    let choices = threeRandomIncorrectCountries.concat(CorrectCountry);
    return shuffle(choices);
  }

  render() {
    const {
      ActiveRegion,
      ActiveSubRegion,
      PositionInQueue,
      CountryList,
      shuffle
     } = this.props;

    let flagButtonData = this.getNewChoices(CountryList, PositionInQueue, shuffle);

    console.log('props are ', this.props)

    if(!ActiveRegion){
      return <div>Select a region to get started.</div>
    };

    return (
      <div >
        <h3>
          { CountryList.length > 0 ? "Which flag belongs to " + CountryList[PositionInQueue] + "?" : "Please choose a subregion."}
        </h3>

        <FlagButtons
          shuffledChoices={ flagButtonData }
          ActiveSubRegion={ ActiveSubRegion }
          ></FlagButtons>

        <RegionProgress
          CountryList={ CountryList }
          PositionInQueue={ PositionInQueue }
        ></RegionProgress>

        <Location
          ActiveSubRegion={ ActiveSubRegion }
          CountryList={ CountryList }
          PositionInQueue={ PositionInQueue }
          ></Location>
      </div>
    )
  }
}

function mapStateToProps({
  ActiveRegion,
  ActiveSubRegion,
  PositionInQueue,
  CountryList
}){
  return {
    ActiveRegion,
    ActiveSubRegion,
    PositionInQueue,
    CountryList
  }
}

//Anything returned from this function will
//end up as props from the BookList container
function mapDispatchToProps(dispatch){
  //whenever selectBook is called, the result should be
  //passed to all of our reducers
  return bindActionCreators({
    incrementPositionInQueue,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Gameboard);
