import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementPositionInQueue } from '../actions/index';
import Flipcard from '../containers/flipcard';

import { Row, Col } from 'reactstrap';

export class FlagButtons extends Component {

  render() {

    let shown = {
      display: this.props.ErrorMessageIsShown ? "block" : "none"
    };

    let guess = this.props.Guess;

    let { shuffledChoices,
      ActiveSubRegion
     } = this.props;

    let flags = shuffledChoices.map((ele, i) => {
      let choiceName = shuffledChoices[i];
      let choiceData = ActiveSubRegion.countries.filter( ele => ele.name === choiceName )[0];
      return (
          <img
            className="flag"
            src={ require('../img/' + choiceData.flag) }
            alt="flag button"
            id={ choiceData.name }
            >
            </img>
      )
    });

    let emblems = shuffledChoices.map((ele, i) => {
      let choiceName = shuffledChoices[i];
      let choiceData = ActiveSubRegion.countries.filter( ele => ele.name === choiceName)[0];
      return (
        <img
          className="flag"
         src={ require('../img/' + choiceData.emblem) }
         alt="emblem"
         id={ choiceData.name + " emblem"}
          >
        </img>
      )
    })

    return (
      <div className="flag-row">
          <h4 className="errorMessage" style={ shown }>{ "That's the flag of " + guess + ". Try again."}</h4>

          <Row className="flag-row">
            <Col xs="6">
              <Flipcard
                front={ flags[0] }
                back={ emblems[0] }
                countryName={ shuffledChoices[0] }
                toggleError={this.toggleError}
                setGuess={this.setGuess}
                ></Flipcard>
            </Col>
            <Col xs="6">
              <Flipcard
                front={ flags[1] }
                back={ emblems[1] }
                countryName={ shuffledChoices[1] }
                toggleError={this.toggleError}
                setGuess={this.setGuess}
                ></Flipcard>
            </Col>
          </Row>
          <Row className="flag-row">
            <Col xs="6">
              <Flipcard
                front={ flags[2] }
                back={ emblems[2] }
                countryName={ shuffledChoices[2] }
                toggleError={this.toggleError}
                setGuess={this.setGuess}
                ></Flipcard>
            </Col>
            <Col xs="6">
              <Flipcard
                front={ flags[3] }
                back={ emblems[3] }
                countryName={ shuffledChoices[3] }
                toggleError={this.toggleError}
                setGuess={this.setGuess}
                ></Flipcard>
            </Col>
          </Row>
        </div>
    )
  }
}

function mapStateToProps({
  ActiveRegion,
  ActiveSubRegion,
  PositionInQueue,
  CountryList,
  ErrorMessageIsShown,
  Guess
}){
  return {
    ActiveRegion,
    ActiveSubRegion,
    PositionInQueue,
    CountryList,
    ErrorMessageIsShown,
    Guess
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

export default connect(mapStateToProps, mapDispatchToProps)(FlagButtons);
