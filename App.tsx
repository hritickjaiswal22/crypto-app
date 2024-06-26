import TabNavigation from "@/src/screens/navigation/tabs";
import AuthNavigation from "@/src/screens/navigation/auth";
import { screenOptions } from "@/src/screens/navigation/screenOptions";
import useUserStore from "@/src/store/useUserStore";

import React from "react";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const Stack = createStackNavigator();
const client = new QueryClient();

function App() {
  const authSession = useUserStore((state) => state.session);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <QueryClientProvider client={client}>
        <Stack.Navigator screenOptions={screenOptions}>
          {authSession && authSession.user ? (
            <Stack.Screen name="Tabs" component={TabNavigation} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigation} />
          )}
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

export default App;
