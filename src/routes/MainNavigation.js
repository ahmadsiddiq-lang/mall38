import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Product from '../pages/Product';
import Favorite from '../pages/Favorite';
import TransaksiInfo from '../pages/TransaksiInfo';
import ProductCategori from '../pages/ProductCategori';
import Akun from '../pages/Akun';
import DetailProduk from '../pages/DetailProduk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeFont } from '../assets/responsive';
import { color } from '../assets/colors/Index';
import Login from '../pages/Login';
import Cart from '../pages/Cart';
import Register from '../pages/Register';
import CheckOut from '../pages/CheckOut';
import EditUser from '../pages/EditUser';
import Pembayaran from '../pages/Pembayaran';

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
            <Stack.Navigator initialRouteName="Pembayaran" headerMode="none">
                <Stack.Screen name="MyTabbar" component={MyTabbar} />
                <Stack.Screen name="TransaksiInfo" component={TransaksiInfo} />
                <Stack.Screen name="ProductCategori" component={ProductCategori} />
                <Stack.Screen name="DetailProduk" component={DetailProduk} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="CheckOut" component={CheckOut} />
                <Stack.Screen name="EditUser" component={EditUser} />
                <Stack.Screen name="Pembayaran" component={Pembayaran} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
