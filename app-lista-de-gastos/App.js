import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ExpensesListScreen from './screens/ExpensesListScreen';

const Stack = createStackNavigator();
 // screenOptions={{
    //headerShown: false
  //}}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
    
        <Stack.Screen  name="Home" component={HomeScreen} />
        <Stack.Screen name="Lista de Gastos" component={ExpensesListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
