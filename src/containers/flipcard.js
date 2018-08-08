import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { incrementPositionInQueue,
  setGuess,
  toggleErrorMessage  } from '../actions/index';
import { bindActionCreators } from 'redux';
import ReactCardFlip from 'react-card-flip';

export class Flipcard extends Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleFlip = this.handleFlip.bind(this);
    this.handleResetToDefault = this.handleResetToDefault.bind(this);
  }

  handleFlagClick = (guess) => {
    guess = guess.split(" emblem").join('');

    let {
      CountryList,
      PositionInQueue,
      incrementPositionInQueue,
      toggleErrorMessage,
      setGuess,
      ErrorMessageIsShown,
     } = this.props;

    if (guess === CountryList[PositionInQueue]){
      let maxPosition = CountryList.length;
      incrementPositionInQueue(PositionInQueue, maxPosition);

      if (ErrorMessageIsShown === true){
        toggleErrorMessage();
      }
    } else {
      if (ErrorMessageIsShown === false){
        toggleErrorMessage();
      }
      setGuess(guess);
    }
  }

  handleFlip() {
    this.setState({
      isFlipped: !this.state.isFlipped
     });
  }

  handleResetToDefault() {
    this.setState({
      isFlipped: false
     });
  }

  render() {
    let { front,
      back,
      countryName } = this.props;

    return (
      <ReactCardFlip isFlipped={ this.state.isFlipped } >
        <div key="front" >
          <div onClick={()=>{
            this.handleResetToDefault();
            this.handleFlagClick(countryName);
          }}>
            { front }
          </div>
          <button onClick={this.handleFlip}>Show Emblem</button>
        </div>

        <div key="back">
          <div onClick={()=>{
            this.handleResetToDefault();
            this.handleFlagClick(countryName);
          }}>
            { back }
          </div>
          <button onClick={this.handleFlip}>Show Flag</button>
        </div>
      </ReactCardFlip>
    )
  }
}

function mapStateToProps({
  PositionInQueue,
  CountryList,
  ErrorMessageIsShown
}){
  return {
    PositionInQueue,
    CountryList,
    ErrorMessageIsShown
  }
}

//Anything returned from this function will
//end up as props from the BookList container
function mapDispatchToProps(dispatch){
  //whenever selectBook is called, the result should be
  //passed to all of our reducers
  return bindActionCreators({
    incrementPositionInQueue,
    toggleErrorMessage,
    setGuess
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Flipcard);
