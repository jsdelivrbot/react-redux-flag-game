export default function(state = false, action){
  switch(action.type){
    case 'TOGGLED_ERROR_MESSAGE':
      return !state;
    default:
      return state;
  }
}
