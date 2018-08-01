export default function(state = null, action){
  switch(action.type){
    case 'REGION_SELECTED':
      return action.payload;
    default:
      return state;
  }
}
