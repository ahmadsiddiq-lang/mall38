import React from 'react';
import MainNavigation from './src/routes/MainNavigation';
// import { StyleSheet, Text, View } from 'react-native';

//redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CarouselReducer from './src/redux/reducers/Carousel';
import CategoriReducer from './src/redux/reducers/Categori';
import { combineReducers, applyMiddleware, createStore } from 'redux';

const RootReducer = combineReducers({
  Carousel: CarouselReducer,
  categori: CategoriReducer,
});

const store = createStore(RootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}

// const styles = StyleSheet.create({});
