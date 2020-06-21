import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

// const persistConfig = {
//     key: 'authType',
//     storage: storage,
//     whitelist: ['tags']
// };
//const pReducer = persistReducer(persistConfig, rootReducer);
const loggerMiddleware = createLogger();

const store = createStore(
    //pReducer,
    rootReducer,
    applyMiddleware(thunkMiddleware, loggerMiddleware)
);

//const persistor = persistStore(store);
export { store };
