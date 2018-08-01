import { combineReducers } from 'redux';
import Regions from './reducer_regions';
import ActiveRegion from './reducer_active_region';
import ActiveSubRegion from './reducer_active_subregion';
import PositionInQueue from './reducer_queue_position';
import CountryList from './reducer_generate_country_list'

const rootReducer = combineReducers({
  Regions,
  ActiveRegion,
  ActiveSubRegion,
  PositionInQueue,
  CountryList
});

export default rootReducer;
