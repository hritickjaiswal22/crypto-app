import TabNavigation from "@/src/screens/navigation/tabs";
import AuthNavigation from "@/src/screens/navigation/auth";
import { screenOptions } from "@/src/contants/screenOptions";
import useUserStore from "@/src/store/useUserStore";

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

function App() {
  const authSession = useUserStore((state) => state.session);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={screenOptions}>
        {authSession && authSession.user ? (
          <Stack.Screen name="Tabs" component={TabNavigation} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
