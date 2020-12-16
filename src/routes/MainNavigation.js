/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home, { HeaderHome } from '../pages/Home';
import Product from '../pages/Product';
import Favorite from '../pages/Favorite';
import Transaksi from '../pages/Transaksi';
import Akun from '../pages/Akun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont } from '../assets/responsive';
import { color } from '../assets/colors/Index';

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <>
            <StatusBar translucent={false} backgroundColor={color.mainColor} barStyle="light-content" />
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        header: ({ navigation }) => {
                            return <HeaderHome navigation={navigation} />;
                        },
                    }}
                />
            </HomeStack.Navigator>
        </>
    );
}

const ProductStack = createStackNavigator();

function ProductStackScreen() {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen name="Product" component={Product} />
        </ProductStack.Navigator>
    );
}

const FavoritectStack = createStackNavigator();

function FavoriteStackScreen() {
    return (
        <FavoritectStack.Navigator>
            <FavoritectStack.Screen name="Favorite" component={Favorite} />
        </FavoritectStack.Navigator>
    );
}

const TransaksitStack = createStackNavigator();

function TransaksiStackScreen() {
    return (
        <TransaksitStack.Navigator>
            <TransaksitStack.Screen name="Transaksi" component={Transaksi} />
        </TransaksitStack.Navigator>
    );
}

const AkunStack = createStackNavigator();

function AkunStackScreen() {
    return (
        <AkunStack.Navigator>
            <AkunStack.Screen name="Akun" component={Akun} />
        </AkunStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                activeColor={color.mainColor}
                inactiveColor={color.fontBody1}
                barStyle={{
                    backgroundColor: color.mainColor,
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        tabBarIcon: () => {
                            return (
                                <Ionicons
                                    name="home"
                                    size={sizeFont(5)}
                                    color={color.mainColor}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Product"
                    component={ProductStackScreen}
                    options={{
                        tabBarIcon: () => {
                            return (
                                <Ionicons
                                    name="briefcase"
                                    size={sizeFont(5)}
                                    color={color.mainColor}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Favorite"
                    component={FavoriteStackScreen}
                    options={{
                        tabBarIcon: () => {
                            return (
                                <Ionicons
                                    name="heart"
                                    size={sizeFont(5)}
                                    color={color.mainColor}
                                />
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Transaktion"
                    component={TransaksiStackScreen}
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
                    component={AkunStackScreen}
                    options={{
                        tabBarIcon: () => {
                            return (
                                <Ionicons
                                    name="person"
                                    size={sizeFont(5)}
                                    color={color.mainColor}
                                />
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
