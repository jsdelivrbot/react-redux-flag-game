
export default function(state = [], action){
  switch(action.type){
    case 'INCORRECT_COUNTRIES_GENERATED':
      return action.payload;
    default:
      return state;
  }
}
