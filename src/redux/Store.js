import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import AuthReducer from './reducers/AuthReducer';
import UserReducer from './reducers/UserReducer';
import DeviceReducer from './reducers/DeviceReducer';
import VehicleReducer from './reducers/VehicleReducer';
import MessageReducer from './reducers/MessageReducer';

const initialSate = {};
const middleware = [thunk];

const reducers = combineReducers({
    auth: AuthReducer,
    user: UserReducer,
    device: DeviceReducer,
    vehicle: VehicleReducer,
    message: MessageReducer
});

const store = createStore(
    reducers,
    initialSate,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

export default store;