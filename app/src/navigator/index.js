import React from 'react';
import {Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//icons vector
import Icons from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import Login from '../screens/Login/index';
import Task from '../screens/Task/index';
import Location from '../screens/Locations/index';
import NewTask from '../screens/NewTask/index';
import Add from '../screens/AddAttachment/index';
import SignUp from '../screens/SignUp/index';

// const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeTabs = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: false,
        tabBarStyle: {height: 63},
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <Image source={require('../Assets/BottomTask.png')} />
          ),
        }}
        name="Task"
        component={Task}
      />

      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons name="add-circle" size={50} color="#333333" />
          ),
        }}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({}) => (
            <Ionicons name="location-outline" size={23} color="grey" />
          ),
        }}
        name="Location"
        component={Location}
      />
    </Tab.Navigator>
  );
};
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomeTabs"
          component={HomeTabs}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Task"
          component={Task}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Location"
          component={Location}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="NewTask"
          component={NewTask}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Add"
          component={Add}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SignUp"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>

    //add bottom tabs
  );
}

// return (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//         name="HomeTabs"
//         component={HomeTabs}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
//   );

// <NavigationContainer>
//   <Tab.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Login">
//     <Tab.Screen name="Task" component={Task} />
//     <Tab.Screen name="NewTask" component={NewTask} />
//     <Tab.Screen name="Login" component={Login} />
//     <Tab.Screen name="Location" component={Location} />

//   </Tab.Navigator>
// </NavigationContainer>

export default AppNavigator;
