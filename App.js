import React from 'react';
import MainNavigation from './src/routes/MainNavigation';
// import { StyleSheet, Text, View } from 'react-native';

//redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CarouselReducer from './src/redux/reducers/Carousel';
import CategoriReducer from './src/redux/reducers/Categori';
import ProdukReducer from './src/redux/reducers/Produk';
import FlashReducer from './src/redux/reducers/FlashSlae';
import ProdukCategoriReducer from './src/redux/reducers/ProdukCategori';
import DetailProduk from './src/redux/reducers/DetailProduk';
import loginReducer from './src/redux/reducers/Login';
import Cart from './src/redux/reducers/Cart';
import { combineReducers, applyMiddleware, createStore } from 'redux';

const RootReducer = combineReducers({
  Carousel: CarouselReducer,
  categori: CategoriReducer,
  produk: ProdukReducer,
  flashsale: FlashReducer,
  produkCategori: ProdukCategoriReducer,
  detailProduk: DetailProduk,
  dataLogin: loginReducer,
  cart: Cart,
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
