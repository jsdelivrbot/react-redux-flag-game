export default function(state = '', action){
  switch(action.type){
    case 'SET_GUESS':
      return action.payload;
    default:
      return state;
  }
}
