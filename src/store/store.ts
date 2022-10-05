import {configureStore, isRejectedWithValue} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {Action, Middleware, MiddlewareAPI} from 'redux';
import {reducers} from './reducers';
import {applicationAPI, setHasGroup} from './application/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import {combineReducers} from 'redux';
import {enrollmentApi} from './enrollment/slice';
import {groupsApi} from './groups/slice';
import {placesApi} from './places/slice';
import {applicationState} from './application/selector';

const combinedReducers = combineReducers({
  ...reducers,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => next => action => {
    const appState: AppState = api.getState();
    const app = applicationState(appState);
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      if (
        action.type.includes('groupsApi/executeQuery') &&
        action.payload.data.title === 'group_not_found'
      ) {
        api.dispatch(setHasGroup(false));
        console.warn(
          'No group associated, user should pick one or create one.',
        );
      } else {
        console.warn('We got a rejected action!', action);
      }
    }

    return next(action);
  };

const persistedReducer = persistReducer(persistConfig, combinedReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      rtkQueryErrorMiddleware,
      applicationAPI.middleware,
      groupsApi.middleware,
      placesApi.middleware,
      enrollmentApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
