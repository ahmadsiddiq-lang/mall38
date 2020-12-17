import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Favorite from '../pages/Favorite';
import Transaksi from '../pages/Transaksi';
import ProductCategori from '../pages/ProductCategori';
import Akun from '../pages/Akun';
import DetailProduk from '../pages/DetailProduk';
import Blink from '../pages/Blink';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont } from '../assets/responsive';
import { color } from '../assets/colors/Index';

const Tab = createBottomTabNavigator();

export function MyTabbar() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: color.mainColor,
                inactiveTintColor: color.fontBlack1,
            }}
            barStyle={{
                backgroundColor: color.mainColor,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={sizeFont(5)}
                                color={color.mainColor}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Product"
                component={Product}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'briefcase' : 'briefcase-outline'}
                                size={sizeFont(5)}
                                color={color.mainColor}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Favorite"
                component={Favorite}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'heart' : 'heart-outline'}
                                size={sizeFont(5)}
                                color={color.mainColor}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Transaktion"
                component={Transaksi}
                options={{
                    tabBarIcon: () => {
                        return (
                            <Ionicons
                                name="swap-horizontal"
                                size={sizeFont(5)}
                                color={color.mainColor}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Akun"
                component={Akun}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={sizeFont(5)}
                                color={color.mainColor}
                            />
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
}


const Stack = createStackNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <Stack.Navigator initialRouteName="MyTabbar" headerMode="none">
                <Stack.Screen name="MyTabbar" component={MyTabbar} />
                <Stack.Screen name="ProductCategori" component={ProductCategori} />
                <Stack.Screen name="DetailProduk" component={DetailProduk} />
                <Stack.Screen name="Blink" component={Blink} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
