
export function selectRegion(region){
  return {
    type: 'REGION_SELECTED',
    payload: region
  }
}

export function generateCountryList(countryList){
  return {
    type: 'COUNTRY_QUEUE_GENERATED',
    payload: countryList
  };
}

export function selectSubRegion(subRegion){
  return {
    type: 'SUBREGION_SELECTED',
    payload: subRegion
  }
}

export function resetPosition(){
  return {
    type: 'POSITION_RESET',
    payload: null
  }
}

export function changeSubRegion(idx){
  return {
    type: 'SUBREGION_CHANGED',
    payload: idx
  }
}

export function incrementPositionInQueue(position, maxPosition = 0){
  let newPosition = (position + 1) % maxPosition;
  return {
    type: 'POSITION_INCREMENTED',
    payload: newPosition
  }
}

export function toggleErrorMessage(){
  return {
    type: 'TOGGLED_ERROR_MESSAGE',
    payload: null
  }
}

export function setGuess(guess){
  return {
    type: 'SET_GUESS',
    payload: guess
  }
}
