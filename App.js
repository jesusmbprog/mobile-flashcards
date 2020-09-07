import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/index';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeckList from './components/DeckList';
import Deck from './components/Deck';
import NewDeck from './components/NewDeck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import { setLocalNotification } from './utils/helpers';

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Decks') {
            iconName = focused
              ? 'ios-square'
              : 'ios-square-outline';
          } else if (route.name === 'Add Deck') {
            iconName = focused ? 'ios-add-circle' : 'ios-add';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
      >
      <Tab.Screen name="Decks" component={DeckList} />
      <Tab.Screen name="Add Deck" component={NewDeck} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {

    const store = createStore(reducer);

    return (
      <Provider store={store}>

        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home"
                screenOptions={{
                  headerTintColor: 'white',
                  headerStyle: { backgroundColor: 'tomato' },
                }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Deck" component={Deck} 
                          options={({ route }) => ({ title: route.params.deck })}/>
            <Stack.Screen name="Add Card" component={NewQuestion} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>

      </Provider>

    );

  }
}
