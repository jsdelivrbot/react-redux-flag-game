import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementPositionInQueue } from '../actions/index';

import { Container, Row, Col } from 'reactstrap';

export class FlagButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessageIsHidden: true,
      errorMessage: ""
    }
  }

  toggleHidden () {
    this.setState({
      isHidden: !this.state.errorMessageIsHidden
    })
  }

  setErrorMessage (message) {
    this.setState({
      errorMessage: message
    })
  }
    // if (parseInt(guess) === gameState.correctAnswer){
    //   //go to the next country in the subRegion list and increment progress counter
    //   document.getElementById("errorMessage").classList.remove("show");
    //   setProgressBar();
    //   setUpGameBoard();
    // } else {
    //   //error statement
    //   document.getElementById("errorMessage").classList.add("show");
    //   document.getElementById("errorMessage").innerHTML = "You clicked " + nameCodeMap[gameState.choices[guess - 1]] + ". Try again.";
    //   console.log(gameState.choices);
    // }


  wrongCountryMessage = () => (
    <div >
          { this.props.wrongCountryMessage }
      </div>
  )

  handleFlagClick = (event) => {
    let guess = event.target.id;

    let {
      CountryList,
      PositionInQueue,
      incrementPositionInQueue
     } = this.props;

    if (guess === CountryList[PositionInQueue]){
      let maxPosition = CountryList.length;
      incrementPositionInQueue(PositionInQueue, maxPosition);
    } else {
      console.log('incorrect flag was clicked')
      event.preventDefault();
    }
  }

  render() {

    let { shuffledChoices,
      ActiveSubRegion
     } = this.props;

    let flagComponents = shuffledChoices.map((ele, i) => {
      let choiceName = shuffledChoices[i];
      let choiceData = ActiveSubRegion.countries.filter( ele => ele.name === choiceName )[0];
      return (
          <img
            src={ require('../img/' + choiceData.flag) }
            onClick={ this.handleFlagClick }
            alt="flag button"
            id={ choiceData.name }
            >
            </img>
      )
    });

    return (
        <Container>

          <Row className="flag-row">
            <Col xs="6">
              { flagComponents[0] }
            </Col>
            <Col xs="6">
              { flagComponents[1] }
            </Col>
          </Row>
          <Row className="flag-row">
            <Col xs="6">
              { flagComponents[2] }
            </Col>
            <Col xs="6">
              { flagComponents[3] }
            </Col>
          </Row>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(FlagButtons);
