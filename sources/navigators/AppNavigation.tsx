import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen/DetailsScreen";
import { RootStackParamList } from "../types/type";

const Stack = createStackNavigator<RootStackParamList>();
export default class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{
              title: "",
              headerStyle: {
                backgroundColor: "black",
                height: 0,
              },
              headerTintColor: "white",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
