import UserState from './Reducers/UserReducers';
import HouseReducers from './Reducers/HouseReducers';
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

// add additional reducers here to build/combine reducers
const rootReducer = combineReducers({
  userState: UserState,
  houseState: HouseReducers
})

const persistConfig = {
  key: 'root',
  storage:storage,
  blacklist:['userState']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
})
    
export const persistor = persistStore(store);