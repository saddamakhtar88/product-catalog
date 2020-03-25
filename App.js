/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {GlobalStyles} from './app/Styles';
import {HomeScreen} from './app/screens/HomeScreen';
import {ImageGalleryScreen} from './app/screens/ImageGalleryScreen';
import {AddOrEditScreen} from './app/screens/AddOrEditScreen';
import {InfoScreen} from './app/screens/InfoScreen';
import {ContactUsScreen} from './app/screens/ContactUs';
import {MessageUsScreen} from './app/screens/MessageUs';
import {MessagesScreen} from './app/screens/Messages';
import {AdminLoginScreen} from './app/screens/AdminLogin';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootStackScreen></RootStackScreen>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
};

function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.Color.Primary,
        },
        headerBackTitleStyle: {
          color: 'white',
        },
        headerTintColor: 'white',
      }}>
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Asha Textiles'}}></MainStack.Screen>
      <MainStack.Screen
        name="AddOrEdit"
        component={AddOrEditScreen}
        options={{title: 'Product'}}></MainStack.Screen>
      <MainStack.Screen
        name="Info"
        component={InfoScreen}
        options={{title: 'Info'}}></MainStack.Screen>
      <MainStack.Screen
        name="ContactUs"
        component={ContactUsScreen}
        options={{title: 'Contact Us'}}></MainStack.Screen>
      <MainStack.Screen
        name="MessageUs"
        component={MessageUsScreen}
        options={{title: 'Message'}}></MainStack.Screen>
      <MainStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{title: 'Messages'}}></MainStack.Screen>
    </MainStack.Navigator>
  );
}

function RootStackScreen() {
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{headerShown: false}}></RootStack.Screen>
      <RootStack.Screen
        name="ImageGallery"
        component={ImageGalleryScreen}
        options={{headerShown: false}}></RootStack.Screen>
      <RootStack.Screen
        name="Login"
        component={AdminLoginScreen}
        options={{headerShown: false}}></RootStack.Screen>
    </RootStack.Navigator>
  );
}

export default App;
