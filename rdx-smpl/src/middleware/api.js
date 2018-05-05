import { LOAD } from '../constants/actiontypes'
import {loaded} from '../actions'


const api = store => next => action => {
    console.log("middlewaare (api) : action.type " + action.type)
    switch (action.type) {
        case LOAD:
            var state = store.getState();
            console.log("middlewaare : api : " + state.selection)
            store.dispatch (loaded());
            break;
        }
    next(action);
};

export default api