import TabNavigation from "@/src/screens/navigation/tabs";
import AuthNavigation from "@/src/screens/navigation/auth";
import { screenOptions } from "@/src/contants/screenOptions";

import { View, Text } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function App() {
  const [authSession, setAuthSession] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {authSession ? (
          <Stack.Screen name="tabs" component={TabNavigation} />
        ) : (
          <Stack.Screen name="auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
