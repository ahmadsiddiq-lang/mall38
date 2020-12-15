import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const percentHeight = height / 100;
const percentWidth = width / 100;

export const sizeWidth = percent =>
  percent * (percentWidth < percentHeight ? percentWidth : percentHeight);

export const sizeHeight = percent =>
  percent * (percentWidth > percentHeight ? percentWidth : percentHeight);

export const sizeFont = percent =>
  percent * (percentWidth < percentHeight ? percentWidth : percentHeight);

export const imageWidth = () => Math.round((width * 9) / 17.5);
export const imageHeight = () => Math.round((imageWidth() * 9) / 18.5);

//default
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
