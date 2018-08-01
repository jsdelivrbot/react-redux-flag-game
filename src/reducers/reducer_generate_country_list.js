export default function(state = [], action){
  switch(action.type){
    case 'COUNTRY_QUEUE_GENERATED':
      return action.payload;
    default:
      return state;
  }
}
