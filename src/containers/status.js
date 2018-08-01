import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementPositionInQueue } from '../actions/index';
import { Container, Row, Col } from 'reactstrap';


class Status extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessageIsHidden: true,
      errorMessage: ""
    }
    this.renderLocation = this.renderLocation.bind(this);
    this.renderChoices = this.renderChoices.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
    this.setErrorMessage = this.setErrorMessage.bind(this);
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

  renderLocation(ActiveSubRegion, CountryList, PositionInQueue){
    let correctCountryName = CountryList[PositionInQueue];
    let countryData = ActiveSubRegion.countries.filter((ele)=>{
      return ele.name === correctCountryName})[0];

    let url = countryData["orthographic"];
    return (
      <img className="map" src={require('../img/' + url)} alt="location" ></img>
    );
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


  handleFlagClick = (event) => {
    let guess = event.target.id;

    if (guess === this.props.CountryList[this.props.PositionInQueue]){
      let maxPosition = this.props.CountryList.length;
      this.props.incrementPositionInQueue(this.props.PositionInQueue, maxPosition);
    } else {
      event.preventDefault();
      this.toggleHidden()
      this.setErrorMessage("Wrong answer")
      console.log("event target is ", event.target)
      console.log('state is ', this.state)
      console.log('wrong answer')
    }
  }

  wrongCountryMessage = () => (
    <div >
          { this.props.wrongCountryMessage }
      </div>
  )

  renderChoices(ActiveSubRegion, CountryList, PositionInQueue, incrementPositionInQueue){
    let shuffle = this.props.shuffle;
    let countryQueueMinusCorrectCountry = CountryList.slice(0, PositionInQueue).concat(CountryList.slice(PositionInQueue + 1));
    let threeRandomIncorrectCountries = shuffle(countryQueueMinusCorrectCountry).slice(0, 3);
    let CorrectCountry = CountryList[PositionInQueue];
    let choices = threeRandomIncorrectCountries.concat(CorrectCountry);
    let shuffled_choices = shuffle(choices);

    let flagComponents = shuffled_choices.map((ele, i) => {
      let choiceName = shuffled_choices[i];
      let choiceData = ActiveSubRegion.countries.filter( ele => ele.name === choiceName )[0];
      return (
          <img
            src={ require('../img/' + choiceData.flag) }
            onClick={ this.handleFlagClick }
            positionInQueue={PositionInQueue}
            countryList={CountryList}
            incrementPositionInQueue={incrementPositionInQueue}
            alt="flag button"
            id={ choiceData.name }
            >
            </img>
      )
    });

    return (
      <Container>

        {!this.state.isHidden && <wrongCountryMessage />}

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
    );
  }

  render() {
    const {
      ActiveRegion,
      ActiveSubRegion,
      PositionInQueue,
      CountryList,
      shuffle,

      incrementPositionInQueue
     } = this.props;

    let maxPosition = CountryList ? CountryList.length : 0;

    console.log('props are ', this.props)

    if(!this.props.ActiveRegion){
      return <div>Select a region to get started.</div>
    };

    return (
      <div >
        <h3>
          { CountryList.length > 0 ? "Which flag belongs to " + CountryList[PositionInQueue] + "?" : "Please choose a subregion."}
        </h3>

        <div>
          { CountryList.length > 0 ? this.renderChoices(ActiveSubRegion, CountryList, PositionInQueue, shuffle) : "Please choose a subregion."}
        </div>

        <h3>Position in queue</h3>
        <button
          onClick={() => {
            incrementPositionInQueue(PositionInQueue, maxPosition);
          }}
          >Increment Position</button>
        <div>{ PositionInQueue } </div>

        <p></p>

        <h3>Current queue</h3>
        <div>{ CountryList.length > 0  ? CountryList.join(', '): "Please choose a subregion."}</div>
        <p></p>

        <h3>Location of { CountryList.length > 0 ? CountryList[PositionInQueue] : ""}</h3>
        <div>
           { this.renderLocation(ActiveSubRegion, CountryList, PositionInQueue)}
        </div>


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

export default connect(mapStateToProps, mapDispatchToProps)(Status);
