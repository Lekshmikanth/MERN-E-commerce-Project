
import _ from "lodash";

import * as modules from "../module";

const reducers = {};

//Include all the reducer to combine and provide to configure store.

_.values(modules).forEach(module => {
  _.values(module).forEach(section => {
    if (_.has(section, "STATE_REDUCER_KEY") && _.has(section, "reducer")) {
      _.set(reducers, `${section.STATE_REDUCER_KEY}`, section.reducer);
    }
  });
});

const rootReducer = {
  ...reducers
};

export default rootReducer;
