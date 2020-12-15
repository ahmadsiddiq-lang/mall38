/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Favorite from '../pages/Favorite';
import Transaksi from '../pages/Transaksi';
import Akun from '../pages/Akun';


const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
        </HomeStack.Navigator>
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
            <Tab.Navigator>
                <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} />
                <Tab.Screen name="ProductStackScreen" component={ProductStackScreen} />
                <Tab.Screen name="FavoriteStackScreen" component={FavoriteStackScreen} />
                <Tab.Screen name="TransaksiStackScreen" component={TransaksiStackScreen} />
                <Tab.Screen name="AkunStackScreen" component={AkunStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
