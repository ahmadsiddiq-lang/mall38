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
import ProductCategori, { HeaderProdukCategori } from '../pages/ProductCategori';
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
                <HomeStack.Screen
                    name="ProductCategori"
                    component={ProductCategori}
                    options={HeaderProdukCategori}
                />
            </HomeStack.Navigator>
        </>
    );
}

const ProductStack = createStackNavigator();

function ProductStackScreen() {
    return (
        <ProductStack.Navigator>
            <ProductStack.Screen
                name="Product"
                component={Product}
                options={{
                    header: ({ navigation }) => {
                        return <HeaderHome navigation={navigation} />;
                    },
                }}
            />
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
                tabBarOptions={{
                    activeTintColor: color.mainColor,
                    inactiveTintColor: color.fontBlack1,
                }}
                barStyle={{
                    backgroundColor: color.mainColor,
                }}>
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
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
                    component={ProductStackScreen}
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
                    component={FavoriteStackScreen}
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
        </NavigationContainer>
    );
}
