export default function(state = null, action){
  switch(action.type){
    case 'SUBREGION_SELECTED':
      return action.payload;
    case 'SUBREGION_RESET':
      return action.payload;
    default:
      return state;
  }
}
