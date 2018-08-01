export default function(state = 0, action){
  switch(action.type){
    case 'SUBREGION_CHANGED':
      return action.payload;
    default:
      return state;
  }
}
