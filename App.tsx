import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-get-random-values';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddNewItemScreen from './src/screens/AddNewItemScreen';


const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#f8f8f8',
                },
                headerTintColor: '#333',
                headerTitleStyle: {
                  fontWeight: 'bold',
                }
              }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="AddItem" component={AddNewItemScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
  );
};

export default App;
