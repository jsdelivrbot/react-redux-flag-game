import React from 'react';
import { Component } from 'react';
import Gameboard from '../containers/gameboard';
import TopNavbar from '../containers/navbar';

export default class App extends Component {

  //shuffle code comes from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    return (
      <div>
        <TopNavbar shuffle={this.shuffle}/>
        <Gameboard shuffle={this.shuffle}/>
      </div>

    )
  }
}
